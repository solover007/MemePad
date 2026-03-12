"use client";
import { Link } from "react-scroll";
import BannerMobile from "../BannerMobile/BannerMobile";
import JoinMemepadMobile from "../JoinMemepadMobile/JoinMemepadMobile";
import NavbarMobile from "../NavbarMobile/NavbarMobile";
// import ProductMobile from "../../components/Home/ProductMobile/ProductMobile";
import ProductTablet from "../ProductTablet/ProductTablet";
import RoadmapMobile from "../RoadmapMobile/RoadmapMobile";
import TokenomicsMobile from "../TokenomicsMobile/TokenomicsMobile";
import WhatIsMemePadMobile from "../WhatIsMemePadMobile/WhatIsMemePadMobile";
import WhyMemePadMobile from "../WhyMemePadMobile/WhyMemePadMobile";
import SocialsMobile from "../../Shared/SocialsMobile";

const commonClasses = "rounded-3xl border-2 border-black";
const Mobile = () => {
  return (
    <>
      {/* mobile */}
      <div className="block lg:hidden relative z-50 overflow-hidden">
        {/* mobile banner */}
        <div
          className={`${commonClasses} bg-bannerBG h-full md:h-[550px] p-4 md:px-6`}
        >
          {/* navbar */}
          <NavbarMobile />
          <BannerMobile />
        </div>

        {/* Socials */}
        <SocialsMobile />

        {/* What is meme pad */}
        <div id="About" className={`${commonClasses} bg-white`}>
          <WhatIsMemePadMobile />
        </div>

        {/* Why meme pad */}
        <div id="Invest" className={`${commonClasses} bg-black p-4 mt-2`}>
          <WhyMemePadMobile />
        </div>

        {/* USP and products */}
        <div className={`bg-transparent mt-2`}>
          <ProductTablet />
        </div>

        {/* tokenomics */}
        <div
          id="Tokenomics"
          className={`${commonClasses} bg-[#A393FE] p-4 mt-2`}
        >
          <TokenomicsMobile />
        </div>

        {/* roadmap */}
        <div id="Roadmap" className={`  mt-2`}>
          <RoadmapMobile />
        </div>

        {/* join memepad */}
        <div className={`${commonClasses} bg-[#09080F]  mt-2`}>
          <JoinMemepadMobile />
        </div>

        {/* navlinks */}
        <div className="font-broad text-lg flex flex-wrap items-center gap-4 justify-center mt-8">
          <Link
            className="hover:font-bold"
            to="Invest"
            spy={true}
            smooth={true}
            offset={-10}
            duration={500}
          >
            INVeST
          </Link>
          {/* <a href="#tokenomics" className="hover:font-bold">TOKENoMICS</a> */}
          <Link
            className="hover:font-bold"
            to="Tokenomics"
            spy={true}
            smooth={true}
            offset={0}
            duration={500}
          >
            TOKENoMICS
          </Link>

          {/* <a href="#about" className="hover:font-bold">ABoUT</a> */}
          <Link
            className="hover:font-bold"
            to="About"
            spy={true}
            smooth={true}
            offset={0}
            duration={500}
          >
            ABoUT
          </Link>

          {/* <a href="#roadmap" className="hover:font-bold">RoADMAP</a> */}
          <Link
            className="hover:font-bold"
            to="Roadmap"
            spy={true}
            smooth={true}
            offset={0}
            duration={500}
          >
            RoADMAP
          </Link>
        </div>

        <SocialsMobile />
      </div>
    </>
  );
};
export default Mobile;
