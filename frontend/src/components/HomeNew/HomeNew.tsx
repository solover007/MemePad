"use client";
import React, { useEffect } from "react";
import useDetectScroll from "@smakss/react-scroll-direction";

// import Footer, { SOCIALS } from "../../components/Footer";
import BannerSection from "./BannerSection";
import ProposedLauchesSection from "./ProposedLauchesSection";
import Footer, { SOCIALS } from "../Footer";
import Image from "next/image";
import RoadmapSection from "../RoadmapSection";
import TokenomicsSection from "./TokenomicsSection";
import OurProductSectionDesktop from "../OurProductSectionDesktop";
import "./Home.Module.css";
import { ThreeDCardEffect } from "@/lib/utils/index";
import OurProductSectionMobile from "../OurProductSectionMobile";
import FlagButton from "../Buttons/FlagButton";
import Box from "../Box";
import MemeCoin from "@/public/icons/HomeSectionBrief/MemeCoin.png";
import AOS from "aos";
import "aos/dist/aos.css";
import { PURPLE_PRIMARY_COLOR } from "@/lib/utils/constants";
import { motion } from "framer-motion";
import TopBanner from "../Shared/TopBanner";

const TOKEN = [
  "STAKING",
  "KEY TO RAISE",
  "KEY TO INVEST",
  "LP PROVISION",
  "MEMEPAD AIRDROPS",
  "AIRDROP ACCESS",
  "TEAM BASED BURNS",
  "LEARN MORE",
];

export const OUR_PRODUCT_LIST = [
  {
    id: 1,
    name: "AIRDROP",
    description:
      "$MPad isn’t just for investors, the community deserve a slice of the pie too! Tokens airdropped straight to the legends supporting       both MPad tokens and ALL meme & utility coins will airdrop to holders.",
    color: "#BF6DF9",
  },
  {
    id: 2,
    name: "MEMBER LEVELS",
    description:
      "$MPAD membership holders, get ready for boosts! You’re snagging up to a 5x airdrop multiplier, 50% bonus staking rewards and bigger allocations in future launches.",
    color: "#8432ED",
  },
  {
    id: 3,
    name: "STAKING & FARMING",
    description:
      "Get a slice of the trading fees & help stablise the $MPAD token. Various farms will be created for the solana ecosystem. Creating farming pools with tokens such as:",
    bulletList: ["MPAD <> SOL", "MPAD <> BONK", "MPAD <> WIF"],
    color: "#29A79C",
  },
  {
    id: 4,
    name: "LAUNCHPAD",
    description:
      "MEMEPad will become the go-to launchpad, dropping the hottest meme & utility-based tokens for the SOL ecosystem & beyond with absolute security for investors.",
    color: "#D89BFF",
  },
];

