"use client";
import Banner from "../Banner/Banner";
import JoinMemepad from "../JoinMemepad/JoinMemepad";
import NavRoutes from "../Navbar/NavRoutes";
import Product from "../Product/Product";
import Roadmap from "../Roadmap/Roadmap";
import Tokenomics from "../Tokenomics/Tokenomics";
import WhatIsMemePad from "../WhatIsMemePad/WhatIsMemePad";
import WhyMemePad from "../WhyMemePad/WhyMemePad";
import Socials from "../../Shared/Socials";

const commonClasses = "rounded-3xl border-2 border-black";
const Desktop = () => {
  return (
    <>
      {/* desktop */}
      <div className="hidden lg:block relative z-50">
        {/* desktop banner */}
        <div
          className={`${commonClasses}  bg-bannerBG mx-auto h-[800px] overflow-hidden`}
        >
          <Banner />
        </div>

        {/* desktop what is memepad */}
        <div
          id="about"
          className={`${commonClasses}  mx-auto mt-4 bg-white overflow-hidden`}
        >
          <WhatIsMemePad />
        </div>

        {/* desktop why meme pad*/}
        <div
          id="invest"
          className={`${commonClasses}  mt-4 mx-auto bg-[#09080F] p-4 overflow-hidden md:px-8 md:py-24`}
        >
          <WhyMemePad />
        </div>

        {/* desktop USP and Products */}
        <div className="overflow-hidden  mt-2 mx-auto">
          <Product />
        </div>

        {/* desktop Tokenomics */}
        <div
          id="tokenomics"
          className={`${commonClasses}  mt-2 bg-[#A393FE] mx-auto`}
        >
          <Tokenomics />
        </div>

        {/* desktop Road map */}
        <div
          id="roadmap"
          className={`${commonClasses}  mt-4 bg-[#FAFBF5] mx-auto overflow-hidden`}
        >
          <Roadmap />
        </div>

        {/* desktop join memepad */}
        <div
          className={`${commonClasses}  mt-4 bg-black mx-auto`}
        >
          <JoinMemepad />
        </div>
      </div>

      {/* desktop bottom nav and socials */}
      <div className="hidden  lg:flex flex-col xl:flex-row items-center py-2 justify-center xl:gap-16 lg:gap-7 mx-auto">
        <NavRoutes color="black" />
        <Socials color="black" gap={10} textSize="sm" />
      </div>
    </>
  );
};
export default Desktop;
