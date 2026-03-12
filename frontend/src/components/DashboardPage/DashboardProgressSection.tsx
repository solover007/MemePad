import Image from "next/image";
import Overlay from "../Overlay";

export const DashboardProgressSection = () => {
  return (
    <div
      className="bg-white rounded-[0.188rem] py-6 px-4 flex flex-col space-y-4 flex-grow"
      style={{ boxShadow: "0px 12px 0px 0px #4B2ED1" }}
    >
    <div className="flex flex-col gap-4 mb-8">
      <a
        href="#"
        className="bg-[#4B2ED1] w-full h-full p-4 rounded-[0.188rem] max-h-[51px]"
        style={{ boxShadow: "0px 9px 0px 0px #070056" }}
      >
        <p className="font-lato font-bold text-base leading-5 text-white text-center">
          Dashboard
        </p>
      </a>
      <a
        href="#"
        className="bg-white w-full h-full p-4 rounded-[0.188rem] border border-black max-h-[51px]"
        style={{ boxShadow: "0px 9px 0px 0px #070056" }}
      >
        <p className="font-lato font-bold text-base leading-5 text-black text-center">
          Referrals
        </p>
      </a>
      <a
        href="#"
        className="bg-white w-full h-full p-4 rounded-[0.188rem] border border-black max-h-[51px]"
        style={{ boxShadow: "0px 9px 0px 0px #070056" }}
      >
        <p className="font-lato font-bold text-base leading-5 text-black text-center">
          Airdrop
        </p>
      </a>
      <a
        href="#"
        className="bg-white w-full h-full p-4 rounded-[0.188rem] border border-black max-h-[51px]"
        style={{ boxShadow: "0px 9px 0px 0px #070056" }}
      >
        <p className="font-lato font-bold text-base leading-5 text-black text-center">
          Website
        </p>
      </a>
</div>

      <p className="font-broad text-lg text-center">LeGEND LeVEL</p>
      <div
        className="relative border-[2px] border-black rounded py-[18px]"
        style={{ boxShadow: "0px 14px 0px 0px #000000 " }}
      >
        <Overlay />
        <div className="flex flex-col justify-center items-center relative">
          <Image
            className="w-[230px]"
            width={215}
            height={108}
            src="/icons/Dashboard/progress.svg"
            alt="money-bag"
          />
          <div className="absolute bottom-2 bg-[#4B2ED1] bg-opacity-10 p-3 rounded-full h-[50px] w-[50px] flex justify-center items-center">
            💰
          </div>
        </div>
        <div className="mt-[30px] text-center space-y-2">
          <p className="text-[34px] leading-[33px] font-broad text-[#4B2ED1]">
            $4250 MPAD
          </p>
          <p className="font-lato text-xs leading-4 text-black">
            ONLY $750 MPAD LEFT
            <br />
            TO REACH VIP LEVEL
          </p>
        </div>
      </div>
    </div>
  );
};
