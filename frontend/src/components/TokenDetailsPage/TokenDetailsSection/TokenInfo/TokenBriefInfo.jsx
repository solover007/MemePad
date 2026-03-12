import { useContext } from "react";
import Web3Context from "../../contexts/Web3Context";
import { toast } from "react-toastify";
import CopyIcon from "@/public/icons/TokenDetailsPage/CopyIcon";
import WarningIcon from "@/public/icons/TokenDetailsPage/WarningIcon";
import {
  copyTextToClipboard,
  numberWithCommas,
  secondsToTimeFormat,
} from "@/lib/utils";

const TokenBriefInfo = () => {
  const {
    presaleData: {
      tokenAddress,
      tokenName,
      symbol,
      decimals,
      totalSupply,
      softCap,
      hardCap,
      presaleRate,
      listingRate,
      minBuy,
      maxBuy,
      liquidityPct,
      lpLockupDays,
      refundType,
      solVault,
      gummyVault,
      startTime,
      endTime,
      validTokenCount,
    },
  } = useContext(Web3Context);

  const copyAddress = async (_address) => {
    const res = await copyTextToClipboard(_address);
    if (res) {
      return toast.success("Copied");
    }
  };

  return (
    <div className="pl-4 pr-2 py-4 my-10 bg-[#F0F0F0]">
      {/* address */}
      <div className="flex items-center pb-2 justify-between border-b border-[#C4BEDD]">
        <p className="font-bold">Address</p>
        <div className="flex flex-col items-end">
          <div className="flex items-center gap-2">
            <p className="text-sm font-medium text-[#DE9CFD] truncate w-32 md:w-40 lg:w-full">
              {tokenAddress}
            </p>
            <div onClick={() => copyAddress(tokenAddress)}>
              <CopyIcon className="w-4 hover:cursor-pointer" />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <WarningIcon className="w-4 hidden md:block" />
            <p className="text-sm  text-end font-medium text-[#9B8EF0]">
              Do not send SOL to the token address
            </p>
          </div>
        </div>
      </div>

      {/* name */}
      <div className="flex items-center justify-between font-bold py-3 border-b border-[#C4BEDD]">
        <p>Name</p>
        <p>{tokenName}</p>
      </div>

      {/* symbol */}
      <div className="flex items-center justify-between font-bold py-3 border-b border-[#C4BEDD]">
        <p>Symbol</p>
        <p>{symbol}</p>
      </div>

      {/* decimals */}
      <div className="flex items-center justify-between font-bold py-3 border-b border-[#C4BEDD]">
        <p>Decimals</p>
        <p>{decimals}</p>
      </div>

      {/* total supply */}
      <div className="flex items-center justify-between font-bold pt-3">
        <p>Total Supply</p>
        <p>{numberWithCommas(totalSupply)}</p>
      </div>

      {/* pool info */}
      <div className="mt-14">
        <h4 className="text-xl font-broad font-bold text-[#452BC0]">
          POOL INFO
        </h4>

        {/* address */}
        <div className="mt-3 flex items-center pb-2 justify-between border-b border-[#C4BEDD]">
          <p className="font-bold">Address</p>
          <div className="flex flex-col items-end">
            <div className="flex items-center gap-2">
              <p className="font-medium text-[#DE9CFD]">{solVault}</p>
              <div onClick={() => copyAddress(solVault)}>
                <CopyIcon className="w-4 hover:cursor-pointer" />
              </div>
            </div>
            <div className="flex items-center gap-2">
              <WarningIcon className="w-4 hidden md:block" />
              <p className="text-sm font-medium text-end text-[#9B8EF0]">
                Do not send SOL to the token address
              </p>
            </div>
          </div>
        </div>

        {/* token for presale */}
        <div className="flex items-center justify-between font-bold py-3 border-b border-[#C4BEDD]">
          <p>Tokens For Presale</p>
          <p>{`${numberWithCommas(presaleRate[0] * hardCap)} ${symbol}`}</p>
        </div>

        {/* token for liquidity */}
        <div className="flex items-center justify-between font-bold py-3 border-b border-[#C4BEDD]">
          <p>Tokens For Liquidity</p>
          <p>{`${numberWithCommas(listingRate * hardCap)} ${symbol}`}</p>
        </div>

        {/* softcap */}
        <div className="flex items-center justify-between font-bold py-3 border-b border-[#C4BEDD]">
          <p>SoftCap</p>
          <p>{softCap} SOL</p>
        </div>

        {/* hardcap */}
        <div className="flex items-center justify-between font-bold py-3 border-b border-[#C4BEDD]">
          <p>HardCap</p>
          <p>{hardCap} SOL</p>
        </div>

        {/* start time */}
        <div className="flex items-center justify-between font-bold py-3 border-b border-[#C4BEDD]">
          <p>Start time</p>
          <p>{secondsToTimeFormat(startTime)}</p>
        </div>

        {/* end time */}
        <div className="flex items-center justify-between font-bold py-3 border-b border-[#C4BEDD]">
          <p>End time</p>
          <p>{secondsToTimeFormat(endTime)}</p>
        </div>

        {/* listing on */}
        <div className="flex items-center justify-between font-bold py-3 border-b border-[#C4BEDD]">
          <p>Listing on</p>
          <p className="font-medium text-[#DE9CFD]">Raydium AMM V4</p>
        </div>
        {/* Liquidity percent */}
        <div className="flex items-center justify-between font-bold py-3 border-b border-[#C4BEDD]">
          <p>Liquidity percent</p>
          <p>3%</p>
        </div>
      </div>
    </div>
  );
};
export default TokenBriefInfo;
