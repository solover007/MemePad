import {
    MarketV2,
    Liquidity,
    Token,
    TokenAmount,
    Percent,
    LOOKUP_TABLE_CACHE,
    MAINNET_PROGRAM_ID,
    DEVNET_PROGRAM_ID,
    // TOKEN_PROGRAM_ID,
    SPL_ACCOUNT_LAYOUT,
    TxVersion,
    buildSimpleTransaction,
    Spl,
    InstructionType,
    generatePubKey,
    splitTxAndSigners,
} from "@raydium-io/raydium-sdk";

import { 
    Market,
    MARKET_STATE_LAYOUT_V2,
    MARKET_STATE_LAYOUT_V3
} from "@project-serum/serum";

import { getTokenAmountAndDecimals } from "@/contract/launchpad/web3";
import { PublicKey } from "@solana/web3.js";
import { getMint, TOKEN_PROGRAM_ID } from "@solana/spl-token";
import { connection, sendAndConfirmLegacyTransactions } from "./keys";

const makeTxVersion = TxVersion.V0; // LEGACY

const isMainnet = true;
export const PROGRAMIDS = isMainnet ? MAINNET_PROGRAM_ID : DEVNET_PROGRAM_ID;
const addLookupTableInfo = isMainnet ? LOOKUP_TABLE_CACHE : undefined;

export const getOpenBookMarketId = async (
    mintAddress
) => {
    const mint = new PublicKey(mintAddress);
    const mintInfo = await getMint(connection, mint);
    const baseToken = new Token(TOKEN_PROGRAM_ID, mintAddress, mintInfo.decimals);
    const quoteToken = new Token(TOKEN_PROGRAM_ID, "So11111111111111111111111111111111111111112", 9, "WSOL", "WSOL");

    const accounts = await Market.findAccountsByMints(
        connection,
        baseToken.mint,
        quoteToken.mint,
        PROGRAMIDS.OPENBOOK_MARKET
    );
    console.log("openbook accounts");
    accounts.map(i => {
        console.log(i.publicKey.toBase58());
    });

    if (accounts.length === 0) {
        // toast.info("Not found OpenBook market!");
        return null;
    }

    const marketId = accounts[0].publicKey;
    console.log('marketId: ', marketId.toBase58());

    return marketId;
}

export const createOpenBookMarket = async (
    wallet,
    mintAddress,
    minOrderSize,
    tickSize,
    isAdvanced = false,
    eventQueueLength = 128,
    requestQueueLength = 63,
    orderBookLength = 201
) => {
    console.log("Creating OpenBook market...", mintAddress);

    const mint = new PublicKey(mintAddress);

    // const mintInfo = await getMint(connection, mint);
    const { decimals } = await getTokenAmountAndDecimals(mintAddress);
    console.log('decimals: ', decimals);

    const baseToken = new Token(TOKEN_PROGRAM_ID, mintAddress, decimals);
    const quoteToken = new Token(TOKEN_PROGRAM_ID, "So11111111111111111111111111111111111111112", 9, "WSOL", "WSOL");
    console.log('BaseToken: ', baseToken);

    const { innerTransactions, address } = await MarketV2.makeCreateMarketInstructionSimple({
        connection,
        wallet: wallet.publicKey,
        baseInfo: baseToken,
        quoteInfo: quoteToken,
        lotSize: minOrderSize, // default 1
        tickSize: tickSize, // default 0.01
        dexProgramId: PROGRAMIDS.OPENBOOK_MARKET,
        makeTxVersion,
    });

    console.log("Building OpenBook Market Transaction ...");
    const transactions = await buildSimpleTransaction({
        connection,
        makeTxVersion,
        payer: wallet.publicKey,
        innerTransactions,
        addLookupTableInfo,
    });

    console.log('Market ID: ', address.marketId.toString());
    console.log('PROGRAMIDS.OPENBOOK_MARKET: ', PROGRAMIDS.OPENBOOK_MARKET.toBase58());

    const signedTxs = await wallet.signAllTransactions(transactions);

    const res = await sendAndConfirmLegacyTransactions(connection, signedTxs);
    if (res == true) {
        return address.marketId;
    } else {
        return null;
    }
}

export const getAssociatedPoolKeyInfo = (
    marketId,
    baseMint,
    quoteMint,
) => {
    return Liquidity.getAssociatedPoolKeys({
        version: 4,
        marketVersion: 3,
        marketId,
        baseMint,
        quoteMint,
        baseDecimals: 9,
        quoteDecimals: 9,
        programId: PROGRAMIDS.AmmV4,
        marketProgramId: PROGRAMIDS.OPENBOOK_MARKET,
    });
}

export async function getWalletTokenAccount(wallet, _programId = TOKEN_PROGRAM_ID) {
    const walletTokenAccount = await connection.getTokenAccountsByOwner(wallet, {
        programId: _programId,
    });
    
    return walletTokenAccount.value.map((i) => ({
        pubkey: i.pubkey,
        programId: i.account.owner,
        accountInfo: SPL_ACCOUNT_LAYOUT.decode(i.account.data),
    }));
}
