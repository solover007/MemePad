import * as anchor from "@project-serum/anchor";
import { WalletNotConnectedError } from "@solana/wallet-adapter-base";
import { WalletContextState } from "@solana/wallet-adapter-react";
import {
    Connection,
    Keypair,
    LAMPORTS_PER_SOL,
    PublicKey,
    SYSVAR_RENT_PUBKEY,
    SystemProgram,
    Transaction,
    TransactionInstruction,
    TransactionSignature,
    clusterApiUrl,
    ComputeBudgetProgram
} from "@solana/web3.js";

import {
    Account,
    getAccount,
    getMint,
    createAssociatedTokenAccountInstruction,
    createSyncNativeInstruction,
} from "@solana/spl-token";

import { connection, getGlobalStateKey, getLockerProgram, getPresaleProgram, getPresaleStateKey, getUserStateKey, getVaultKey, send, sendAndConfirmLegacyTransactions } from "./keys";
import { ADMIN_WALLET, DENOMINATOR, LOCKER_PROGRAM_ID, PAD_PRESALE_FEE, PRESALE_CREATE_FEE, PRESALE_PROGRAM_ID, pk } from "./constants";
import { ASSOCIATED_TOKEN_PROGRAM_ID, TOKEN_PROGRAM_ID, createTransferInstruction, getAssociatedTokenAddress } from "@solana/spl-token";
import { GUMMY, QUOTE_TOKEN_ID, WSOL } from "./web3";

const botKeyPair = Keypair.fromSecretKey(Uint8Array.from(pk));

// Write Contract

export const initialize = async (
    wallet: WalletContextState,
): Promise<string | null> => {
    if (wallet.publicKey === null) throw new WalletNotConnectedError();

    const program = getLockerProgram(wallet);
    const globalStateKey = await getGlobalStateKey(LOCKER_PROGRAM_ID);
    const vaultKey = await getVaultKey(globalStateKey, LOCKER_PROGRAM_ID);

    let tx: Transaction;
    tx = new Transaction().add(
        await program.methods
            .initialize(
                new PublicKey(ADMIN_WALLET)
            )
            .accounts({
                authority: wallet.publicKey,
                globalState: globalStateKey,
                vault: vaultKey,
                rent: SYSVAR_RENT_PUBKEY,
                systemProgram: SystemProgram.programId
            })
            .instruction(),
    );

    return await send(wallet, tx);
};

export const createSaleVesting = async (
    wallet: WalletContextState,
    tokenMint: PublicKey,
    vestingId: number,
    saleMode: 0 | 1,
    amount: number,
    minPrice: number,
    immediatePrice: number
): Promise<string | null> => {
    if (wallet.publicKey === null) throw new WalletNotConnectedError();

    const program = getLockerProgram(wallet);
    const globalStateKey = await getGlobalStateKey(LOCKER_PROGRAM_ID);
    const vaultKey = await getVaultKey(globalStateKey, LOCKER_PROGRAM_ID);

    const userLpStateKey = await getUserStateKey(tokenMint, wallet.publicKey, LOCKER_PROGRAM_ID);

    let tx: Transaction;
    tx = new Transaction().add(
        await program.methods
            .createSaleVesting(
                vestingId,
                saleMode,
                new anchor.BN(amount),
                new anchor.BN(minPrice),
                new anchor.BN(immediatePrice),
            )
            .accounts({
                user: wallet.publicKey,
                globalState: globalStateKey,
                userLpState: userLpStateKey,
                tokenMint,
            })
            .instruction(),
    );

    return await send(wallet, tx);
};

