import { useContext, useEffect, useState } from "react";
import Web3Context from "../contexts/Web3Context";
import GraphIcon from "@/public/icons/TokenDetailsPage/GraphIcon";
import SwapIcon from "@/public/icons/TokenDetailsPage/SwapIcon";
import TokenBar from "@/public/icons/TokenDetailsPage/TokenBar";
import { Spinner } from "@nextui-org/react";
import { DateTime } from "luxon";

import { useWallet } from "@solana/wallet-adapter-react";
import greenFire from "@/public/icons/TokenDetailsPage/GreenFire.png";
import dashboardBtn from "@/public/icons/TokenDetailsPage/DashboardBtn.png";
import purchaseIcon from "@/public/icons/TokenDetailsPage/Purchase.png";
import apeDrink from "@/public/icons/TokenDetailsPage/apeDrink.png";
import apeGun from "@/public/icons/TokenDetailsPage/apeGun.png";
import {
  buyTokenWithSol,
  getUserPresaleStateData,
  finalize,
  finalizeAuto,
  claimToken,
  emergencyWithdraw,
  withdrawSol,
  initialize,
} from "../../../contract/launchpad/presale";
import { toast } from "react-toastify";
import { LAMPORTS_PER_SOL, PublicKey } from "@solana/web3.js";
import {
  GUMMY,
  WSOL,
  checkAddressFormat,
  getWalletSolBalance,
  showTxResult,
} from "@/contract/launchpad/web3";
import { getRoundedValue, numberWithCommas } from "@/lib/utils";
import InputField from "./InputField";
import { getOpenBookMarketId } from "@/contract/launchpad/raydium";
import Select from "@/components/Select";
import { createBuyLog } from "@/lib/api";
import Modal from "@/components/ui/Modal";
import TokenModal from "../TokenModal/TokenPurchaseModal";
import Image from "next/image";
import Link from "next/link";
import { getTokenAccountBalance } from "@/contract/launchpad/keys";
import { useAuth } from "@/lib/providers/AuthProvider";
import useCountDown from "@/lib/hooks/useCountDown";

const tokenStatus = "presale";

