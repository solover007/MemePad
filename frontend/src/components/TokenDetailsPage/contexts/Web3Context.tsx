import { GUMMY, WSOL } from "@/contract/launchpad/web3";
import { PublicKey } from "@solana/web3.js";
import React, { createContext, useEffect, useState } from "react";

const defaultValue = {
  authority: "",
  tokenAddress: "",
  tokenName: "MEMEPad",
  symbol: "MPAD",
  decimals: 9,
  totalSupply: 10_000_000,
  softCap: 69,
  hardCap: 2_000,
  presaleRate: [0, 0, 0, 0, 0],
  listingRate: 0,
  minBuy: 0.01,
  maxBuy: 100,
  liquidityPct: 50,
  tokenVault: '',
  solVault: '',
  gummyVault: '',
  startTime: 0,
  endTime: 0,
  quoteTokenAmount: [0, 0, 0, 0, 0],
  lpLockupDays: 0,
  holders: 0,
  refundType: 0,
  validTokenCount: 0,
  whitelisted_tokens: [new PublicKey(WSOL), new PublicKey(GUMMY)],

  payToken: WSOL,
  payTokenIndex: 0,
};

const defaultUserPresaleData = {
  buyTokenAmount: 0,
  quoteTokenAmount: 0,
};

const Web3Context = createContext({
  presaleData: defaultValue,
  setPresaleData: (presaleData: any) => {},
  userPresaleData: defaultUserPresaleData,
  setUserPresaleData: (userPresaleData: any) => {},
});

export const Web3Provider = ({ children }: { children: React.ReactNode }) => {
  const [presaleData, setPresaleData] = useState(defaultValue);
  const [userPresaleData, setUserPresaleData] = useState(
    defaultUserPresaleData,
  );

  useEffect(() => {
    console.log("presaleData: ", presaleData);
    if (presaleData?.whitelisted_tokens?.length > 2) {
      console.log(
        "Whitelist Tokens: ",
        presaleData.whitelisted_tokens[0].toBase58(),
        presaleData.whitelisted_tokens[1].toBase58(),
        presaleData.whitelisted_tokens[2].toBase58(),
      );
    }
  }, [presaleData]);

  return (
    <Web3Context.Provider
      value={{
        presaleData,
        setPresaleData,
        userPresaleData,
        setUserPresaleData,
      }}
    >
      {children}
    </Web3Context.Provider>
  );
};

export default Web3Context;
