import { useContext } from "react";
import Web3Context from "../contexts/Web3Context";
import TokenBar from "@/public/icons/TokenDetailsPage/TokenBar";

const TokenStatusCardTwo = () => {
  const {
    presaleData: {
      tokenAddress,
      symbol,
      minBuy,
      maxBuy,
      presaleRate,
      quoteTokenAmount,
      hardCap,
      holders,
      startTime,
      endTime,
      payToken,
      payTokenIndex,
    },
  } = useContext(Web3Context);

  console.log("presaleRate: ", payTokenIndex, presaleRate[payTokenIndex]);

  const PresaleStatus = () => {
    const curTime = parseInt(Date.now() / 1000);
    const _status = startTime > curTime ? 0 : curTime > endTime ? 2 : 1;
    console.log("startTime: ", startTime, curTime, endTime, _status);

    return (
      <p
        className={`${
          _status == 0
            ? "text-[#DE9CFD]"
            : _status == 1
            ? "text-[#10B981]"
            : "text-red-600"
        }`}
      >
        {_status == 0 ? "Upcoming" : _status == 1 ? "Live Now" : "Ended"}
      </p>
    );
  };

  return (
    <div className="shadow p-4 border-2 border-[#271a5d] bg-white mt-6 w-full">
      <TokenBar
        tokenStatus="launched"
        className="w-full mt-4"
        color="#8575E2"
      />

      {/* status */}
      <div className="flex items-center pb-2 border-b border-[#C4BEDD] justify-between font-bold text-sm mt-5">
        <p>Status</p>
        {PresaleStatus()}
      </div>

      {/* sale type */}
      <div className="flex items-center py-3 border-b border-[#C4BEDD] justify-between font-bold text-sm ">
        <p>Sale type</p>
        <p className="text-[#DE9CFD]">Public</p>
      </div>

      {/* min buy */}
      <div className="flex items-center py-3 border-b border-[#C4BEDD] justify-between font-bold text-sm">
        <p>Min buy</p>
        <p>{minBuy} SOL</p>
      </div>
      {/* max buy */}
      <div className="flex items-center py-3 border-b border-[#C4BEDD] justify-between font-bold text-sm">
        <p>Max buy</p>
        <p>{maxBuy} SOL</p>
      </div>

      {/* current rate */}
      <div className="flex items-center py-3 border-b border-[#C4BEDD] justify-between font-bold text-sm">
        <p>Current Rate</p>
        <p>{`1 ${payTokenIndex == 0 ? "SOL" : "GUMMY"} = ${
          presaleRate[payTokenIndex]
        } ${symbol}`}</p>
      </div>

      {/* current raise */}
      <div className="flex items-center py-3 border-b border-[#C4BEDD] justify-between font-bold text-sm">
        <p>Current raised</p>
        {/* <p>{`${quoteTokenAmount[payTokenIndex]?.toString() ?? 0 } ${payTokenIndex == 0 ? 'SOL' : 'GUMMY'} (${(hardCap == 0 ? 0 : 100 * quoteTokenAmount[payTokenIndex]?.toString() ?? 0 / hardCap).toFixed(2)}%)`}</p> */}
        <p>{`${quoteTokenAmount[payTokenIndex]?.toString() ?? 0} ${
          payTokenIndex == 0 ? "SOL" : "GUMMY"
        }`}</p>
      </div>

      {/* contributors */}
      <div className="flex items-center py-3 border-b border-[#C4BEDD] justify-between font-bold text-sm">
        <p>Total Contributors</p>
        <p>{holders}</p>
      </div>
    </div>
  );
};
export default TokenStatusCardTwo;
