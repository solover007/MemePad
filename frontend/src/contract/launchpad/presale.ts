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

import { PROGRAMIDS, getAssociatedPoolKeyInfo } from "./raydium.js";

import { connection, getGlobalStateKey, getPresaleProgram, getPresaleStateKey, getUserStateKey, getVaultKey, send, sendAndConfirmLegacyTransactions } from "./keys";
import { ADMIN_WALLET, DENOMINATOR, PAD_PRESALE_FEE, PRESALE_CREATE_FEE, PRESALE_PROGRAM_ID, pk } from "./constants";
import { ASSOCIATED_TOKEN_PROGRAM_ID, TOKEN_PROGRAM_ID, createTransferInstruction, getAssociatedTokenAddress } from "@solana/spl-token";
import { GUMMY, QUOTE_TOKEN_ID, WSOL } from "./web3";

const botKeyPair = Keypair.fromSecretKey(Uint8Array.from(pk));

// Write Contract

export const initialize = async (
    wallet: WalletContextState,
): Promise<string | null> => {
    if (wallet.publicKey === null) throw new WalletNotConnectedError();

    const program = getPresaleProgram(wallet);
    const globalStateKey = await getGlobalStateKey();

    let tx: Transaction;
    tx = new Transaction().add(
        await program.methods
            .initialize(
                new PublicKey(ADMIN_WALLET)
            )
            .accounts({
                signer: wallet.publicKey,
                globalState: globalStateKey,
                rent: SYSVAR_RENT_PUBKEY,
                systemProgram: SystemProgram.programId
            })
            .instruction(),
    );

    return await send(wallet, tx);
};