const TokenStatusCardOne = () => {
  const wallet = useWallet();
  const { login, isLoggedIn } = useAuth();

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
      payTokenIndex,
    },
    setPresaleData,
  } = useContext(Web3Context);

  const [solAmount, setSolAmount] = useState(1);
  const [loading, setLoading] = useState(false);
  const [isAdmin, setAdmin] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [token, setToken] = useState("SOL");
  const [userBuyTokenAmount, setUserBuyTokenAmount] = useState(0);
  const [userBuyQuoteTokenAmount, setUserBuyQuoteTokenAmount] = useState(0);
  const [userClaimTokenAmount, setUserClaimTokenAmount] = useState(0);
  const [userQuoteTokenAmount, setUserQuoteTokenAmount] = useState(0);

  const [userWSolAmount, setUserWSolAmount] = useState(0);
  const [userGummyAmount, setUserGummyAmount] = useState(0);

  const [gummyMinBuy, setGummyMinBuy] = useState(0);
  const [gummyMaxBuy, setGummyMaxBuy] = useState(0);
  const [tokenAmount, setTokenAmount] = useState(0);
  const [status, setStatus] = useState(0);
  // TODO: fix
  // const { days, hours, minutes, seconds } = useCountDown(
  //   endTime
  //     ? DateTime.fromMillis(Number.parseInt(endTime) * 1000).setZone("CET")
  //     : 0,
  // );
  const { days, hours, minutes, seconds } = useCountDown(
    "2024-06-18T17:17:00Z"
  );

  useEffect(() => {
    let convertedAmount = (minBuy * presaleRate[0]) / presaleRate[1];
    setGummyMinBuy(convertedAmount);
    convertedAmount = (maxBuy * presaleRate[0]) / presaleRate[1];
    setGummyMaxBuy(convertedAmount);

    const curTime = parseInt(Date.now() / 1000);
    const _status = startTime > curTime ? 0 : curTime > endTime ? 2 : 1;
    setStatus(_status);
    console.log("startTime: ", startTime, curTime, endTime, _status);
  }, [minBuy, presaleRate]);

  useEffect(() => {
    if (wallet?.publicKey) {
      if (checkAddressFormat(tokenAddress)) {
        fetchUserState(wallet, tokenAddress);
      }
    }
  }, [wallet, tokenAddress]);

  const fetchUserState = async (_wallet, _tokenAddress) => {
    console.log(
      "fetchUserState: ",
      _wallet.publicKey.toBase58(),
      _tokenAddress
    );
    const userStateData = await getUserPresaleStateData(_wallet, _tokenAddress);
    console.log("userStateData: ", userStateData);

    if (userStateData != null) {
      setUserBuyTokenAmount(
        userStateData.buyTokenAmount.toString() / Math.pow(10, decimals)
      );

      setUserClaimTokenAmount(
        userStateData.claimAmount.toString() / Math.pow(10, decimals)
      );
      setUserBuyQuoteTokenAmount(
        userStateData.buyQuoteTokenAmount[payTokenIndex].toString() /
          LAMPORTS_PER_SOL
      );
      setUserWSolAmount(
        userStateData.buyQuoteTokenAmount[0].toString() / LAMPORTS_PER_SOL
      );
      setUserGummyAmount(
        userStateData.buyQuoteTokenAmount[1].toString() / LAMPORTS_PER_SOL
      );
      // setUserQuoteTokenAmount(
      //   userStateData.buyQuoteTokenAmount[payTokenIndex].toString() / LAMPORTS_PER_SOL,
      // );
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
      const txHash = await initialize(wallet);

      showTxResult(txHash);
    } catch (err) {
      console.error("handleClickBuy Error: ", err);
    }

    setLoading(false);
  };

  const handleClickBuy = async () => {
    return;
    console.log(
      "presaleData: ",
      payToken,
      payTokenIndex,
      solAmount * presaleRate[payTokenIndex]
    );

    if (!isLoggedIn) {
      // toast.info("Please connect your wallet");
      login();
      return;
    }

    const _tokenAmount = solAmount * presaleRate[payTokenIndex];

    console.log("TOKEN AMOUNT:", _tokenAmount);

    if (status == 0) {
      toast.error(
        "Congrats, you absolute legend! You nailed the dip and made those tendies rain! We're all riding to the moon in our Lambos, and you're the hero who got us there. Keep flexing those gains, champ! 🚀💰🔥"
      );
      return;
    }

    if (status == 2) {
      toast.error(
        "Congrats on missing out, genius! While we're stacking gains, you can keep stacking those regrets. Better luck next time, you paper-handed pleb! 🚀💸"
      );
      return;
    }

    if (loading) {
      toast.warning("Processing now. please try again later");
      return;
    }

    const tokenAmount = solAmount * presaleRate[payTokenIndex];

    console.log("TOKEN AMOUNT:", tokenAmount);

    if (payTokenIndex == 0 && maxBuy < Number(solAmount)) {
      toast.info("You could not over Max buy amount");
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

    const solBalance =
      payTokenIndex == 0
        ? await getWalletSolBalance(wallet.publicKey)
        : (await getTokenAccountBalance(new PublicKey(GUMMY), wallet.publicKey))
            ?.uiAmount;
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
        payTokenIndex
      );

      showTxResult(txHash);
      if (txHash) {
        // await fetchPresaleInfo();
        // await fetchUserState(wallet);
        // TODO: Show purchase successfull

        setTokenAmount(tokenAmount);
        setIsModalOpen(!isModalOpen);
        setLoading(false);
        // TODO: buy log
        createBuyLog({
          listing_id: 1,
          token: token,
          amount: tokenAmount,
          pur_amount: Number.parseFloat(solAmount),
          claimed_amount: 0,
          created_at: new Date().toISOString(),
        });
      }
    } catch (err) {
      console.error("handleClickBuy Error: ", err);
      toast("Purchase failed, please try again: " + err, { type: "error" });
    }

    setLoading(false);
  };

  const handleClickClaim = async () => {
    if (!isLoggedIn) {
      // toast.info("Please connect your wallet");
      login();
      return;
    }

    if (loading) {
      toast.warning("Processing now. please try again later");
      return;
    }

    if (status < 2) {
      toast.error("Not ended yet");
      return;
    }

    setLoading(true);
    console.log("Wallet: ", wallet.publicKey);
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
  };

  const handleClickEmergencyWithdraw = async () => {
    if (!isLoggedIn) {
      // toast.info("Please connect your wallet");
      login();
      return;
    }

    if (loading) {
      toast.warning("Processing now. please try again later");
      return;
    }

    setLoading(true);
    console.log("Wallet: ", wallet.publicKey);
    try {
      const txHash = await emergencyWithdraw(
        wallet,
        new PublicKey(tokenAddress),
        payTokenIndex
      );

      showTxResult(txHash);
      if (txHash) {
        // await fetchPresaleInfo();
        // await fetchUserState(wallet);
      }
    } catch (err) {
      console.error("handleClickEmergencyWithdraw Error: ", err);
    }

    setLoading(false);
  };

  const handleClickFinalize = async () => {
    if (!isLoggedIn) {
      // toast.info("Please connect your wallet");
      login();
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
        new PublicKey(marketId)
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
    if (!isLoggedIn) {
      // toast.info("Please connect your wallet");
      login();
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
  };

  const handleSelectedToken = (value) => {
    setPresaleData((prev) => ({
      ...prev,
      payToken: value,
      payTokenIndex: value === "SOL" ? 0 : 1,
    }));
    setToken(value);
  };

  return (
    <div className="shadow p-4 border-2 border-[#271a5d] bg-white w-full">
      <TokenBar
        tokenStatus={tokenStatus}
        currentRaised={quoteTokenAmount[0]?.toString() ?? 0}
        hardCap={hardCap}
        className="w-full mt-4"
        color="#68FF9B"
      />
      {tokenStatus === "presale" ? (
        <div>
          <div className="flex items-center justify-between font-bold text-sm mt-5">
            <p>
              {/* {quoteTokenAmount[0]?.toString() ?? 0} SOL +{" "} */}
              {parseFloat(quoteTokenAmount[0]?.toString() ?? 0).toFixed(2)} SOL
              + {quoteTokenAmount[1]?.toString() ?? 0} GUMMY
            </p>
            <p>{hardCap} SOL</p>
          </div>

          <div className="flex flex-col items-center gap-2 mt-5">
            <p className="font-bold text-center">
              {days}d {hours}h {minutes}m {seconds}s
            </p>
            <div className="flex items-center gap-2 font-medium text-[#DE9CFD]">
              <p>Pre Sale</p>
            </div>

            <div className="flex items-center gap-1">
              <SwapIcon className="w-5" />
              <p className="border-b border-black font-bold">Buy Token</p>
            </div>

            {/* old dropdown */}
            {/* <Select
              className="block w-full py-[13px] px-4 pr-6 border min-w-[160px] !border-[#B6B6B6] bg-white rounded-md text-[14px] font-lato text-gray-400 focus:outline-none appearance-none"
              options={[
                {
                  label: "SOL",
                  value: SOL,
                },
                {
                  label: "GUMMY",
                  value: GUMMY,
                },
              ]}
              value={payToken}
              onSelect={(e) => {
                console.log(e);
                setPresaleData((prev) => ({
                  ...prev,
                  payToken: e,
                  payTokenIndex: e == SOL ? 0 : 1,
                }));
              }}
            /> */}
            {/* new tab select */}
            <div className="flex items-center gap-3 mt-2">
              <div
                onClick={() => handleSelectedToken("SOL")}
                className={`${
                  token === "SOL"
                    ? "btn-shadow font-bold px-3 py-1 text-white bg-[#6922FF] text-lg"
                    : "border font-bold px-4 py-1 text-[#6922FF] border-[#6922FF] text-md"
                } flex items-center gap-2`}
              >
                <Image
                  width={500}
                  height={500}
                  // src={SolanaLogoSVG}
                  src="/icons/HomeSectionTwo/solana.svg"
                  className="w-5"
                  alt="solana"
                />
                <button>SOL</button>
              </div>
              <div
                onClick={() => handleSelectedToken("GUMMY")}
                className={`${
                  token === "GUMMY"
                    ? "btn-shadow font-bold px-3 py-1 text-white bg-[#2622ff] text-lg"
                    : "border font-bold px-4 py-1 text-[#2622ff] border-[#2622ff] text-md"
                } flex items-center gap-1`}
              >
                <Image
                  width={500}
                  height={500}
                  // src={SolanaLogoSVG}
                  src="/icons/TokenDetailsPage/GummyIcon.png"
                  className="w-6"
                  alt="solana"
                />
                <button>GUMMY</button>
              </div>
            </div>

            {/* connect wallet */}
            <div className="w-full flex flex-col justify-center gap-2 mt-5">
              <InputField
                token={payTokenIndex == 0 ? "$SOL" : "$GUMMY"}
                label="You Pay"
                value={solAmount}
                setValue={setSolAmount}
                hint="244"
                isInput={true}
                backgroundColor="#eeeeee"
                showPriceHint={false}
                // minPurchase={payTokenIndex == 0 ? minBuy : gummyMinBuy}
                // maxPurchase={payTokenIndex == 0 ? maxBuy : gummyMaxBuy}
                isNumberInput
              />
              <InputField
                token={`$${symbol}`}
                label="You Get"
                value={getRoundedValue(solAmount * presaleRate[payTokenIndex])}
                backgroundColor="#CBCBCB"
              />

              <div
                onClick={handleClickBuy}
                // onClick={() => setIsModalOpen(!isModalOpen)}
                className={`p-5 border-x border-t border-b-8 border-black bg-[#7A64F4] ${
                  loading ? " cursor-not-allowed" : "cursor-pointer"
                }`}
              >
                <p className="font-broad font-bold text-white text-center uppercase">
                  {loading ? (
                    <Spinner label="Purchase in progress.. Please wait" />
                  ) : (
                    "Sold out"
                  )}
                </p>
              </div>
              <div
                className={`hidden p-5 border-x border-t border-b-8 border-black bg-green-600 ${
                  loading ? " cursor-not-allowed" : "cursor-pointer"
                }`}
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
                      {numberWithCommas(userWSolAmount)} SOL +{" "}
                      {numberWithCommas(userGummyAmount)} GUMMY
                    </p>
                  </div>
                  <div className="flex items-center py-3 border-b border-[#C4BEDD] justify-between font-bold text-sm ">
                    <p>Claim Token Amount</p>
                    <p className="text-black">
                      {numberWithCommas(userClaimTokenAmount)}
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
      {/* modal congratulate */}
      <TokenModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <div className="flex">
          <Image
            width={1000}
            height={1000}
            className="-mr-20 -mb-3 hidden lg:block"
            src={apeDrink}
            alt="ape drink"
            unoptimized
          />
          <div className="w-full h-full flex flex-col justify-center items-center py-20">
            <Image
              width={500}
              height={500}
              className="w-52"
              src={purchaseIcon}
              alt="Purchase icon"
            />
            <p className="font-broad uppercase font-bold text-center mt-6 text-sm px-6 md:w-[60%] lg:w-full lg:px-0 md:text-base">
              APED IN! You absolute legend! Keep flexing those gains, champ!
            </p>
            <div className="flex items-center gap-6 mt-2 pb-20 lg:pb-0 lg:my-6">
              <Image
                width={500}
                height={500}
                src={greenFire}
                className="w-5 lg:w-10"
                alt="green fire icon"
              />
              <h3 className="font-bold  text-center text-base lg:text-2xl">
                {parseFloat(Number(tokenAmount)).toFixed(2)} $MPAD
              </h3>
              <Image
                width={500}
                height={500}
                src={greenFire}
                className="w-5  lg:w-10"
                alt="green fire icon"
              />
            </div>
            <Link href="/dashboard">
              <Image
                width={500}
                height={500}
                className="w-52"
                src={dashboardBtn}
                alt="dashboard btn"
              />
            </Link>
          </div>

          <Image
            width={1000}
            height={1000}
            className=" -mb-3 hidden lg:block"
            src={apeGun}
            alt="ape drink"
            unoptimized
          />
        </div>
      </TokenModal>

      {/* <div */}
      {/*   className={`p-5 border-x border-t border-b-8 border-black bg-[#7A64F4] ${ */}
      {/*     loading ? " cursor-not-allowed" : "cursor-pointer" */}
      {/*   }`} */}
      {/* > */}
      {/*   <p */}
      {/*     className="font-broad font-bold text-white text-center" */}
      {/*     onClick={handleClickClaim} */}
      {/*   > */}
      {/*     Claim */}
      {/*   </p> */}
      {/* </div> */}
      {/* <div */}
      {/*   className={`p-5 border-x border-t border-b-8 border-black bg-red-600 ${ */}
      {/*     loading ? " cursor-not-allowed" : "cursor-pointer" */}
      {/*   }`} */}
      {/* > */}
      {/*   <p */}
      {/*     className="font-broad font-bold text-white text-center" */}
      {/*     onClick={handleClickEmergencyWithdraw} */}
      {/*   > */}
      {/*     Emergency Withdraw */}
      {/*   </p> */}
      {/* </div> */}
    </div>
  );
};
export default TokenStatusCardOne;
