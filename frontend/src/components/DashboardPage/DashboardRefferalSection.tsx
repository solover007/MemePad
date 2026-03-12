import Image from "next/image";
import Overlay from "../Overlay";

export const DashboardRefferalSection = () => {
  return (
    <div className="flex flex-col lg:flex-row justify-between space-y-9 lg:space-y-0 lg:space-x-4">
      <div
        className="bg-white lg:h-[285px] rounded-[0.188rem] py-5 px-3 lg:w-[241px]"
        style={{ boxShadow: "0px 12px 0px 0px #F9763E" }}
      >
        <div className="lg:px-4">
          <p className="font-broad text-base leading-4 text-center">
            TRADING & REFERRALS
          </p>
          <div className="relative divide-y mt-8">
            <Overlay />
            <div className="flex justify-between items-center py-3">
              <p className="text-xs leading-3 font-broad">TRADING VOLUME</p>
              <p className="text text-base leading-4 font-broad">56876</p>
            </div>
            <div className="flex justify-between items-center py-3">
              <p className="text-xs leading-3 font-broad">REFEREE AMOUNT</p>
              <p className="text text-base leading-4 font-broad">75</p>
            </div>
            <div className="flex justify-between items-center py-3">
              <p className="text-xs leading-3 font-broad">REFERRAL VOLUME</p>
              <p className="text text-base leading-4 font-broad">24976</p>
            </div>
          </div>
        </div>
        <div className="pt-1.5 border-t">
          <button className="bg-[#1A1A1A] py-2 px-3 flex justify-between items-center w-full border border-solid border-[#120F214D] rounded-[0.188rem] lg:mt-12">
            <p className="font-broad text-xs leading-3 text-white">
              ReFFERAL CoDE
            </p>
            <Image
              width={16}
              height={16}
              src="/icons/Dashboard/copy.svg"
              alt="copy-icon"
            />
          </button>
        </div>
      </div>
      <div
        className="bg-white lg:h-[285px] rounded-[0.188rem] py-5 px-3 lg:w-[241px]"
        style={{ boxShadow: "0px 12px 0px 0px #4B2ED1" }}
      >
        <div className="lg:px-4">
          <p className="font-broad text-base leading-4 text-center">FARMING</p>
          <div className="relative divide-y mt-8">
            <Overlay />

            <div className="flex justify-between py-3">
              <p className="text-xs leading-3 font-broad">BONK/MPAD</p>
              <div>
                <p className="text text-base leading-4 font-broad">53,986</p>
                <p className="text text-base leading-4 font-broad">53,986</p>
              </div>
            </div>
            <div className="flex justify-between py-3">
              <p className="text-xs leading-3 font-broad">BONK/MPAD</p>
              <div>
                <p className="text text-base leading-4 font-broad">24,976</p>
                <p className="text text-base leading-4 font-broad">53,986</p>
              </div>
            </div>
            <div className="flex justify-between py-3">
              <p className="text-xs leading-3 font-broad">SOL/MPAD</p>
              <div>
                <p className="text text-base leading-4 font-broad">24,976</p>
                <p className="text text-base leading-4 font-broad">53,986</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        className="bg-white lg:h-[285px] rounded-[0.188rem] py-5 px-3 lg:w-[241px]"
        style={{ boxShadow: "0px 12px 0px 0px #4C93FB" }}
      >
        <div className="lg:px-4">
          <p className="font-broad text-base leading-4 text-center">STAKING</p>
          <div className="relative divide-y mt-8">
            <Overlay />

            <div className="flex justify-between items-center py-3">
              <p className="text-xs leading-3 font-broad">AMOUNT STAKE</p>
              <p className="text text-base leading-4 font-broad">50000</p>
            </div>
            <div className="flex justify-between items-center py-3">
              <p className="text-xs leading-3 font-broad">STAKING REWARDS</p>
              <p className="text text-base leading-4 font-broad">24,976</p>
            </div>
            <div className="flex justify-between items-center py-3">
              <p className="text-xs leading-3 font-broad">VESTING LEFT</p>
              <p className="text text-base leading-4 font-broad">11 MONTHS</p>
            </div>
            <div className="flex justify-between items-center py-3">
              <p className="text-xs leading-3 font-broad">AUTO COMPOUNDING</p>
              <p className="text text-base leading-4 font-broad">6574</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