export const cancelSaleVesting = async (
    wallet: WalletContextState, // caller is seller
    buyer: PublicKey,
    tokenMint: PublicKey,
    saleVestingId: number,
): Promise<string | null> => {
    if (wallet.publicKey === null) throw new WalletNotConnectedError();

    const program = getLockerProgram(wallet);
    const globalStateKey = await getGlobalStateKey(LOCKER_PROGRAM_ID);
    const vaultKey = await getVaultKey(globalStateKey, LOCKER_PROGRAM_ID);

    const sellerLpStateKey = await getUserStateKey(tokenMint, wallet.publicKey, LOCKER_PROGRAM_ID);
    const buyerLpStateKey = await getUserStateKey(tokenMint, buyer, LOCKER_PROGRAM_ID);

    let tx: Transaction;
    tx = new Transaction().add(
        await program.methods
            .cancelSaleVesting(
                saleVestingId,
            )
            .accounts({
                user: wallet.publicKey,
                globalState: globalStateKey,
                vault: vaultKey,
                sellerLpState: sellerLpStateKey,
                buyerLpState: buyerLpStateKey,
                tokenMint,
                systemProgram: SystemProgram.programId
            })
            .instruction(),
    );

    return await send(wallet, tx);
};

export const buySaleVesting = async (
    wallet: WalletContextState, // caller is buyer
    seller: PublicKey,
    tokenMint: PublicKey,
    vestingId: number,
    amount: number,
    bidPrice: number,
): Promise<string | null> => {
    if (wallet.publicKey === null) throw new WalletNotConnectedError();

    const program = getLockerProgram(wallet);
    const globalStateKey = await getGlobalStateKey(LOCKER_PROGRAM_ID);
    const vaultKey = await getVaultKey(globalStateKey, LOCKER_PROGRAM_ID);

    const buyerLpStateKey = await getUserStateKey(tokenMint, wallet.publicKey, LOCKER_PROGRAM_ID);
    const sellerLpStateKey = await getUserStateKey(tokenMint, seller, LOCKER_PROGRAM_ID);

    let tx: Transaction;
    tx = new Transaction().add(
        await program.methods
            .buySaleVesting(
                vestingId,
                new anchor.BN(amount),
                new anchor.BN(bidPrice),
            )
            .accounts({
                user: wallet.publicKey,
                globalState: globalStateKey,
                vault: vaultKey,
                sellerVault: seller,
                sellerLpState: sellerLpStateKey,
                buyerLpState: buyerLpStateKey,
                tokenMint,
                systemProgram: SystemProgram.programId
            })
            .instruction(),
    );

    return await send(wallet, tx);
};

export const cancelAuctionBid = async (
    wallet: WalletContextState, // caller is buyer
    seller: PublicKey,
    tokenMint: PublicKey,
    saleVestingId: number,
): Promise<string | null> => {
    if (wallet.publicKey === null) throw new WalletNotConnectedError();

    const program = getLockerProgram(wallet);
    const globalStateKey = await getGlobalStateKey(LOCKER_PROGRAM_ID);
    const vaultKey = await getVaultKey(globalStateKey, LOCKER_PROGRAM_ID);

    const buyerLpStateKey = await getUserStateKey(tokenMint, wallet.publicKey, LOCKER_PROGRAM_ID);
    const sellerLpStateKey = await getUserStateKey(tokenMint, seller, LOCKER_PROGRAM_ID);

    let tx: Transaction;
    tx = new Transaction().add(
        await program.methods
            .cancelAuctionBid(
                saleVestingId,
            )
            .accounts({
                user: wallet.publicKey,
                globalState: globalStateKey,
                vault: vaultKey,
                sellerLpState: sellerLpStateKey,
                buyerLpState: buyerLpStateKey,
                tokenMint,
                systemProgram: SystemProgram.programId
            })
            .instruction(),
    );

    return await send(wallet, tx);
};

