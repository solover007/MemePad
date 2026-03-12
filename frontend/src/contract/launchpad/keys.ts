import * as anchor from "@project-serum/anchor";
import { Connection, Keypair, PublicKey, TransactionSignature, VersionedTransaction } from "@solana/web3.js";
import {
    GLOBAL_STATE_SEED,
    VAULT_SEED,
    USER_STATE_SEED,
    PRESALE_STATE_SEED,
    PRESALE_PROGRAM_ID,
    isMainnet,
    LOCKER_PROGRAM_ID,
} from "./constants";
import {
    TOKEN_PROGRAM_ID,
    ASSOCIATED_TOKEN_PROGRAM_ID,
    TOKEN_2022_PROGRAM_ID,
    getAssociatedTokenAddress
} from "@solana/spl-token";

// import {
//     LOOKUP_TABLE_CACHE,
//     MAINNET_PROGRAM_ID,
//     DEVNET_PROGRAM_ID,
// } from '@raydium-io/raydium-sdk';

import { WalletContextState } from "@solana/wallet-adapter-react";
import { Transaction } from "@solana/web3.js";

import { IDL as presaleIDL } from "../idls/presale";
import { IDL as lockerIDL } from "../idls/locker";
import { clusterApiUrl } from "@solana/web3.js";

const RPC_URL = process.env.NEXT_PUBLIC_RPC_URL || 'https://api.devnet.solana.com';

export const connection = isMainnet ? new Connection(RPC_URL) : new Connection(clusterApiUrl('devnet'));

// export const PROGRAMIDS = isMainnet ? MAINNET_PROGRAM_ID : DEVNET_PROGRAM_ID;
// export const addLookupTableInfo = isMainnet ? LOOKUP_TABLE_CACHE : undefined;

export const getPresaleProgram = (wallet: any) => {
    let provider = new anchor.AnchorProvider(
        connection,
        wallet,
        anchor.AnchorProvider.defaultOptions()
    );
    const program = new anchor.Program(presaleIDL, PRESALE_PROGRAM_ID, provider);
    return program;
};

export const getLockerProgram = (wallet: any) => {
    let provider = new anchor.AnchorProvider(
        connection,
        wallet,
        anchor.AnchorProvider.defaultOptions()
    );
    const program = new anchor.Program(lockerIDL, LOCKER_PROGRAM_ID, provider);
    return program;
};

export const getGlobalStateKey = async (programId = PRESALE_PROGRAM_ID) => {
    const [globalStateKey] = await asyncGetPda(
        [Buffer.from(GLOBAL_STATE_SEED)],
        programId
    );
    return globalStateKey;
};

export const getPresaleStateKey = async (
    tokenMint: PublicKey,
) => {
    const [presaleStateKey] = await asyncGetPda(
        [Buffer.from(PRESALE_STATE_SEED), tokenMint.toBuffer()],
        PRESALE_PROGRAM_ID
    );
    return presaleStateKey;
};

export const getVaultKey = async (
    presaleKey: PublicKey,
    programId = PRESALE_PROGRAM_ID
) => {
    const [vaultKey] = await asyncGetPda(
        [Buffer.from(VAULT_SEED), presaleKey.toBuffer()],
        PRESALE_PROGRAM_ID
    );
    return vaultKey;
};

export const getUserStateKey = async (userKey: PublicKey, mintKey: PublicKey, programId = PRESALE_PROGRAM_ID) => {
    const [userStateKey] = await asyncGetPda(
        [Buffer.from(USER_STATE_SEED), mintKey.toBuffer(), userKey.toBuffer()],
        programId
    );
    return userStateKey;
};

const asyncGetPda = async (
    seeds: Buffer[],
    programId: PublicKey
): Promise<[PublicKey, number]> => {
    const [pubKey, bump] = await PublicKey.findProgramAddress(seeds, programId);

    return [pubKey, bump];
};