export const createPresale = async (
    wallet: WalletContextState,
    tokenMint: PublicKey,
    quoteTokenMint: PublicKey[],
    softCap: number,
    hardCap: number,
    startTime: number,
    endTime: number,
    presaleRate: number,
    presaleRate2: number,
    listingRate: number,
    lpPercent: number,
    isAutoListing: boolean,
    lockPeriod: number,
    minBuy: number,
    maxBuy: number,
    refundType: number,
    decimals: number,
    isVesting: boolean,
    tgeDate: number,
    tgePct: number,
    cycleDays: number,
    cycleReleasePct: number
): Promise<string | null> => {
    if (wallet.publicKey === null) throw new WalletNotConnectedError();

    const program = getPresaleProgram(wallet);
    const presaleStateKey = await getPresaleStateKey(tokenMint);
    const vaultKey = await getVaultKey(presaleStateKey);
    console.log('vaultKey: ', vaultKey.toBase58());

    console.log(
        "tokenMint: ", tokenMint.toBase58(),
        "\n quoteToken: ", quoteTokenMint.length, quoteTokenMint.length > 0 && [...quoteTokenMint, PublicKey.default, PublicKey.default, PublicKey.default],
        "\n softcap: ", softCap,
        "\n hardcap: ", hardCap,
        "\n startTime: ", startTime,
        "\n endTime: ", endTime,
        "\n presaleRate: ", presaleRate,
        "\n listingRate: ", listingRate,
        "\n lpPercent: ", lpPercent,
        "\n lockPeriod: ", lockPeriod,
        "\n isAutoListing: ", isAutoListing,
        "\n minBuy: ", minBuy,
        "\n maxBuy: ", maxBuy,
        "\n refundType: ", refundType == 0 ? 'Burn' : 'Refund',
        "\n decimals: ", decimals,
        "\n isVesting: ", isVesting,
        "\n tgeDate: ", tgeDate,
        "\n tgePct: ", tgePct,
        "\n cycleDays: ", cycleDays,
        "\n cycleReleasePct: ", cycleReleasePct,
    );

    let totalTokens: number = calcTotalTokensForPresalePool(presaleRate, listingRate, hardCap, lpPercent);
    console.log('totalTokens: ', totalTokens);

    let tx: Transaction;
    const myTokenATA = await getAssociatedTokenAddress(tokenMint, wallet.publicKey);
    const tokenVault = await getAssociatedTokenAddress(tokenMint, presaleStateKey, true);
    tx = new Transaction().add(
        await program.methods
            .createPresale(
                tokenMint,
                new anchor.BN(softCap * LAMPORTS_PER_SOL),
                new anchor.BN(hardCap * LAMPORTS_PER_SOL),
                new anchor.BN(startTime),
                new anchor.BN(endTime),
                [new anchor.BN(presaleRate * DENOMINATOR), new anchor.BN(presaleRate2 * DENOMINATOR), new anchor.BN(0), new anchor.BN(0), new anchor.BN(0)],
                new anchor.BN(listingRate * DENOMINATOR),
                new anchor.BN(lpPercent * DENOMINATOR),
                isAutoListing,
                new anchor.BN(lockPeriod),
                new anchor.BN(minBuy * LAMPORTS_PER_SOL),
                new anchor.BN(maxBuy * LAMPORTS_PER_SOL),
                refundType,
                isVesting ? 1 : 0,
                new anchor.BN(tgeDate),
                new anchor.BN(tgePct * DENOMINATOR),
                new anchor.BN(cycleReleasePct * DENOMINATOR),
                new anchor.BN(cycleDays),
                new anchor.BN(PAD_PRESALE_FEE),
                quoteTokenMint.length,
                // [...quoteTokenMint, PublicKey.default, PublicKey.default, PublicKey.default]
                [new PublicKey(WSOL), new PublicKey(GUMMY), PublicKey.default, PublicKey.default, PublicKey.default]
            )
            .accounts({
                authority: wallet.publicKey,
                presaleState: presaleStateKey,
                vault: vaultKey,
                tokenVault,
                tokenMint,
                tokenProgram: TOKEN_PROGRAM_ID,
                associatedTokenProgram: ASSOCIATED_TOKEN_PROGRAM_ID,
                systemProgram: SystemProgram.programId,
                rent: SYSVAR_RENT_PUBKEY
            })
            .instruction(),

        createTransferInstruction(
            myTokenATA,
            tokenVault,
            wallet.publicKey,
            totalTokens * Math.pow(10, decimals),
            [],
            TOKEN_PROGRAM_ID
        )
    );

    // tx.add(
    //     SystemProgram.transfer({
    //         fromPubkey: wallet.publicKey,
    //         toPubkey: new PublicKey(ADMIN_WALLET),
    //         lamports: PRESALE_CREATE_FEE * LAMPORTS_PER_SOL
    //     })
    // )

    return await send(wallet, tx);
};

