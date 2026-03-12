import { useContext, useEffect, useState } from "react";
import Web3Context from "../contexts/Web3Context";
import GraphIcon from "@/public/icons/TokenDetailsPage/GraphIcon";
import SwapIcon from "@/public/icons/TokenDetailsPage/SwapIcon";
import TokenBar from "@/public/icons/TokenDetailsPage/TokenBar";

import { useWallet } from "@solana/wallet-adapter-react";
import {
  buyTokenWithSol,
  getUserPresaleStateData,
  finalize,
  finalizeAuto,
  claimToken,
  emergencyWithdraw,
  withdrawSol,
  initialize
} from "../../../contract/launchpad/presale";
import { toast } from "react-toastify";
import { LAMPORTS_PER_SOL, PublicKey } from "@solana/web3.js";
import { GUMMY, QUOTE_TOKEN_ID, WSOL, checkAddressFormat, getWalletSolBalance, showTxResult } from "@/contract/launchpad/web3";
import { getRoundedValue, numberWithCommas } from "@/lib/utils";
import InputField from "./InputField";
import { getOpenBookMarketId } from "@/contract/launchpad/raydium";
import Select from "@/components/Select";


const tokenStatus = "presale";

const AdminCard = () => {
  const wallet = useWallet();

  // TODO: API integration
  const {
    presaleData: {
      authority,
      tokenAddress,
      decimals,
      minBuy,
      maxBuy,
      presaleRate,
      quoteTokenAmount,
      hardCap,
      startTime,
      endTime,
      autoLp,
      liquidityPct,
      listingRate,
      symbol,

      payToken,
      payTokenIndex
    },
    setPresaleData
  } = useContext(Web3Context);

  const [solAmount, setSolAmount] = useState(1);
  const [loading, setLoading] = useState(false);
  const [isAdmin, setAdmin] = useState(false);
  const [isEnabled, setEnable] = useState(false);

  const [userBuyTokenAmount, setUserBuyTokenAmount] = useState(0);
  const [userBuyQuoteTokenAmount, setUserBuyQuoteTokenAmount] = useState(0);
  const [userClaimTokenAmount, setUserClaimTokenAmount] = useState(0);
  const [userQuoteTokenAmount, setUserQuoteTokenAmount] = useState(0);

  useEffect(() => {
    if (wallet?.publicKey) {
      if (checkAddressFormat(tokenAddress)) {
        fetchUserState(wallet, tokenAddress);
      }
      if (wallet.publicKey.toBase58() === authority) {
        setAdmin(true);
      } else {
        setAdmin(false);
      }

      const curTime = parseInt(Date.now() / 1000);
      const _status = startTime > curTime ? 0 : curTime > endTime ? 2 : 1;
      console.log('startTime: ', startTime, curTime, endTime, _status);
      if (_status != 2) { // not ended yet
        setEnable(false);
      } else {
        setEnable(true);
      }

    } else {
      setAdmin(false);
    }
  }, [wallet, tokenAddress, authority]);

  const fetchUserState = async (_wallet, _tokenAddress) => {
    const userStateData = await getUserPresaleStateData(_wallet, _tokenAddress);

    if (userStateData != null) {
      setUserBuyTokenAmount(
        userStateData.buyTokenAmount.toString() / Math.pow(10, decimals),
      );

      setUserClaimTokenAmount(
        userStateData.claimAmount.toString() / Math.pow(10, decimals),
      );
      setUserBuyQuoteTokenAmount(
        userStateData.buyQuoteTokenAmount.toString() / LAMPORTS_PER_SOL,
      );
      setUserQuoteTokenAmount(
        userStateData.buyQuoteTokenAmount.toString() / LAMPORTS_PER_SOL,
      );
    } else {
      setUserBuyTokenAmount(0);
      setUserBuyQuoteTokenAmount(0);
      setUserClaimTokenAmount(0);
      setUserQuoteTokenAmount(0);
    }
  };

  const handleClickInitialize = async () => {
    if (!wallet?.publicKey) {
      toast.info("Please connect your wallet");
      return;
    }

    if (loading) {
      toast.warning("Processing now. please try again later");
      return;
    }

    try {
      const txHash = await initialize(
        wallet,
      );

      showTxResult(txHash);
    } catch (err) {
      console.error("handleClickBuy Error: ", err);
    }

    setLoading(false);
  }

  const handleClickBuy = async () => {
    console.log("presaleData: ", payToken, payTokenIndex);

    if (!wallet?.publicKey) {
      toast.info("Please connect your wallet");
      return;
    }

    if (loading) {
      toast.warning("Processing now. please try again later");
      return;
    }

    const tokenAmount = solAmount * presaleRate[QUOTE_TOKEN_ID];

    if (maxBuy < Number(userQuoteTokenAmount) + Number(solAmount)) {
      toast.info('You could not over Max buy amount');
      return;
    }

    if (minBuy > solAmount) {
      toast.info(`Minimum buy amount: ${minBuy} SOL`);

      return;
    }

    if (solAmount == 0 || tokenAmount == 0) {
      toast.warning("Please input correct purchasing amount");
      return;
    }

    setLoading(true);

    const solBalance = await getWalletSolBalance(wallet.publicKey);
    console.log("solBalance: ", solBalance);
    if (solAmount >= Number(solBalance)) {
      toast.warning(`Insufficient balance: ${Number(solBalance).toFixed(2)}`);
      setLoading(false);
      return;
    }

    console.log("Wallet: ", wallet.publicKey);
    try {
      const txHash = await buyTokenWithSol(
        wallet,
        new PublicKey(tokenAddress),
        tokenAmount,
        solAmount,
        decimals,
      );

      showTxResult(txHash);
      if (txHash) {
        // await fetchPresaleInfo();
        // await fetchUserState(wallet);
      }
    } catch (err) {
      console.error("handleClickBuy Error: ", err);
    }

    setLoading(false);
  }

  const handleClickClaim = async () => {
    if (!wallet?.publicKey) {
      toast.info("Please connect your wallet");
      return;
    }

    if (loading) {
      toast.warning("Processing now. please try again later");
      return;
    }

    setLoading(true);
    console.log('Wallet: ', wallet.publicKey);
    try {
      const txHash = await claimToken(wallet, new PublicKey(tokenAddress));

      showTxResult(txHash);
      if (txHash) {
        // await fetchPresaleInfo();
        // await fetchUserState(wallet);
      }
    } catch (err) {
      console.error("handleClickClaim Error: ", err);
    }

    setLoading(false);
  }

  const handleClickEmergencyWithdraw = async () => {
    if (!wallet?.publicKey) {
      toast.info("Please connect your wallet");
      return;
    }

    if (loading) {
      toast.warning("Processing now. please try again later");
      return;
    }

    setLoading(true);
    console.log('Wallet: ', wallet.publicKey);
    try {
      const txHash = await emergencyWithdraw(wallet, new PublicKey(tokenAddress));

      showTxResult(txHash);
      if (txHash) {
        // await fetchPresaleInfo();
        // await fetchUserState(wallet);
      }
    } catch (err) {
      console.error("handleClickEmergencyWithdraw Error: ", err);
    }

    setLoading(false);
  }

  const handleClickFinalize = async () => {
    if (!wallet?.publicKey) {
      toast.info("Please connect your wallet");
      return;
    }

    if (loading) {
      toast.warning("Processing now. please try again later");
      return;
    }

    if (endTime < Date.now() / 1000) {
      toast.info("Presale is not finished yet");
      return;
    }

    setLoading(true);

    let marketId;
    if (autoLp) {
      marketId = await getOpenBookMarketId(tokenAddress);
      console.log("marketId: ", marketId);
      if (marketId == null) {
        toast.info("Please create your OpenBook MarketID first");
        setLoading(false);
        return;
      } else {
        toast.info(`Your market id is ${marketId.toBase58()}`);
      }
    }

    try {
      const txHash = await finalizeAuto(
        wallet,
        new PublicKey(tokenAddress),
        quoteTokenAmount,
        autoLp,
        liquidityPct,
        listingRate,
        decimals,
        new PublicKey(marketId),
      );

      showTxResult(txHash);
      if (txHash) {
        // await fetchPresaleInfo();
      }
    } catch (err) {
      console.error("handleClickFinalize Error: ", err);
    }

    setLoading(false);
  };

  const handleClickCreateLiquidity = async () => {
    if (!wallet?.publicKey) {
      toast.info("Please connect your wallet");
      return;
    }

    if (loading) {
      toast.warning("Processing now. please try again later");
      return;
    }

    if (endTime < Date.now() / 1000) {
      toast.info("Presale is not finished yet");
      return;
    }

    setLoading(true);

    let marketId;
    if (autoLp) {
      marketId = await getOpenBookMarketId(tokenAddress);
      console.log("marketId: ", marketId);
      if (marketId == null) {
        toast.info("Please create your OpenBook MarketID first");
        setLoading(false);
        return;
      } else {
        toast.info(`Your market id is ${marketId.toBase58()}`);
      }
    }

    try {
      const txHash = await finalizeAuto(
        wallet,
        new PublicKey(tokenAddress),
        quoteTokenAmount,
        autoLp,
        liquidityPct,
        listingRate,
        decimals,
        new PublicKey(marketId),
      );

      showTxResult(txHash);
      if (txHash) {
        // await fetchPresaleInfo();
      }
    } catch (err) {
      console.error("handleClickFinalize Error: ", err);
    }

    setLoading(false);
  };

  const handleClickWithdrawSol = async () => {
    if (!wallet?.publicKey) {
      toast.info("Please connect your wallet");
      return;
    }

    if (loading) {
      toast.warning("Processing now. please try again later");
      return;
    }

    setLoading(true);

    try {
      const txHash = await withdrawSol(wallet, new PublicKey(tokenAddress));

      showTxResult(txHash);
      if (txHash) {
        // await fetchPresaleInfo();
        // await fetchUserState(wallet);
      }
    } catch (err) {
      console.error("handleClickWithdrawSol Error: ", err);
    }

    setLoading(false);
  }

  return (
    <>
      {
        isAdmin &&
        <div className="shadow p-4 border-2 border-[#271a5d] bg-white mt-6">
          <TokenBar
            tokenStatus={tokenStatus}
            className="w-full mt-4"
            color="#68FF9B"
          />
          {tokenStatus === "presale" ? (
            <div>
              <div className="flex items-center justify-between font-bold text-sm mt-5">
                <p>{quoteTokenAmount[QUOTE_TOKEN_ID]?.toString() ?? 0} SOL ($-- K)</p>
                <p>{hardCap} SOL ($-- K)</p>
              </div>

              <div className="flex flex-col items-center gap-2 mt-5">
                <p className="font-bold text-center">Tier 1 / Time left</p>
                <div className="flex items-center gap-2 font-medium text-[#DE9CFD]">
                  <button>Pre Sale</button>
                </div>

                <div className="flex items-center gap-1">
                  <SwapIcon className="w-5" />
                  <button className="border-b border-black font-bold">
                    Buy Token
                  </button>
                </div>



                {/* connect wallet */}
                <div className="w-full flex flex-col justify-center gap-2 mt-5">
                  <div
                    className={`hidden p-5 border-x border-t border-b-8 border-black bg-green-600 ${loading ? " cursor-not-allowed" : "cursor-pointer"}`}
                  >
                    <p
                      className="font-broad font-bold text-white text-center"
                      onClick={handleClickInitialize}
                    >
                      Initialize (START)
                    </p>
                  </div>
                  {userBuyQuoteTokenAmount > 0 && (
                    <>
                      <div className="flex items-center py-3 border-b border-[#C4BEDD] justify-between font-bold text-sm ">
                        <p>Buy Token Amount</p>
                        <p className="text-black">
                          {numberWithCommas(userBuyTokenAmount)}
                        </p>
                      </div>
                      <div className="flex items-center py-3 border-b border-[#C4BEDD] justify-between font-bold text-sm ">
                        <p>Total contribution</p>
                        <p className="text-black">
                          {numberWithCommas(userBuyQuoteTokenAmount)} SOL
                        </p>
                      </div>
                      <div className="flex items-center py-3 border-b border-[#C4BEDD] justify-between font-bold text-sm ">
                        <p>Claim Token Amount</p>
                        <p className="text-black">
                          {numberWithCommas(userClaimTokenAmount)}
                        </p>
                      </div>
                      <div className={`p-5 border-x border-t border-b-8 border-black bg-[#7A64F4] ${loading ? ' cursor-not-allowed' : 'cursor-pointer'}`}>
                        <p className="font-broad font-bold text-white text-center" onClick={handleClickClaim}>
                          Claim
                        </p>
                      </div>
                      <div className={`p-5 border-x border-t border-b-8 border-black bg-red-600 ${loading ? ' cursor-not-allowed' : 'cursor-pointer'}`}>
                        <p className="font-broad font-bold text-white text-center" onClick={handleClickEmergencyWithdraw}>
                          Emergency Withdraw
                        </p>
                      </div>
                    </>
                  )}
                  {isAdmin && isEnabled && (
                    <>
                      <div
                        className={`p-5 border-x border-t border-b-8 border-black bg-[#7A64F4] ${loading ? " cursor-not-allowed" : "cursor-pointer"}`}
                      >
                        <p
                          className="font-broad font-bold text-white text-center"
                          onClick={handleClickCreateLiquidity}
                        >
                          Create Liquidity
                        </p>
                      </div>
                      <div
                        className={`p-5 border-x border-t border-b-8 border-black bg-[#7A64F4] ${loading ? " cursor-not-allowed" : "cursor-pointer"}`}
                      >
                        <p
                          className="font-broad font-bold text-white text-center"
                          onClick={handleClickFinalize}
                        >
                          Finalize
                        </p>
                      </div>
                      <div
                        className={`p-5 border-x border-t border-b-8 border-black bg-[#7A64F4] ${loading ? " cursor-not-allowed" : "cursor-pointer"}`}
                      >
                        <p
                          className="font-broad font-bold text-white text-center"
                          onClick={handleClickWithdrawSol}
                        >
                          Withdraw
                        </p>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <div>
              <div className="flex items-center justify-between font-bold text-sm mt-5">
                <p>3,551.67 SOL ($540.8K)</p>
                <p>123 SOL ($18.7K)</p>
              </div>

              <div className="flex flex-col items-center gap-2 mt-5">
                <p className="font-bold text-center">This pool has been ended</p>
                <div className="flex items-center gap-2 font-medium text-[#DE9CFD]">
                  <GraphIcon className="w-5" />
                  <button>View Chart</button> |<button>Buy/Sell</button>
                </div>

                <div className="flex items-center gap-1">
                  <SwapIcon className="w-5" />
                  <button className="border-b border-black font-bold">
                    Swap Token
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      }
    </>
  );
};
export default AdminCard;
