"use client";
import React, { useEffect, useState } from "react";

import Dashboard from "../../../components/Dashboard/Dashboard";
import { createTokenListing, useUser } from "@/lib/api";
import { toast } from "react-toastify";

import CreateTokenSection from "./CreateTokenSection";
import TokenListingSection from "./TokenListingSection";
import {
  CreateTokenFormData,
  defaultCreateTokenFormData,
  defaultTokenListingFormData,
  TokenListingFormData,
} from "./types";
import { TokenListing } from "@/lib/api/types";
import { useWallet } from "@solana/wallet-adapter-react";
import {
  getOpenBookMarketId,
  createOpenBookMarket,
  getWalletTokenAccount,
} from "@/contract/launchpad/raydium";
import { showTxResult } from "@/contract/launchpad/web3";
import {
  calcTotalTokensForPresalePool,
  createPresale,
} from "@/contract/launchpad/presale";
import { PublicKey } from "@solana/web3.js";
import { getTokenAccountBalance } from "@/contract/launchpad/keys";
import FlagButton from "@/components/Buttons/FlagButton";
import { convertDurationToSeconds } from "@/lib/utils";

export default function CreateListingPage() {
  const wallet = useWallet();
  const [loading, setLoading] = useState<boolean>(false);
  const { data: user } = useUser();

  if (!user?.admin && typeof window !== "undefined") {
    window.location.href = "/";
  }

  // const [tokenAddress, setTokenAddress] = useState<string>('HRKBK7RiCTaYiPJsF2mTZgMZTTLvovR7JUEy2NGmcdTS');

  const [createTokenFormData, setCreateTokenFormData] =
    useState<CreateTokenFormData>(defaultCreateTokenFormData);
  const [tokenListingFormData, setTokenListingFormData] =
    useState<TokenListingFormData>(defaultTokenListingFormData);

  const createListing = async () => {
    try {
      const details: TokenListing = {
        token_address: "xyz" + Math.random().toString(),
        token_name: createTokenFormData.name,
        token_symbol: createTokenFormData.symbol,
        listing_name: tokenListingFormData.listingName,
        cover_image: tokenListingFormData.coverImage?.url,
        listing_description: tokenListingFormData.listingDescription,
        treasury_wallet: tokenListingFormData.treasuryWallet,
        total_supply: tokenListingFormData.totalSupply,
        min_buy: tokenListingFormData.minBuy,
        max_buy: tokenListingFormData.maxBuy,
        presale_rate: tokenListingFormData.presaleRate,
        listing_rate: tokenListingFormData.listingRate,
        soft_cap: tokenListingFormData.softCap,
        hard_cap: tokenListingFormData.hardCap,
        start_date: tokenListingFormData.startDate || new Date().toISOString(),
        end_date: tokenListingFormData.endDate || new Date().toISOString(),
        active: true,
        min_ticket_size: tokenListingFormData.minTicketSize,
        max_ticket_size: tokenListingFormData.maxTicketSize,
        pool_launch_delay: tokenListingFormData.pootLaunchDelay,
        tokenomics_list: tokenListingFormData.tokenomicsList,
        token_price: tokenListingFormData.tokenPrice,
        launch_mc: tokenListingFormData.launchMC,
        telegram_link: createTokenFormData.telegram,
        twitter_link: createTokenFormData.twitter,
        instagram_link: createTokenFormData.website,
        website_link: createTokenFormData.website,
      };

      const res = await createTokenListing(details);
      if (res.status === 200) {
        toast.success("Listing created successfully");
        return;
      }

      toast.error("Failed to create listing:\n" + res.data.error);
    } catch (e) {
      toast.error("Failed to create listing: " + e);
    }
  };

  const handleClickCreatePresale = async () => {
    if (!wallet?.publicKey) {
      toast.info("Please connect your wallet");
      return;
    }

    if (loading) {
      toast.warning("Processing now. please try again later");
      return;
    }

    if (tokenListingFormData.tokenAddress == "") {
      toast.info("Please create or select your token first.");
      return;
    }

    // if (tokenListingFormData.quoteTokenAddress == "") {
    //   toast.info("Please enter Quote Token address.");
    //   return;
    // }

    if (tokenListingFormData.softCap == 0) {
      toast.info("Please enter Soft cap.");
      return;
    }

    if (tokenListingFormData.hardCap == 0) {
      toast.info("Please enter Hard cap.");
      return;
    }

    if (tokenListingFormData.minBuy == 0) {
      toast.info("Please enter token minimum buy amount.");
      return;
    }

    if (tokenListingFormData.maxBuy == 0) {
      toast.info("Please enter token maximum buy amount.");
      return;
    }

    // if (liquidityPct == 0) {
    //     toast.info("Please enter Liquidity(%).");
    //     return;
    // }

    if (tokenListingFormData.startDate == "") {
      toast.info("Please enter start date.");
      return;
    }

    if (tokenListingFormData.endDate == "") {
      toast.info("Please enter end date.");
      return;
    }

    if (tokenListingFormData.tgeDate == "") {
      toast.info("Please enter TGE date.");
      return;
    }

    const _startDate = Math.floor(
      new Date(tokenListingFormData.startDate).getTime() / 1000,
    );

    const _endDate = Math.floor(
      new Date(tokenListingFormData.endDate).getTime() / 1000,
    );

    const _tgeDate = Math.floor(
      new Date(
        tokenListingFormData.tgeDate ?? tokenListingFormData.endDate,
      ).getTime() / 1000,
    );

    if (_startDate > _endDate) {
      toast.info("Start Date should be less than End Date");
      return;
    }

    if (_startDate * 1000 < Date.now()) {
      toast.info("Invalid Start Date");
      return;
    }

    if (_tgeDate * 1000 < Date.now()) {
      toast.info("Invalid TGE Date");
      return;
    }

    if (tokenListingFormData.minTicketSize == 0) {
      toast.info("Please enter Min Ticket Size");
      return;
    }

    // if (tokenListingFormData.pootLaunchDelay == 0) {
    //   toast.info("Please enter Pool Launch Delay");
    //   return;
    // }

    if (tokenListingFormData.presaleRate == 0) {
      toast.info("Please enter presale price.");
      return;
    }

    if (tokenListingFormData.listingRate == 0) {
      toast.info("Please enter token listing price.");
      return;
    }

    const totalTokens = calcTotalTokensForPresalePool(
      tokenListingFormData.presaleRate,
      tokenListingFormData.listingRate,
      tokenListingFormData.hardCap,
      tokenListingFormData.liquidityPercent / 100,
    );
    console.log("totalTokens: ", totalTokens);

    const tokenBalance = await getTokenAccountBalance(
      new PublicKey(tokenListingFormData.tokenAddress),
      wallet.publicKey,
    );
    console.log("tokenBalance: ", tokenBalance.uiAmount);

    if (Number(tokenBalance.uiAmount) < totalTokens) {
      toast.info(
        `Insufficient Token Balance: ${tokenBalance.uiAmount}, You need ${totalTokens} tokens`,
      );
      return;
    }

    setLoading(true);

    // try {
    //   toast.info("Checking OpenBookMarketId...");
    //   let marketId = await getOpenBookMarketId(
    //     tokenListingFormData.tokenAddress,
    //   );
    //   if (marketId) {
    //     console.log("marketId: ", marketId.toBase58());
    //     toast.info(`OpenBookMarketId: ${marketId.toBase58()}`);
    //   } else {
    //     try {
    //       toast.info("Creating OpenBookMarketId...");
    //       const minOrderSize = 1;

    //       marketId = await createOpenBookMarket(
    //         wallet,
    //         tokenListingFormData.tokenAddress,
    //         minOrderSize,
    //         tokenListingFormData.minTicketSize,
    //       );
    //     } catch (err) {
    //       console.error("createOpenBookMarket Error: ", err);
    //       setLoading(false);
    //       return;
    //     }
    //     if (marketId) {
    //       showTxResult(
    //         marketId.toBase58(),
    //         1,
    //         "Successfuly created Market Id:",
    //       );
    //     } else {
    //       toast.error("OpenBook MakretID creation Failed");
    //       setLoading(false);
    //       return;
    //     }
    //   }
    // } catch (err) {
    //   toast.error("Create Openbook marketId failed");
    //   console.error("openbookmarketid error: ", err);
    //   setLoading(false);

    //   return;
    // }

    // deploying presale contract based on over params.
    toast.info(`Presale creating...`);

    try {
      const txHash = await createPresale(
        wallet,
        new PublicKey(tokenListingFormData.tokenAddress),
        tokenListingFormData.quoteTokenAddress.map(item => new PublicKey(item)),
        tokenListingFormData.softCap,
        tokenListingFormData.hardCap,
        _startDate,
        _endDate,
        tokenListingFormData.presaleRate,
        tokenListingFormData.presaleRate2,
        tokenListingFormData.listingRate,
        tokenListingFormData.liquidityPercent / 100,
        true, // autolisintg
        convertDurationToSeconds(tokenListingFormData.pootLaunchDelay || ""),
        tokenListingFormData.minBuy,
        tokenListingFormData.maxBuy,
        1, // refund type 0: burn
        createTokenFormData.decimals,
        tokenListingFormData.isVesting,
        _tgeDate, // 14 days delay
        tokenListingFormData.tgePercent,
        tokenListingFormData.cycleDays,
        tokenListingFormData.cycleReleasePercent,
      );
      if (txHash) {
        createListing();
      }
      showTxResult(txHash);
    } catch (err) {
      console.error("createPresale Error: ", err);
      toast.error("Creation failed!");
    }

    setLoading(false);
  };

  return (
    <Dashboard>
      <CreateTokenSection
        formData={createTokenFormData}
        setFormData={setCreateTokenFormData}
        listingData={tokenListingFormData}
        setListingData={setTokenListingFormData}
      />
      <TokenListingSection
        formData={tokenListingFormData}
        setFormData={setTokenListingFormData}
      />

      <div className="w-full flex justify-end my-10 px-8">
        <FlagButton onClick={handleClickCreatePresale} shadow>
          {" "}
          <p className="text-lg font-broad font-black text-black whitespace-nowrap">
            LAUNCH THAT S***
          </p>
        </FlagButton>
      </div>
    </Dashboard>
  );
}