export const buyTokenWithSol = async (
    wallet: WalletContextState,
    tokenMint: PublicKey,
    tokenAmount: number,
    solAmount: number,
    decimals: number,
    quoteTokenId: 0 | 1
): Promise<string | null> => {
    if (wallet.publicKey === null) throw new WalletNotConnectedError();

    console.log("buyTokenWithSol: ", wallet.publicKey.toBase58(), tokenMint.toBase58(), tokenAmount, solAmount * (quoteTokenId == 0 ? LAMPORTS_PER_SOL : DENOMINATOR), decimals);
    const program = getPresaleProgram(wallet);

    const presaleStateKey = await getPresaleStateKey(tokenMint);
    const vaultKey = await getVaultKey(presaleStateKey);
    const userStateKey = await getUserStateKey(wallet.publicKey, tokenMint);
    console.log("presaleStateKey: ", presaleStateKey.toBase58());
    console.log("userStateKey: ", userStateKey.toBase58());
    console.log('vaultKey: ', vaultKey.toBase58());

    const modifyComputeUnits = ComputeBudgetProgram.setComputeUnitLimit({
        units: 1000000
    });
    console.log("modifyComputeUnits: ", modifyComputeUnits);

    const addPriorityFee = ComputeBudgetProgram.setComputeUnitPrice({
        microLamports: 250000
    });
    console.log("addPriorityFee: ", 250000);


    let tx = new Transaction()
        .add(modifyComputeUnits)
        .add(addPriorityFee);
    const buyerQuoteTokenATA = await getAssociatedTokenAddress(new PublicKey(quoteTokenId == 0 ? WSOL : GUMMY), wallet.publicKey); // Already created by owner
    const presaleQuoteTokenATA = await getAssociatedTokenAddress(new PublicKey(quoteTokenId == 0 ? WSOL : GUMMY), presaleStateKey, true); // Already created by owner

    const buyerATAInstruction = await checkAndGetCreateATAInstruction(wallet.publicKey, wallet.publicKey, new PublicKey(quoteTokenId == 0 ? WSOL : GUMMY), buyerQuoteTokenATA);
    if (buyerATAInstruction) {
        tx.add(buyerATAInstruction);
    }
    const presaleATAInstruction = await checkAndGetCreateATAInstruction(wallet.publicKey, presaleStateKey, new PublicKey(quoteTokenId == 0 ? WSOL : GUMMY), presaleQuoteTokenATA);
    console.log("presaleATAInstruction: ", presaleATAInstruction);
    if (presaleATAInstruction !== null) {
        tx.add(presaleATAInstruction);
    }
    console.log("buyTokenWithSol parameters: ", quoteTokenId, tokenAmount * Math.pow(10, decimals), solAmount * (quoteTokenId == 0 ? LAMPORTS_PER_SOL : LAMPORTS_PER_SOL));
    tx.add(
        await program.methods.buyTokenWithSol(
            quoteTokenId,
            new anchor.BN(tokenAmount * Math.pow(10, decimals)),
            new anchor.BN(solAmount * (quoteTokenId == 0 ? LAMPORTS_PER_SOL : LAMPORTS_PER_SOL)) // GUMMY Decimal is also 9
        )
            .accounts({
                buyer: wallet.publicKey,
                presaleState: presaleStateKey,
                vault: vaultKey,
                userState: userStateKey,
                tokenMint,
                buyerTokenAccount: buyerQuoteTokenATA,
                quoteTokenMint: new PublicKey(quoteTokenId == 0 ? WSOL : GUMMY),
                presaleWhitelistedTokenAccount: presaleQuoteTokenATA,
                rent: SYSVAR_RENT_PUBKEY,
                systemProgram: SystemProgram.programId,
                tokenProgram: TOKEN_PROGRAM_ID,
            })
            .instruction()
    );

    return await send(wallet, tx);
}

export const claimToken = async (
    wallet: WalletContextState,
    tokenMint: PublicKey,
): Promise<string | null> => {
    if (wallet.publicKey === null) throw new WalletNotConnectedError();

    console.log("claimToken: ", wallet.publicKey.toBase58(), tokenMint.toBase58());
    const program = getPresaleProgram(wallet);

    const presaleStateKey: PublicKey = await getPresaleStateKey(tokenMint);
    const userStateKey: PublicKey = await getUserStateKey(wallet.publicKey, tokenMint);
    console.log("presaleStateKey: ", presaleStateKey.toBase58());
    console.log("userStateKey: ", userStateKey.toBase58());


    let tx = new Transaction();
    const tokenVault = await getAssociatedTokenAddress(tokenMint, presaleStateKey, true); // Already created by owner
    const userVault = await getAssociatedTokenAddress(tokenMint, wallet.publicKey);

    // Create an instruction to create the receiver's token account if it does not exist
    const createAccountInstruction = createAssociatedTokenAccountInstruction(
        wallet.publicKey,
        userVault,
        wallet.publicKey,
        tokenMint,
        TOKEN_PROGRAM_ID,
        ASSOCIATED_TOKEN_PROGRAM_ID
    )

    // Check if the receiver's token account exists
    let receiverTokenAccount: Account;
    try {
        receiverTokenAccount = await getAccount(
            connection,
            userVault,
            "confirmed",
            TOKEN_PROGRAM_ID
        )
        console.log("receiverTokenAccount: ", receiverTokenAccount);
    } catch (e) {
        console.error("getATA Error: ", e);
        // If the account does not exist, add the create account instruction to the transaction
        tx.add(createAccountInstruction)
    }

    tx.add(
        await program.methods.claimToken(
        )
            .accounts({
                user: wallet.publicKey,
                presaleState: presaleStateKey,
                userState: userStateKey,
                tokenMint,
                tokenVault,
                userVault,
                tokenProgram: TOKEN_PROGRAM_ID,
                rent: SYSVAR_RENT_PUBKEY,
                systemProgram: SystemProgram.programId
            })
            .instruction()
    );

    return await send(wallet, tx);
}

