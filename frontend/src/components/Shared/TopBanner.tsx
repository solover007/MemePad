import { useEffect, useState } from "react";
import FlagButton from "../Buttons/FlagButton";
import "./TopBanner.Module.css";
import useCountDown from "@/lib/hooks/useCountDown";
import { FIRST_LAUNCH } from "@/lib/utils/constants";

const TopBanner = () => {
  const [isClient, setIsClient] = useState(false);
  // const { finished } = useCountDown(FIRST_LAUNCH);
  const { days, hours, minutes, seconds } = useCountDown(
    "2024-06-18T17:17:00Z"
  );
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTime(new Date());
    }, 1000);

    // Cleanup interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  const formatTime = (date: any) => {
    // const hours = date.getHours().toString().padStart(2, "0");
    // const minutes = date.getMinutes().toString().padStart(2, "0");
    // const seconds = date.getSeconds().toString().padStart(2, "0");
    return `${days}:${hours}:${minutes}:${seconds}`;
  };

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null;
  }

  // if (!finished) {
  //   return null;
  // }
  if (1) {
    return null;
  }
  return (
    <div className="py-2">
      <div className=" w-full bg-top-banner top-banner flex flex-col items-center justify-center gap-4 lg:gap-10 py-5 bg-black border-4 border-[#85FFE3] lg:flex-row  rounded-xl ">
        <h1 className="font-broad text-base lg:text-4xl font-bold text-white">
          {" "}
          PReSALE LIVe NoW{" "}
        </h1>
        <div className="flex items-center">
          <div className="font-broad clock py-[6px] lg:py-[11px] px-5 w-32 lg:w-52 -mr-4 text-center font-bold text-base lg:text-4xl text-white bg-black">
            {formatTime(time)}
          </div>
          <FlagButton
            className=""
            href="/listings/mpad"
            shadow
            bgColor="bg-gradient-to-r from-[#00B68B] to-[#00FFC4]"
            shadowWhite="white"
          >
            <p className="lg:text-[24px] font-broad font-black whitespace-nowrap">
              INVEST NOW
            </p>
          </FlagButton>
        </div>
      </div>
    </div>
  );
};
export default TopBanner;