export default function HomeNew() {
  useEffect(() => {
    ThreeDCardEffect();
    AOS.init();
  }, []);
  const { scrollDir, scrollPosition } = useDetectScroll();

  return (
    <div>
      <div
        className={`${
          scrollPosition.top > 160 ? "translate-y-0" : "translate-y-36"
        } w-full px-4 top-banner-sticky duration-700 transition-all`}
      >
        <TopBanner />
      </div>

      <div className="bg-home-bg bg-cover bg-no-repeat bg-teal contain-paint">
        <div className="w-full relative">
          <div className="mx-4 ">
            <TopBanner />
          </div>
          <div className="z-50 relative w-full flex flex-col gap-4 bg-[#34FFD0] lg:bg-transparent">
            {/* Banner Section */}
            <div className="pt-[12px] pl-[15px] pr-[16px] z-20">
              <BannerSection />
            </div>

            {/* Proposed Launches Section */}
            <ProposedLauchesSection />

            <div className="relative z-20 border-black min-h-[1000px] bg-gradient-home-brief-two mx-auto contain-paint w-full border-0 rounded-none pt-[500px] -mt-[700px] lg:-mt-[520px] lg:pt-[240px] lg:rounded-3xl lg:border-2 lg:w-[calc(100%-2rem)]">
              {/* Da F*** Is Memepad Section */}
              <div className="w-full flex items-center justify-center mt-16 lg:mt-[260px]">
                <div className="relative flex gap-8 flex-col w-full lg:w-[80%] lg:flex-row">
                  <div className="relative w-full flex flex-col items-center min-h-[300px] lg:min-h-[537px] lg:w-[50%]">
                    <div className="-rotate-12 flex justify-center items-center bg-white border border-black px-8 lg:px-12 h-[122px] shadow-[4px_4px_0px_0px_#8B77FFCC] lg:shadow-[10px_10px_0px_0px_#8B77FFCC] lg:h-[220px] lg:w-[90%]">
                      <p
                        data-aos="fade-right"
                        data-aos-easing="ease-in-sine"
                        data-aos-duration="200"
                        className="sign font-broad font-extrabold text-[#111114] text-[47px] leading-[47px] lg:text-[60px] lg:leading-[72px] xl:text-[72px] xl:leading-[86px] 2xl:text-[72px] 2xl:leading-[94px]"
                      >
                        d <span className="fast-flicker">A</span>
                        &nbsp;F***&nbsp;IS
                        <br />
                        <span className="fast-flicker">M</span>eM
                        <span className="flicker">E</span>PA
                        <span className="flicker">D</span>?
                      </p>
                    </div>

                    <Box
                      className="bg-white !p-0 absolute top-[9rem] left-[40%] lg:top-[16rem] lg:left-[29%]"
                      angle={10.68}
                      shadowColor="#8B77FFCC"
                    >
                      <Image
                        data-aos="zoom-out"
                        data-aos-duration="1000"
                        width={391}
                        height={198}
                        className="w-[250px] lg:w-auto"
                        alt="Buy my tokens"
                        src="/images/is-this-a-meme.png"
                      />
                    </Box>
                  </div>

                  <div
                    id="launchpad"
                    className="w-full flex flex-col items-center lg:w-1/2 pb-6"
                  >
                    <p className="font-broad text-[#111114] text-center font-black text-[30px] leading-[1.5em] lg:text-[50px] lg:leading-[67px]">
                      NoT JUST A MeME,
                      <br className="hidden lg:block" /> NOT JUST
                      <span
                        data-aos="fade-left"
                        data-aos-duration="1000"
                        className="bg-[#80FFAB] rounded-full px-4 pt-3 pb-1 ml-1 whitespace-nowrap"
                      >
                        A&nbsp;LAUNCHPAD
                      </span>
                    </p>

                    <p className="font-lato text-center text-[#111114] w-[90%] text-[21px] leading-[25px] mt-6 lg:mt-10 lg:text-[26px] lg:leading-[37px] lg:w-[75%]">
                      MEMEPad is a shield against fraud, a catalyst for
                      innovation, and a home for the next gen of memecoins on
                      Solana.
                    </p>

                    <p className="font-lato text-[20px] text-center text-[#111114] leading-[30px] mt-10 hidden lg:block">
                      Want to learn more?
                    </p>

                    {/* Button Learn more Desktop */}
                    <FlagButton
                      className="mt-8 md:mt-4 mb-4"
                      href="https://docs.memepad.ai/"
                      shadow
                    >
                      <p className="text-[24px] font-broad font-black text-white whitespace-nowrap">
                        LeARN MoRE
                      </p>
                    </FlagButton>

                    <div className="flex items-center gap-10 mt-6 lg:mt-10">
                      {SOCIALS.map((item, index) => {
                        const Icon = item.icon;

                        if (item?.isMail) {
                          return null;
                        }

                        return (
                          <a
                            key={index}
                            href={item.link}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <div
                              className={`flex items-center gap-2 transition-all duration-200 text-black hover:text-[${PURPLE_PRIMARY_COLOR}]`}
                            >
                              <Icon className="w-[20px] h-[20px] lg:w-[34px] lg:h-[34px]" />

                              <p className="font-bold text-[12px] lg:text-[21px]">
                                {item.name}
                              </p>
                            </div>
                          </a>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>

              <div className="w-full flex flex-col gap-4 bg-[#34FFD0] p-4 border-t-2 border-[#222222] lg:border-t-0 lg:p-0 lg:bg-transparent">
                {/* Memenomics Section */}
                <div className="w-full flex-col items-center justify-center gap-6 bg-[#F1F1E8] border-2 border-[#222222] rounded-2xl p-4 flex lg:p-0 lg:rounded-none lg:border-none lg:bg-transparent lg:mt-24">
                  <TokenomicsSection />
                </div>

                {/* Roadmap Section */}
                <div className="mt-0 lg:mt-[100px]">
                  <RoadmapSection />
                </div>

                {/* Our Product Section for Mobile */}
                <OurProductSectionMobile className="bg-our-product-mobile border-2 border-[#222222] rounded-2xl" />

                {/* Security & Quanlity Section for Mobile */}
                <div className="relative w-full flex flex-col justify-center items-center bg-[#F1F1E8] border-2 border-[#222222] rounded-2xl overflow-hidden px-2 lg:hidden">
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-1/2 h-[82px] rounded-full bg-[#8D7CEE] text-white font-lato font-extrabold flex items-center justify-center uppercase text-[21px]">
                    UNIqUeNEsS
                  </div>

                  <div className="flex flex-col justify-center items-center w-full h-[392px] border border-[#8D7CEE] rounded-b-full px-4">
                    <p className="font-broad text-[40px] leading-[40px] text-[#8D7CEE]">
                      SeCURITY
                    </p>

                    <p className="font-lato text-[20px] md:text-center leading-[24px] mt-6 px-0 sm:px-[10%] mb-14 md:mb-0">
                      MEMEPad is more than a launchpad; it is a shield against
                      fraud! No RUGs, no scams, fully centralized and vetted,
                      based teams only. We ensure funds are spent wisely,
                      vesting team tokens on KPIs, no dumping, right resources
                      and strategy.
                    </p>
                  </div>
                  <div className="flex flex-col justify-center items-center w-full h-[392px] border border-[#8D7CEE] rounded-t-full px-4">
                    <p className="font-broad text-[40px] leading-[40px]">
                      QUALITY
                    </p>

                    <p className="font-lato text-[20px] md:text-center leading-[24px] mt-6 px-0 sm:px-[10%]">
                      MEMEPad only launches 100-1000X Potential Projects.
                      Launches are handled by the expert team of incubators,
                      marketers and previous project founders leading the
                      memecoin projects.
                    </p>
                  </div>
                </div>

                {/* Mpad Token Section for Mobile */}
                <div className="relative w-full flex flex-col justify-center items-center bg-[#09080F] border-2 border-[#222222] rounded-2xl overflow-hidden p-4 text-white lg:hidden">
                  <Image
                    width={500}
                    height={500}
                    alt="roadmap"
                    // src={RoadmapSVG}
                    src="icons/HomeSectionBrief/join-memepad.svg"
                    className="w-full"
                  />

                  <Image
                    width={500}
                    height={500}
                    alt="rocket svg"
                    // src={RocketSVG}
                    src="/icons/HomeSectionBrief/rocket.svg"
                    className="w-[50%] absolute top-[240px] -right-16"
                  />

                  <Image
                    width={500}
                    height={500}
                    alt="rocket svg"
                    // src={RocketSVG}
                    src="/icons/HomeSectionBrief/ruyban.svg"
                    className="w-[25%] absolute top-0 left-4"
                  />

                  <p className="font-lato font-light text-[21px] text-center leading-[24px] px-6 mt-10">
                    <span className="font-semibold">MEMEPAD is</span> setting a{" "}
                    <span className="font-semibold">new standard</span> for
                    future memecoins entering the ecosystem.
                  </p>

                  <div className="my-10 flex flex-col items-center justify-center gap-6">
                    {SOCIALS.map((item, index) => {
                      const Icon = item.icon;

                      return (
                        <a key={index} href={item.link}>
                          <div
                            className={`flex items-center gap-2 transition-all duration-200 text-white hover:text-[${PURPLE_PRIMARY_COLOR}]`}
                          >
                            <Icon className="w-[37px] h-[37px]" />

                            <p className="font-medium text-[21px]">
                              {item.name}
                            </p>
                          </div>
                        </a>
                      );
                    })}
                  </div>
                </div>

                {/* Footer for Mobile */}
                <Footer isWhite={false} className="mt-4 block lg:hidden" />
              </div>
            </div>

            <div className="bg-[#F1F1E8]">
              {/* Our Product Section for Desktop */}
              <OurProductSectionDesktop className="top-[-440.5px] pt-[418.5px] mb-[100px]" />

              {/* Security & Quanlity Section for Desktop */}
              <div className="w-full h-[708px] top-[-340px] relative items-center gap-6 hidden lg:flex">
                <motion.div
                  initial={{ translateX: -500 }}
                  transition={{
                    duration: 1,
                  }}
                  whileInView={{ translateX: 0 }}
                  viewport={{ once: false }}
                  className="w-1/2 h-full flex flex-col justify-center items-center border border-[#8D7CEE] border-l-0 rounded-tr-full rounded-br-full"
                >
                  <p className="font-broad text-[400] text-[#8D7CEE] lg:text-[80px] lg:leading-[82px] xl:text-[92.41px] xl:leading-[88.9px]">
                    SeCURITY
                  </p>
                  <p className="pt-[30px] font-lato text-[400] text-[#111114] leading-[25.2px] text-[21px] px-[25%]">
                    MEMEPad is more than a launchpad; it is a shield against
                    fraud! No RUGs, no scams, fully centralized and vetted,
                    based teams only. We ensure funds are spent wisely, vesting
                    team tokens on KPIs, no dumping, right resources and
                    strategy.
                  </p>
                </motion.div>

                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-[#8D7CEE] border-[2px] rounded-full lg:px-[24px] lg:py-[20px] xl:px-[46px] xl:py-[43px]">
                  <span className="font-lato font-[900] text-white text-[24px] leading-[28px] xl:text-[31.79px] xl:leading-[38.15px]">
                    UNIQUENESS
                  </span>
                </div>

                <motion.div
                  initial={{ translateX: 500 }}
                  transition={{
                    duration: 1,
                  }}
                  whileInView={{ translateX: 0 }}
                  viewport={{ once: false }}
                  className="w-1/2 h-full flex flex-col justify-center items-center border border-[#8D7CEE] border-r-0 rounded-tl-full rounded-bl-full"
                >
                  <p className="font-broad text-[400] text-[#000000] lg:text-[80px] lg:leading-[82px] xl:text-[92.41px] xl:leading-[88.9px]">
                    QUALITY
                  </p>
                  <p className="pt-[30px] font-lato text-[400] text-[#111114] leading-[25.2px] text-[21px] px-[25%]">
                    MEMEPad only launches 100-1000X Potential Projects. Launches
                    are handled by the expert team of incubators, marketers and
                    previous project founders leading the memecoin projects.
                  </p>
                </motion.div>
              </div>

              {/* Mpad Token Section for Desktop */}
              <div className="px-4 ">
                <div className=" bg-gradient-token rounded-3xl">
                  <div
                    id="token"
                    className="mx-auto border-2  bg-home-bg-section-token bg-no-repeat bg-cover rounded-3xl  min-h-[1526.66px] border-[#383838] relative  hidden lg:flex"
                  >
                    <div>
                      <div className="pt-[171.66px] flex justify-center">
                        <div className="flex items-baseline font-broad font-[400] leading-[96px] text-[99.8px]">
                          $MpAD T
                          <Image
                            width={500}
                            height={500}
                            alt="meme token"
                            className="w-20 animate-bounce"
                            src={MemeCoin}
                            // src="/icons/HomeSectionBrief/meme-token.svg"
                          />
                          KEN
                        </div>
                      </div>
                      <div className="pt-[82.34px]">
                        <div className="flex flex-wrap -mx-2 gap-[39px] justify-center">
                          {TOKEN.map((token, idx) => (
                            <motion.div
                              initial={{ translateY: "200px" }}
                              transition={{
                                duration:
                                  idx === 0
                                    ? 0.1
                                    : idx === 1
                                    ? 0.2
                                    : idx === 2
                                    ? 0.3
                                    : idx === 3
                                    ? 0.4
                                    : idx === 4
                                    ? 0.5
                                    : idx === 5
                                    ? 0.6
                                    : idx === 6
                                    ? 0.7
                                    : 0.8,
                              }}
                              whileInView={{ translateY: "0px" }}
                              viewport={{ once: true }}
                              key={idx}
                            >
                              <a
                                key={idx}
                                href={
                                  idx == 8
                                    ? "https://docs.memepad.ai/"
                                    : "/token"
                                }
                                target={idx == 8 ? "_blank" : "_self"}
                              >
                                <div
                                  data-id={idx}
                                  className="card-MPAD bg-white flex w-[356px] h-[172px] border-[3px] border-[#6922FF] shadow-[5px_5px_0px_0px_#463E6E] hover:cursor-pointer select-none"
                                >
                                  <p className="del-effect m-auto font-broad font-bold text-stroke-1-inherit text-[28px] leading-[26.94px] text-[#452BC0]">
                                    {token}
                                  </p>
                                </div>
                              </a>
                            </motion.div>
                          ))}
                        </div>
                      </div>
                      <motion.div
                        initial={{ opacity: 0 }}
                        transition={{
                          duration: 2,
                        }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                      >
                        <Image
                          width={500}
                          height={500}
                          alt="union"
                          src="/icons/HomeSectionBrief/Union.svg"
                          className="absolute left-[330px] w-20 top-[1200px] xl:top-[992.66px] xl:w-40"
                        />
                      </motion.div>
                      <motion.div
                        initial={{ opacity: 0 }}
                        transition={{
                          duration: 2,
                        }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                      >
                        <Image
                          width={500}
                          height={500}
                          alt="rocket svg"
                          src="/icons/HomeSectionBrief/rocket.svg"
                          className="absolute right-[80px] w-[300px] top-[1200px] xl:top-[1042px] xl:w-fit"
                        />
                      </motion.div>

                      <div
                        id="join"
                        className="pt-64 flex items-baseline justify-center"
                      >
                        <span className="font-broad font-[400] text-[64px] leading-[61.57px] mr-[20px] text-white tracking-[8%]">
                          JoIN
                        </span>
                        <span></span>
                        <Image
                          width={500}
                          height={500}
                          alt="meme pad"
                          className="w-96"
                          src="/icons/HomeSectionBrief/meme-pad.svg"
                          // src={MemePadSVG}
                        />
                      </div>
                      <div className="flex justify-center pt-[30px]">
                        <div className="w-[706px] text-center">
                          <span className="font-lato font-[900] text-[28px] text-white">
                            MEMEPAD{" "}
                          </span>
                          <span className="font-lato font-[400] text-[28px] text-white">
                            is setting a new standard for future memecoins
                            entering the ecosystem.
                          </span>
                        </div>
                      </div>
                      <div className="justify-center items-center gap-4 mt-20 hidden lg:flex">
                        {SOCIALS.map((item, index) => {
                          const Icon = item.icon;

                          if (item?.isMail) {
                            return (
                              <a key={index} href={item.link}>
                                <div
                                  className={`flex items-center gap-2 transition-all duration-200 text-white hover:text-[${PURPLE_PRIMARY_COLOR}]`}
                                >
                                  <Icon className="w-[20px] h-[20px] lg:w-[34px] lg:h-[34px]" />

                                  <p className="font-medium text-[12px] lg:text-[21px]">
                                    {item.name}
                                  </p>
                                </div>
                              </a>
                            );
                          }

                          return (
                            <a
                              key={index}
                              href={item.link}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <div
                                className={`flex items-center gap-2 transition-all duration-200 text-white hover:text-[${PURPLE_PRIMARY_COLOR}]`}
                              >
                                <Icon className="w-[20px] h-[20px] lg:w-[34px] lg:h-[34px]" />

                                <p className="font-medium text-[12px] lg:text-[21px]">
                                  {item.name}
                                </p>
                              </div>
                            </a>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Footer for Desktop */}
              <Footer isWhite={false} className="mt-0 hidden lg:flex" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
