import { connection } from "@/contract/launchpad/keys";
import { LAMPORTS_PER_SOL, PublicKey } from "@solana/web3.js";
import { toast } from "react-toastify";
import { shortenWalletAddress } from "../../lib/utils/index";
import { GUMMY_TOKEN } from "./constants";
export const WSOL = "So11111111111111111111111111111111111111112";
export const GUMMY = GUMMY_TOKEN?.toString();
export const QUOTE_TOKEN_ID: 0 | 1 = 1;

const scanLink = (tx: string): string => {
    return `https://explorer.solana.com/tx/${tx}?cluster=devnet`;
};

const scanAddressLink = (address: string): string => {
    return `https://explorer.solana.com/address/${address}?cluster=devnet`;
};

export const showTxResult = (txHash: string | null, type = 0, prefix = "Successfully processed!") => { // 0: tx, 1: address
    if (txHash != null) {
        console.log("txHash: ", txHash);

        toast.success(
            <div>
                <p>{prefix}</p>
                <a href={type == 0 ? scanLink(txHash) : scanAddressLink(txHash)} target="_blank" className="underline text-blue-600">{shortenWalletAddress(txHash)}</a>
            </div>
        );
    } else {
        toast.error(`Failed, please try again later`);
    }
};

export const checkAddressFormat = (adr: string): boolean => {
    if (adr == "") return false;

    try {
        const checkAdr = new PublicKey(adr);
    } catch (err) {
        console.error("checkAddressFormat : ", adr);

        return false;
    }

    return true;
};

export const getTokenAmountAndDecimals = async (mintKey: string) => {
    try {
        const tokenInfo = await connection.getTokenSupply(new PublicKey(mintKey));
        // const totalSupply = tokenInfo.value.uiAmount;
        const decimals = tokenInfo.value.decimals;
        const amount = tokenInfo.value.amount;
        const uiAmount = tokenInfo.value.uiAmount;
        return { decimals, amount: uiAmount };
    } catch (err) {
        console.error("getTokenAmountAndDecimals Error: ", err);
        return { decimals: 0, amount: 0 };
    }
};

export const getWalletSolBalance = async (
    walletPubkey: PublicKey
): Promise<number> => {
    let solBalance = await connection.getBalance(walletPubkey);
    solBalance = Number(solBalance) / LAMPORTS_PER_SOL;

    return solBalance;
};
