"use client";

import { useContext, useEffect, useState } from "react";
import Socials from "../../components/Shared/Socials";
import TokenDetailsPageBanner from "./TokenDetailsPageBanner";
import TokenDetailsSection from "./TokenDetailsSection/TokenDetailsSection";
import Web3Context from "./contexts/Web3Context";
import { getPresaleInfo } from "../../contract/launchpad/presale";
import {
  checkAddressFormat,
  getTokenAmountAndDecimals,
} from "@/contract/launchpad/web3";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import { DENOMINATOR } from "../../contract/launchpad/constants";
import NavRoutes from "@/components/HomeOld/Navbar/NavRoutes";
import { listingMetadata } from "@/lib/utils/constants";

const TokenDetailsPage = ({ id }) => {
  const { setPresaleData } = useContext(Web3Context);

  // TODO: Uncomment this later
  useEffect(() => {
    console.log("id: ", id);

    const getData = async () => {
      if (checkAddressFormat(id)) {
        setPresaleData((prev) => ({ ...prev, tokenAddress: id }));
        const _presaleInfo = await getPresaleInfo(id);
        console.log("_presaleInfo: ", _presaleInfo);

        if (_presaleInfo != null) {
          setPresaleData((prev) => ({
            ...prev,
            authority: _presaleInfo.authority.toBase58(),
            softCap: _presaleInfo.softcapAmount.toString() / LAMPORTS_PER_SOL,
            hardCap: _presaleInfo.hardcapAmount.toString() / LAMPORTS_PER_SOL,
            presaleRate: _presaleInfo.presalePrice.map(
              (item) => item.toString() / DENOMINATOR,
            ),
            listingRate: _presaleInfo.listingPrice.toString() / DENOMINATOR,
            minBuy: _presaleInfo.minBuy.toString() / LAMPORTS_PER_SOL,
            maxBuy: Math.min(_presaleInfo.maxBuy.toString() / LAMPORTS_PER_SOL, 50),
            liquidityPct: _presaleInfo.lpPercent.toString() / DENOMINATOR,
            tokenVault: _presaleInfo.tokenVault.toString(),
            solVault: _presaleInfo.solVault.toString(),
            gummyVault: _presaleInfo.gummyVault.toString(),
            startTime: _presaleInfo.startTime.toString(),
            endTime: _presaleInfo.endTime.toString(),
            quoteTokenAmount: _presaleInfo.quoteTokenAmount.map(
              (item) => item.toString() / LAMPORTS_PER_SOL,
            ),
            lpLockupDays: _presaleInfo.lockPeriod.toString(),
            holders: _presaleInfo.holders.toString(),
            refundType: _presaleInfo.refundType,
            autoLp: _presaleInfo.isAutoListing,
            validTokenCount: _presaleInfo.validTokenCount,
            whitelisted_tokens: _presaleInfo.whitelistedTokens,
          }));
        }

        const { decimals, amount } = await getTokenAmountAndDecimals(id);
        console.log("decimals: ", decimals);
        if (amount > 0) {
          setPresaleData((prev) => ({
            ...prev,
            decimals,
            totalSupply: amount,
          }));
        }
      }
    };

    getData();
  }, [id]);

  // TODO: make this dynamic
  const listing =
    listingMetadata["mpadYYmm4W8xwTweM9QCpN3xBsrDwGkmuVq5iKBQoiB"];

  // if (typeof window !== "undefined") {
  //   window.location.href = "/";
  // }

  return (
    <div className="bg-token-details-page bg-no-repeat object-cover bg-center bg-[#A393FE]">
      <div className="max-w-[1920px] mx-auto p-4">
        <TokenDetailsPageBanner />
        <TokenDetailsSection token={listing} />

        {/* footer */}
        {/* desktop bottom nav and socials */}
        <div className="hidden lg:flex flex-col xl:flex-row items-center py-2 justify-center xl:gap-16 lg:gap-7 mx-auto">
          <NavRoutes color="white" />
          <Socials color="white" gap={10} textSize="sm" />
        </div>
      </div>
    </div>
  );
};
export default TokenDetailsPage;