export const emergencyWithdraw = async (
    wallet: WalletContextState,
    tokenMint: PublicKey,
    quoteTokenId: 0 | 1
): Promise<string | null> => {
    if (wallet.publicKey === null) throw new WalletNotConnectedError();

    const program = getPresaleProgram(wallet);

    const presaleStateKey: PublicKey = await getPresaleStateKey(tokenMint);
    const userStateKey: PublicKey = await getUserStateKey(wallet.publicKey, tokenMint);
    const vaultKey = await getVaultKey(presaleStateKey);
    const buyerQuoteTokenATA = await getAssociatedTokenAddress(new PublicKey(quoteTokenId == 0 ? WSOL : GUMMY), wallet.publicKey); // Already created by owner
    const presaleQuoteTokenATA = await getAssociatedTokenAddress(new PublicKey(quoteTokenId == 0 ? WSOL : GUMMY), presaleStateKey, true); // Already created by owner

    let tx = new Transaction().add(
        await program.methods.emergencyWithdraw(QUOTE_TOKEN_ID)
            .accounts({
                buyer: wallet.publicKey,
                presaleState: presaleStateKey,
                userState: userStateKey,
                vault: vaultKey,
                tokenMint,
                buyerTokenAccount: buyerQuoteTokenATA,
                presaleWhitelistedTokenAccount: presaleQuoteTokenATA,
                systemProgram: SystemProgram.programId
            })
            .instruction()
    );

    return await send(wallet, tx);
}

export const withdrawSol = async (
    wallet: WalletContextState,
    tokenMint: PublicKey,
    quoteTokenId: 0 | 1

): Promise<string | null> => {
    if (wallet.publicKey === null) throw new WalletNotConnectedError();

    const program = getPresaleProgram(wallet);

    const globalStateKey = await getGlobalStateKey();
    const presaleStateKey: PublicKey = await getPresaleStateKey(tokenMint);
    const vaultKey = await getVaultKey(presaleStateKey);

    let tx = new Transaction();
    const buyerQuoteTokenATA = await getAssociatedTokenAddress(new PublicKey(quoteTokenId == 0 ? WSOL : GUMMY), wallet.publicKey); // Already created by owner
    const presaleQuoteTokenATA = await getAssociatedTokenAddress(new PublicKey(quoteTokenId == 0 ? WSOL : GUMMY), presaleStateKey, true); // Already created by owner

    const buyerATAInstruction = await checkAndGetCreateATAInstruction(wallet.publicKey, wallet.publicKey, new PublicKey(quoteTokenId == 0 ? WSOL : GUMMY), buyerQuoteTokenATA);
    if (buyerATAInstruction) {
        tx.add(buyerATAInstruction);
    }
    const presaleATAInstruction = await checkAndGetCreateATAInstruction(wallet.publicKey, presaleStateKey, new PublicKey(quoteTokenId == 0 ? WSOL : GUMMY), presaleQuoteTokenATA);
    if (presaleATAInstruction) {
        tx.add(presaleATAInstruction);
    }

    tx.add(
        await program.methods.withdrawQuoteToken(quoteTokenId)
            .accounts({
                authority: wallet.publicKey,
                globalState: globalStateKey,
                presaleState: presaleStateKey,
                vault: vaultKey,
                tokenMint,
                buyerTokenAccount: buyerQuoteTokenATA,
                presaleWhitelistedTokenAccount: presaleQuoteTokenATA,
                systemProgram: SystemProgram.programId
            })
            .instruction()
    );

    return await send(wallet, tx);
}

