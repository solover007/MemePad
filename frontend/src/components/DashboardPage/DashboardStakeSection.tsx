import Image from "next/image";
import FlagButton from "../Buttons/FlagButton";
import Overlay from "../Overlay";

export const DashboardStakeSection = () => {
  return (
    <div className="relative">
      <div
        className="bg-white px-[19px] lg:px-6 pt-8 pb-5 lg:py-8 lg:w-[755px]"
        style={{ boxShadow: "0px 12px 0px 0px #4B2ED1" }}
      >
        <p className="text-2xl leading-6 font-broad font-normal">INFoRMATIOn</p>
        <div className="relative inline-flex flex-col p-2">
          <Overlay />
          <div className="relative mt-6 flex justify-center items-center lg:justify-start lg:items-start space-x-6">
            <div className="space-y-2 lg:space-y-0">
              <p className="text-[#0D0B14] text-base leading-4 font-broad">
                LAST CLAIMeD
              </p>
              <p className="text-[#0D0B14] text-base leading-5 font-lato font-bold">
                $0.005
              </p>
            </div>
            <div className="space-y-2 lg:space-y-0">
              <p className="text-[#0D0B14] text-base leading-4 font-broad">
                CURReNT
              </p>
              <p className="text-[#0D0B14] text-base leading-5 font-lato font-bold">
                $0.076
              </p>
            </div>
          </div>
          <div className="mt-6 flex justify-center items-center lg:justify-start lg:items-start space-x-4">
            <div
              className="h-[37px] py-3 flex justify-center items-center border border-black w-[153px]"
              style={{
                background: "linear-gradient(90deg, #372B81 0%, #7467C9 100%)",
              }}
            >
              <p className="text-[13px] font-broad leading-3 tracking-[0.03em] font-normal text-white">
                $0.071
              </p>
            </div>
            <button
              className="h-[37px] py-3 flex justify-center items-center border border-black w-[153px]"
              style={{
                background: "linear-gradient(90deg, #4E7DFF 0%, #779CFF 100%)",
              }}
            >
              <p className="text-[13px] font-broad leading-3 tracking-[0.03em] font-normal text-white">
                CLAIM $0.071
              </p>
            </button>
          </div>
          <div className="flex justify-center items-center lg:justify-start lg:items-start">
            <FlagButton
              className="mt-4 lg:mt-6"
              innerClassName="!min-h-full !h-[33px] min-w-[323px]"
              style={{
                background: "linear-gradient(90deg, #FF7E01 0%, #FF5B44 100%)",
              }}
              shadow
            >
              <p className="text-[13px] font-broad leading-3 tracking-[0.03em] text-white whitespace-nowrap">
                STAKE $0.071
              </p>
            </FlagButton>
          </div>
        </div>
        <Image
          width={325}
          height={230}
          className="lg:hidden mt-10 mx-auto"
          src="/images/ape-rocket-3.png"
          alt="ape-rocket-2"
        />
      </div>
      <Image
        width={500}
        height={380}
        className="h-[378px] absolute top-[-7%] right-[-9%] hidden lg:block"
        src="/images/ape-rocket-2.png"
        alt="ape-rocket-2"
      />
    </div>
  );
};