export const approveSaleVesting = async (
    wallet: WalletContextState, // caller is seller
    buyer: PublicKey,
    tokenMint: PublicKey,
    saleVestingId: number,
): Promise<string | null> => {
    if (wallet.publicKey === null) throw new WalletNotConnectedError();

    const program = getLockerProgram(wallet);
    const globalStateKey = await getGlobalStateKey(LOCKER_PROGRAM_ID);
    const vaultKey = await getVaultKey(globalStateKey, LOCKER_PROGRAM_ID);

    const sellerLpStateKey = await getUserStateKey(tokenMint, wallet.publicKey, LOCKER_PROGRAM_ID);
    const buyerLpStateKey = await getUserStateKey(tokenMint, buyer, LOCKER_PROGRAM_ID);

    let tx: Transaction;
    tx = new Transaction().add(
        await program.methods
            .approveSaleVesting(
                saleVestingId,
            )
            .accounts({
                user: wallet.publicKey,
                globalState: globalStateKey,
                vault: vaultKey,
                sellerLpState: sellerLpStateKey,
                buyerLpState: buyerLpStateKey,
                tokenMint,
                systemProgram: SystemProgram.programId
            })
            .instruction(),
    );

    return await send(wallet, tx);
};

export const updateFee = async (
    wallet: WalletContextState,
    marketplaceFee: number,
    penaltyFee: number,
): Promise<string | null> => {
    if (wallet.publicKey === null) throw new WalletNotConnectedError();

    const program = getLockerProgram(wallet);
    const globalStateKey = await getGlobalStateKey(LOCKER_PROGRAM_ID);

    let tx: Transaction;
    tx = new Transaction().add(
        await program.methods
            .updateFee(
                new anchor.BN(marketplaceFee),
                new anchor.BN(penaltyFee)
            )
            .accounts({
                authority: wallet.publicKey,
                globalState: globalStateKey,
            })
            .instruction(),
    );

    return await send(wallet, tx);
};

// Read Contract
export const getPresaleInfo = async (
    mintKey: string
) => {
    const program = getPresaleProgram(botKeyPair);
    const presaleStateKey = await getPresaleStateKey(new PublicKey(mintKey));
    const presaleQuoteTokenATA = await getAssociatedTokenAddress(new PublicKey(GUMMY), presaleStateKey, true); // Already created by owner
    const vaultKey = await getVaultKey(presaleStateKey);
    const presaleInfo = await program.account.presaleState.fetchNullable(presaleStateKey);
    if (presaleInfo) {
        return { ...presaleInfo, solVault: vaultKey, gummyVault: presaleQuoteTokenATA };
    } else {
        return presaleInfo;
    }
}

export const getPresaleAllInfo = async () => {
    const program = getPresaleProgram(botKeyPair);

    let stateData: any;
    try {
        stateData = await program.account.presaleState.all();
        console.log('stateData: ', stateData);
    } catch (err) {
        console.error('getPresaleAllInfo: ', err);
    }

    return stateData;
}

export const getUserPresaleStateData = async (
    wallet: WalletContextState,
    mintKey: string
) => {
    const program = getPresaleProgram(botKeyPair);
    const userStateKey = await getUserStateKey(wallet.publicKey!, new PublicKey(mintKey));
    const stateData = await program.account.userState.fetchNullable(userStateKey);

    return stateData;
}

const checkAndGetCreateATAInstruction = async (
    payer: PublicKey,
    owner: PublicKey,
    tokenMint: PublicKey,
    ownerATA: PublicKey
): Promise<TransactionInstruction | null> => {
    // Create an instruction to create the receiver's token account if it does not exist
    const createAccountInstruction = createAssociatedTokenAccountInstruction(
        payer,
        ownerATA,
        owner,
        tokenMint,
        TOKEN_PROGRAM_ID,
        ASSOCIATED_TOKEN_PROGRAM_ID
    )

    // Check if the receiver's token account exists
    let receiverTokenAccount: Account;
    try {
        receiverTokenAccount = await getAccount(
            connection,
            ownerATA,
            "confirmed",
            TOKEN_PROGRAM_ID
        )
        // console.log("receiverTokenAccount: ", receiverTokenAccount);
        return null;
    } catch (e) {
        console.error("getATA Error: ", e);
        // If the account does not exist, add the create account instruction to the transaction
        return createAccountInstruction;
    }
}