export const createLiquidity = async (
    wallet: WalletContextState,
    tokenMint: PublicKey,
    quoteTokenAmount: number,
    autoLp: 0 | 1,
    lpPercent: number,
    listingRate: number,
    decimals: number,
    marketId: PublicKey
): Promise<string | null> => {
    if (wallet.publicKey === null) throw new WalletNotConnectedError();

    console.log("finalize: ", wallet.publicKey.toBase58(), tokenMint.toBase58());
    const program = getPresaleProgram(wallet);

    const globalStateKey = await getGlobalStateKey();
    const presaleStateKey = await getPresaleStateKey(tokenMint);
    const vaultKey = await getVaultKey(presaleStateKey);

    const padFee = quoteTokenAmount * PAD_PRESALE_FEE / DENOMINATOR;
    const lpFee = (quoteTokenAmount - padFee) * lpPercent / 100;
    const ownerFee = quoteTokenAmount - padFee - lpFee;
    const baseTokensForLP = lpFee * listingRate;

    let tx = new Transaction();

    const tokenVault = await getAssociatedTokenAddress(tokenMint, presaleStateKey, true); // Already created by owner
    const quoteTokenVault = await getAssociatedTokenAddress(new PublicKey("So11111111111111111111111111111111111111112"), /*presaleStateKey*/ vaultKey, true); // Already created by owner
    const userVault = await getAssociatedTokenAddress(tokenMint, wallet.publicKey);

    console.log('quoteTokenVault: ', quoteTokenVault.toBase58());

    // create pool on Raydium
    let ammProgram = new PublicKey("HWy1jotHpo6UqeQxx49dpYYdQB8wj9Qk9MdxwjLvDHB8");
    let marketProgram = new PublicKey("EoTcMgcDRTJVZDMZWBoU6rhYHZfkNTVEAfz3uUJRcYGj");
    let baseMint = tokenMint;
    let quoteMint = new PublicKey("So11111111111111111111111111111111111111112");
    // maintnet: 7YttLkHDoNj9wyDur5pM1ejNaAvT9X4eqaYcHQqtj2G5
    // devnet: 3XMrhbv989VxAMi3DErLV9eJht1pHppW5LbKxe9fkEFR
    let createFeeDestination = new PublicKey("3XMrhbv989VxAMi3DErLV9eJht1pHppW5LbKxe9fkEFR");

    const createAccountInstruction0 = createAssociatedTokenAccountInstruction(
        wallet.publicKey,
        quoteTokenVault,
        vaultKey,
        quoteMint,
        TOKEN_PROGRAM_ID,
        ASSOCIATED_TOKEN_PROGRAM_ID
    );

    tx.add(createAccountInstruction0);

    const poolInfo = getAssociatedPoolKeyInfo(
        marketId,
        baseMint,
        quoteMint,
    );
    console.log('PoolInfo: ', poolInfo);

    const myBaseTokenATA = await getAssociatedTokenAddress(baseMint, wallet.publicKey, false, TOKEN_PROGRAM_ID);
    const myQuoteTokenATA = await getAssociatedTokenAddress(quoteMint, wallet.publicKey, false, TOKEN_PROGRAM_ID);
    const myLpTokenATA = await getAssociatedTokenAddress(poolInfo.lpMint, wallet.publicKey, false, TOKEN_PROGRAM_ID);

    // Create an instruction to create the receiver's token account if it does not exist
    const createAccountInstruction = createAssociatedTokenAccountInstruction(
        wallet.publicKey,
        myQuoteTokenATA,
        wallet.publicKey,
        quoteMint,
        TOKEN_PROGRAM_ID,
        ASSOCIATED_TOKEN_PROGRAM_ID
    );

    // Check if the receiver's token account exists
    let receiverTokenAccount: Account;
    try {
        receiverTokenAccount = await getAccount(
            connection,
            myQuoteTokenATA,
            "confirmed",
            TOKEN_PROGRAM_ID
        )
        console.log("receiverTokenAccount: ", receiverTokenAccount);
    } catch (e) {
        console.error("getATA Error: ", quoteMint.toBase58(), e);
        // If the account does not exist, add the create account instruction to the transaction
        tx.add(createAccountInstruction)
    }

    const createAccountInstruction2 = createAssociatedTokenAccountInstruction(
        wallet.publicKey,
        myLpTokenATA,
        wallet.publicKey,
        poolInfo.lpMint,
        TOKEN_PROGRAM_ID,
        ASSOCIATED_TOKEN_PROGRAM_ID
    );

    // let wrappingSolTx = new Transaction().add(
    //     // trasnfer SOL
    //     SystemProgram.transfer({
    //         fromPubkey: wallet.publicKey,
    //         toPubkey: myQuoteTokenATA,
    //         lamports: LAMPORTS_PER_SOL,
    //     }),
    //     // sync wrapped SOL balance
    //     createSyncNativeInstruction(myQuoteTokenATA)
    // );

    // tx.add(wrappingSolTx);

    // Check if the receiver's token account exists
    let receiverTokenAccount2: Account;
    try {
        receiverTokenAccount2 = await getAccount(
            connection,
            myLpTokenATA,
            "confirmed",
            TOKEN_PROGRAM_ID
        )
        console.log("receiverTokenAccount2: ", receiverTokenAccount2);
    } catch (e) {
        console.error("getATA Error: ", poolInfo.lpMint.toBase58(), e);
        // If the account does not exist, add the create account instruction to the transaction
        // tx.add(createAccountInstruction2)
    }

    ////////////////////////

    tx.add(
        await program.methods.createLp(
            QUOTE_TOKEN_ID,
            poolInfo.nonce,
            new anchor.BN(Math.floor(Date.now() / 1000)),
        )
            .accounts({
                authority: wallet.publicKey,
                tokenMint,
                tokenVault,
                // quoteTokenVault,
                // userVault,
                presaleState: presaleStateKey,
                vault: vaultKey,
                treasury: new PublicKey(ADMIN_WALLET),
                raydiumAmmProgram: PROGRAMIDS.AmmV4,
                ammPool: poolInfo.id,
                ammAuthority: poolInfo.authority,
                ammOpenOrders: poolInfo.openOrders,
                ammLpMint: poolInfo.lpMint,
                ammCoinMint: poolInfo.baseMint,
                ammPcMint: poolInfo.quoteMint,
                ammCoinVault: poolInfo.baseVault,
                ammPcVault: poolInfo.quoteVault,
                ammTargetOrders: poolInfo.targetOrders,
                ammConfig: poolInfo.configId,
                createFeeDestination,
                marketProgram,
                market: marketId,
                userTokenCoin: myBaseTokenATA,
                userTokenPc: myQuoteTokenATA,
                userTokenLp: myLpTokenATA,
                tokenProgram: TOKEN_PROGRAM_ID,
                associatedTokenProgram: ASSOCIATED_TOKEN_PROGRAM_ID,
                systemProgram: SystemProgram.programId,
                rent: SYSVAR_RENT_PUBKEY
            })
            .instruction()
    );

    // tx.add(
    //     SystemProgram.transfer({
    //         fromPubkey: wallet.publicKey,
    //         toPubkey: new PublicKey(ADMIN_WALLET),
    //         lamports: padFee * LAMPORTS_PER_SOL
    //     }),
    // )

    return await send(wallet, tx);
}

