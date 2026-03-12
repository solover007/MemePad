import Image from "next/image";
import Eye from "../../../../public/icons/Launchpad/Eye";
import TwoBulls from "../../../../public/icons/TokenPage/TwoBulls";
import TimerBrief from "../../HomeNew/TimerBrief";
import bull from "@/public/images/BullStanding.png";
import Countdown from "./Countdown";

const MemeCoinLaunch = () => {
  return (
    <div className="flex flex-col w-full items-center mt-36 lg:mt-56">
      {/* heading */}
      <div className="text-white font-bold">
        <h1 className=" uppercase font-broad text-2xl md:text-5xl">
          first{" "}
          <span className="outside-stroke relative font-medium pt-1">
            <Eye className="w-10 absolute -top-11 left-[45%] " />
            memecoin
          </span>{" "}
          launch
        </h1>
      </div>

      <Countdown />
      <p className=" text-white text-center mt-5 w-full text-sm md:text-xl lg:w-1/2">
        Forget everything you know about memecoins.{" "}
        <span className="font-bold">
          {" "}
          THIS is the one you&apos;ve been waiting for.{" "}
        </span>
        <br />
        Prepare to be amazed..
      </p>
      <TwoBulls className="lg:hidden w-[800px]" />
      <div className="hidden lg:flex w-full justify-end xl:-mt-72 2xl:-mt-80 xl:-mr-[268px] min-[1500px]:-mr-[300px] min-[1700px]:-mr-[500px] min-[1800px]:-mr-[800px] min-[2040px]:-mr-[900px] overflow-hidden overflow-x-hidden">
        <Image width={500} height={500} src={bull} alt="bull" />
      </div>
    </div>
  );
};
export default MemeCoinLaunch;
