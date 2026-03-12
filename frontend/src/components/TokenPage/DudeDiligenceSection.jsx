import SpiderWebBg from "../../../public/icons/TokenPage/SpiderWebBg";
import TwoBulls from "../../../public/icons/TokenPage/TwoBulls";
import NavRoutes from "../HomeOld/Navbar/NavRoutes";
import Socials from "../../components/Shared/Socials";
import MpadButton from "./MpadButton";
import Footer from "../Footer";
import FlagButton from "../Buttons/FlagButton";
import TwoApes from "@/public/icons/TokenPage/TwoApes";

const DudeDiligenceSection = () => {
  return (
    <div className="relative text-center pt-16">
      <div className="relative z-50">
        <h1 className="font-broad font-bold text-black text-stroke-1-inherit mb-4 text-5xl">
          DUDE DILIGENCE
        </h1>
        <h5 className="text-sm md:text-xl">
          Review the token sale and bull paper before investing:
        </h5>
      </div>

      {/* memepare, pitchdeck, kyc buttons */}
      <div className="relative z-[60] flex items-center justify-center px-4 flex-wrap gap-8 mt-12 flex-col md:flex-row">
        <FlagButton bgColor="bg-[#7A64F4]" href="https://docs.memepad.ai/">
          <p className="font-broad ml-4 font-extrabold text-white mr-4 min-[1150px]:text-base">
            MeMEPAPER
          </p>
        </FlagButton>

        <FlagButton
          bgColor="bg-[#B894FB]"
          href="https://github.com/solidproof/projects/tree/main/2024/MemePad"
        >
          <p className="font-broad ml-4 font-extrabold text-white mr-4 min-[1150px]:text-base">
            KYc
          </p>
        </FlagButton>
      </div>
      {/* desktop bottom nav and socials */}
      <div className="flex justify-center">
        <div className="absolute z-[70] hidden lg:flex flex-col xl:flex-row items-center py-2 justify-center bottom-0  xl:gap-16 lg:gap-7 mx-auto">
          <NavRoutes color="black" />
          <Socials color="white" gap={10} textSize="sm" />
        </div>
      </div>

      {/* bottom bull assets */}
      {/* <TwoBulls className="w-full h-full z-[65] relative" /> */}
      <TwoApes className="w-full h-full z-[65] relative" />

      {/* Footer for Mobile */}
      <div className="bg-black pb-6 block lg:hidden">
        <Footer isWhite={true} className=" " />
      </div>

      {/* background spider web asset */}
      <SpiderWebBg className="absolute w-full hidden lg:block bottom-0" />
    </div>
  );
};
export default DudeDiligenceSection;