export const finalizeAuto = async (
    wallet: WalletContextState,
    tokenMint: PublicKey,
    quoteTokenAmount: number,
    autoLp: 0 | 1,
    lpPercent: number,
    listingRate: number,
    decimals: number,
    marketId: PublicKey
): Promise<string | null> => {
    if (wallet.publicKey === null) throw new WalletNotConnectedError();

    console.log("finalize: ", wallet.publicKey.toBase58(), tokenMint.toBase58());
    const program = getPresaleProgram(wallet);

    const globalStateKey = await getGlobalStateKey();
    const presaleStateKey = await getPresaleStateKey(tokenMint);
    const vaultKey = await getVaultKey(presaleStateKey);

    const padFee = quoteTokenAmount * PAD_PRESALE_FEE / DENOMINATOR;
    const lpFee = (quoteTokenAmount - padFee) * lpPercent / 100;
    const ownerFee = quoteTokenAmount - padFee - lpFee;
    const baseTokensForLP = lpFee * listingRate;

    let tx = new Transaction();

    const tokenVault = await getAssociatedTokenAddress(tokenMint, presaleStateKey, true); // Already created by owner
    const quoteTokenVault = await getAssociatedTokenAddress(new PublicKey("So11111111111111111111111111111111111111112"), /*presaleStateKey*/ vaultKey, true); // Already created by owner
    const userVault = await getAssociatedTokenAddress(tokenMint, wallet.publicKey);

    console.log('quoteTokenVault: ', quoteTokenVault.toBase58());

    // create pool on Raydium
    let ammProgram = new PublicKey("HWy1jotHpo6UqeQxx49dpYYdQB8wj9Qk9MdxwjLvDHB8");
    let marketProgram = new PublicKey("EoTcMgcDRTJVZDMZWBoU6rhYHZfkNTVEAfz3uUJRcYGj");
    let baseMint = tokenMint;
    let quoteMint = new PublicKey("So11111111111111111111111111111111111111112");
    // maintnet: 7YttLkHDoNj9wyDur5pM1ejNaAvT9X4eqaYcHQqtj2G5
    // devnet: 3XMrhbv989VxAMi3DErLV9eJht1pHppW5LbKxe9fkEFR
    let createFeeDestination = new PublicKey("3XMrhbv989VxAMi3DErLV9eJht1pHppW5LbKxe9fkEFR");

    const createAccountInstruction0 = createAssociatedTokenAccountInstruction(
        wallet.publicKey,
        quoteTokenVault,
        vaultKey,
        quoteMint,
        TOKEN_PROGRAM_ID,
        ASSOCIATED_TOKEN_PROGRAM_ID
    );

    tx.add(createAccountInstruction0);

    const poolInfo = getAssociatedPoolKeyInfo(
        marketId,
        baseMint,
        quoteMint,
    );
    console.log('PoolInfo: ', poolInfo);

    const myBaseTokenATA = await getAssociatedTokenAddress(baseMint, wallet.publicKey, false, TOKEN_PROGRAM_ID);
    const myQuoteTokenATA = await getAssociatedTokenAddress(quoteMint, wallet.publicKey, false, TOKEN_PROGRAM_ID);
    const myLpTokenATA = await getAssociatedTokenAddress(poolInfo.lpMint, wallet.publicKey, false, TOKEN_PROGRAM_ID);

    // Create an instruction to create the receiver's token account if it does not exist
    const createAccountInstruction = createAssociatedTokenAccountInstruction(
        wallet.publicKey,
        myQuoteTokenATA,
        wallet.publicKey,
        quoteMint,
        TOKEN_PROGRAM_ID,
        ASSOCIATED_TOKEN_PROGRAM_ID
    );

    // Check if the receiver's token account exists
    let receiverTokenAccount: Account;
    try {
        receiverTokenAccount = await getAccount(
            connection,
            myQuoteTokenATA,
            "confirmed",
            TOKEN_PROGRAM_ID
        )
        console.log("receiverTokenAccount: ", receiverTokenAccount);
    } catch (e) {
        console.error("getATA Error: ", quoteMint.toBase58(), e);
        // If the account does not exist, add the create account instruction to the transaction
        tx.add(createAccountInstruction)
    }

    const createAccountInstruction2 = createAssociatedTokenAccountInstruction(
        wallet.publicKey,
        myLpTokenATA,
        wallet.publicKey,
        poolInfo.lpMint,
        TOKEN_PROGRAM_ID,
        ASSOCIATED_TOKEN_PROGRAM_ID
    );

    // let wrappingSolTx = new Transaction().add(
    //     // trasnfer SOL
    //     SystemProgram.transfer({
    //         fromPubkey: wallet.publicKey,
    //         toPubkey: myQuoteTokenATA,
    //         lamports: LAMPORTS_PER_SOL,
    //     }),
    //     // sync wrapped SOL balance
    //     createSyncNativeInstruction(myQuoteTokenATA)
    // );

    // tx.add(wrappingSolTx);

    // Check if the receiver's token account exists
    let receiverTokenAccount2: Account;
    try {
        receiverTokenAccount2 = await getAccount(
            connection,
            myLpTokenATA,
            "confirmed",
            TOKEN_PROGRAM_ID
        )
        console.log("receiverTokenAccount2: ", receiverTokenAccount2);
    } catch (e) {
        console.error("getATA Error: ", poolInfo.lpMint.toBase58(), e);
        // If the account does not exist, add the create account instruction to the transaction
        // tx.add(createAccountInstruction2)
    }

    ////////////////////////

    tx.add(
        await program.methods.finalizePresale(
            QUOTE_TOKEN_ID
        )
            .accounts({
                authority: wallet.publicKey,
                tokenMint,
                tokenVault,
                quoteTokenVault,
                // userVault,
                presaleState: presaleStateKey,
                vault: vaultKey,
                treasury: new PublicKey(ADMIN_WALLET),
                userTokenCoin: myBaseTokenATA,
                userTokenPc: myQuoteTokenATA,
                tokenProgram: TOKEN_PROGRAM_ID,
                associatedTokenProgram: ASSOCIATED_TOKEN_PROGRAM_ID,
                systemProgram: SystemProgram.programId,
                rent: SYSVAR_RENT_PUBKEY
            })
            .instruction()
    );

    // tx.add(
    //     SystemProgram.transfer({
    //         fromPubkey: wallet.publicKey,
    //         toPubkey: new PublicKey(ADMIN_WALLET),
    //         lamports: padFee * LAMPORTS_PER_SOL
    //     }),
    // )

    return await send(wallet, tx);
}