export async function send(
    wallet: WalletContextState,
    transaction: Transaction,
    mintKeyPair: Keypair | null = null
) {
    const txHash = await sendTransaction(connection, wallet, transaction, mintKeyPair);
    if (txHash != null) {
        // let confirming_id = showToast("Confirming Transaction ...", -1, 2);
        let res = await connection.confirmTransaction(txHash);

        // toast.dismiss(confirming_id);
        // if (res.value.err) showToast("Transaction Failed", 2000, 1);
        // else showToast("Transaction Confirmed", 2000);
    } else {
        // showToast("Transaction Failed", 2000, 1);
    }
    return txHash;
}

export async function sendTransaction(
    connection: Connection,
    wallet: WalletContextState,
    transaction: Transaction,
    mintKeyPair: Keypair | null
) {
    if (wallet.publicKey === null || wallet.signTransaction === undefined)
        return null;
    try {
        transaction.recentBlockhash = (
            await connection.getLatestBlockhash()
        ).blockhash;
        transaction.feePayer = wallet.publicKey;
        if (mintKeyPair != null) {
            console.log("mintKeyPair Sign: ", mintKeyPair.publicKey.toBase58());
            transaction.sign(mintKeyPair);
        }

        const signedTransaction = await wallet.signTransaction(transaction);

        const rawTransaction = signedTransaction.serialize();

        const txid: TransactionSignature = await connection.sendRawTransaction(
            rawTransaction,
            {
                skipPreflight: true,
                preflightCommitment: "processed",
            }
        );
        return txid;
    } catch (e) {
        console.log("sendTransaction Error: ", e);
        return null;
    }
}

async function sleep(delay = 1000) {
    return new Promise(resolve => setTimeout(() => resolve(true), delay))
}

export async function sendAndConfirmLegacyTransactions(
    connection: Connection,
    transactions: (Transaction | VersionedTransaction)[]
) {
    let retries = 50;
    let passed = [];
    const rawTransactions = transactions.map(item => item.serialize());
    while (retries > 0) {
        try {
            let signatures = [];
            for (let i = 0; i < rawTransactions.length; i++) {
                if (!passed[i]) {
                    signatures[i] = await connection.sendRawTransaction(rawTransactions[i], {
                        skipPreflight: true,
                        maxRetries: 1,
                    });
                }
            }

            const sentTime = Date.now();
            while (Date.now() - sentTime <= 1000) {
                for (let i = 0; i < rawTransactions.length; i++) {
                    if (!passed[i]) {
                        const ret = await connection.getParsedTransaction(signatures[i], {
                            commitment: "finalized",
                            maxSupportedTransactionVersion: 0,
                        });
                        if (ret)
                            passed[i] = true;
                    }
                }

                let done = true;
                for (let i = 0; i < rawTransactions.length; i++) {
                    if (!passed[i]) {
                        done = false;
                        break;
                    }
                }

                if (done)
                    return true;

                await sleep(500);
            }
        }
        catch (err) {
            console.log(err);
        }
        retries--;
    }

    return false;
}

export const getTokenAccountBalance = async (
    mintKey: PublicKey, 
    owner: PublicKey, 
    allowOwnerOffCurve = false
) => {
    let tokenATA;
    try {
        tokenATA = await getAssociatedTokenAddress(mintKey, owner, allowOwnerOffCurve);
    } catch (err) {
        console.error("getAssociatedTokenAddress Error: ", err);
        return { decimals: 0, amount: 0, uiAmount: 0 };
    }

    try {
        const tokenInfo = await connection.getTokenAccountBalance(tokenATA);

        const decimals = tokenInfo.value.decimals;
        const amount = tokenInfo.value.amount;
        const uiAmount = tokenInfo.value.uiAmount;
        return { decimals, amount, uiAmount };
    } catch (err) {
        console.error("getTokenAccountBalance Error: ", err);
        return { decimals: 0, amount: 0, uiAmount: 0 };
    }
}