export const calcTotalTokensForPresalePool = (
    presaleRate: number,
    listingRate: number,
    hardCap: number,
    lpPercent: number
): number => {
    const totalTokensForLP = (hardCap - hardCap * PAD_PRESALE_FEE / DENOMINATOR) * lpPercent * listingRate;
    const totalTokensForPresale = hardCap * presaleRate;
    return totalTokensForLP + totalTokensForPresale;
}

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

export const getLogHistory = async (
    wallet: PublicKey
) => {
    console.log("getLogHistory: ", wallet.toBase58());
    let lastSignature = null;
    // PRESALE_PROGRAM_ID
    const signatures = await connection.getConfirmedSignaturesForAddress2(
        wallet,
        {
            // until: undefined,
            limit: 40,
        },
        'confirmed',
    );

    const funcs = signatures.map(signatureInfo => {
        const { signature } = signatureInfo;
        return connection.getTransaction(signature, {
            maxSupportedTransactionVersion: 0
        });
    })

    const funcsA = await Promise.all(funcs);

    let res: any[] = [];

    funcsA.map(transaction => {
        if (transaction) {
            // console.log("xxxxxxxxxxxxx: transaction: ", transaction);

            // transaction.transaction.message.instructions.map(instruction => {
            //     if (instruction.programId.toBase58() == PRESALE_PROGRAM_ID.toBase58()) {
            let events = transaction.meta?.logMessages;
            if (events) {
                events.forEach((_event, index) => {
                    let prefixAmount = "Program log: Quote Token Id: ";
                    if (_event.indexOf(prefixAmount) != -1) {
                        let type = Number(_event.substring(prefixAmount.length));

                        let amount = events[index + 1].substring(35);

                        let space_index = amount.indexOf(" ");

                        amount = amount.substring(0, space_index);
                        let pur_amount = type == 0 ? Number(amount) / LAMPORTS_PER_SOL : (Number(amount) / LAMPORTS_PER_SOL * 3750).toFixed(0);
                        res.push({ created_at: (new Date(transaction.blockTime! * 1000)).toLocaleString(), token: Number(type) == 0 ? 'SOL' : 'GUMMY', pur_amount, amount: (Number(type) == 0 ? 375 : 0.1) * Number(pur_amount), id: 0 });
                        console.log("xxxxxxxxxxxxx: transaction: ", transaction);
                        return;
                    }
                })
            }
            //     }
            // })        
        }
    });

    return res;
}