import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { PURPLE_PRIMARY_COLOR } from "@/lib/utils/constants";
import fireAnimation from "@/public/lottiefiles/fire.json";
import Icons from "../../components/Icons";
import Header from "../Header";
import { SOCIALS } from "../Footer";
import Image from "next/image";

import Lottie from "lottie-react";

import bannerCar from "@/public/icons/HomeSectionBrief/MainBannerCar.png";
import LaunchingSoonMemepad from "./LaunchingSoonMemepad";

type Props = {
  className?: string;
};

export default function BannerSection({ className = "" }: Props) {
  // banner text animation
  useEffect(() => {
    const spans = document.querySelectorAll(".word span");

    spans.forEach((span, idx) => {
      span.addEventListener("mouseenter", (e: any) => {
        e.target.classList.add("active");
      });
      span.addEventListener("animationend", (e: any) => {
        e.target.classList.remove("active");
      });

      // Initial animation
      setTimeout(() => {
        span.classList.add("active");
      }, 750 * (idx + 1));
    });
  }, []);
  return (
    <div
      className={`relative rounded-3xl border-2 border-black w-full bg-gradient-home-brief mx-auto contain-paint  ${className}`}
    >
      {/* Header Navbar */}
      <Header color="purple" />

      {/* Content */}
      <div className="relative w-full h-full flex flex-col lg:flex-row">
        {/* Left side */}
        <div className="w-full flex flex-col justify-center z-20 px-4 scale-[100%] mt-12 lg:mt-0 md:pl-16 lg:pl-0 lg:px-0 lg:w-[55%] lg:scale-[70%] min-[1150px]:pl-0 min-[1150px]:scale-[75%] xl:pl-[4%] xl:scale-[80%] 2xl:pl-[8%] 2xl:scale-[90%] min-[1668px]:pl-[10%] min-[1668px]:scale-100">
          <div className="w-full">
            <div className="flex items-baseline font-broad font-black leading-3 text-[48px] md:text-[70px] lg:text-[95px]">
              H{" "}
              <span className="w-[100px] h-fit -mx-6 lg:w-[150px] lg:h-fit">
                <Lottie animationData={fireAnimation} />
              </span>
              TTeST
            </div>
            <div
              className="word flex items-baseline font-broad font-black text-[#00E9B3] text-[44px] md:text-[70px] md:mt-4 lg:mt-0 min-[400px]:text-[50px] leading-[60px] lg:leading-[120px] lg:text-[95px]"
              style={{
                WebkitTextStroke: "0.5px #00BF92",
              }}
            >
              <span>M</span>
              <span>e</span>
              <span>M</span>
              <span>E</span>
              <span>C</span>
              <span>o</span>
              <span>I</span>
              <span>N</span>
              <span>S</span>
            </div>
            <p className="flex items-center font-broad font-black text-[28px] md:text-[70px] min-[400px]:text-[32px] lg:-mt-[46px] lg:text-[95px]">
              oN{" "}
              <span className="mx-3 mb-2 flex justify-center items-center border-[2px] rounded-full border-black w-[110px] h-[40px] lg:p-2 lg:h-[70px] lg:w-[200px]">
                <Icons.ArrowLeft className="banner-arrow text-[#1EDAAF] w-[110px] h-[16px] lg:w-fit lg:h-fit" />
              </span>
              S{" "}
              <Image
                width={500}
                height={500}
                // src={SolanaLogoSVG}
                src="/icons/HomeSectionTwo/solana.svg"
                className="size-[28px] -mt-[5px] md:size-[50px] lg:-mt-[5px] lg:size-[70px]"
                alt="solana"
              />{" "}
              LANA
            </p>
          </div>

          <p className="font-lato text-[#070707] text-[16px] leading-[20px] lg:leading-[37px] lg:text-[30px]">
            MEMEPad is where the REAL memecoin degens go to get filthy rich.
            Next-gen coins, rug-proof, and ready to PUMP.
          </p>

          <div className="items-center gap-4 mt-20 hidden lg:flex">
            {SOCIALS.map((item, index) => {
              const Icon = item.icon;

              if (item?.isMail) {
                return (
                  <a key={index} href={item.link}>
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

        {/* Socials and Tag PRE SALE ENDED in Mobile */}
        <div className="p-4 flex items-center justify-between gap-4 md:pl-16 lg:hidden">
          <div className="flex flex-col gap-4">
            {SOCIALS.map((item, index) => {
              const Icon = item.icon;

              if (item?.isMail) {
                return (
                  <a key={index} href={item.link}>
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

          {/* pre sale sticker */}
          {/* <div>
            <div className="w-[122px] h-[122px] bg-polygon-banner bg-contain bg-center bg-no-repeat flex justify-center items-center">
              <div className="-rotate-2">
                <p className="font-broad text-[11px] text-[#57F0CD] font-black text-center mb-2">
                  PRE SALE ENDED
                </p>
                <p className="font-broad text-[15px] text-white font-black text-center leading-[14px]">
                  6759 SOL <br /> RAISED
                </p>
              </div>
            </div>
          </div> */}
        </div>

        {/* Right side */}
        <div className="w-full relative flex flex-col justify-start bg-grid-launchpad bg-no-repeat bg-cover mt-0 pt-0 lg:w-[45%] lg:-mt-28 lg:pt-28">
          {/* pre sale sticker */}
          {/* <div
            data-aos="fade-down"
            data-aos-delay="1500"
            data-aos-duration="100"
            data-aos-easing="ease-in-sine"
            className="pre-sale-sticker absolute w-[300px] h-[280px] bg-polygon-banner bg-contain bg-center bg-no-repeat justify-center items-center lg:-left-[4%] 2xl:left-[4%] left-[12%] bottom-[25%] hidden z-20 lg:flex lg:top-[10%] lg:scale-[50%] xl:top-[15%] xl:scale-[80%] 2xl:top-[15%] 2xl:scale-[90%] min-[1668px]:bottom-[40%] min-[1668px]:scale-100"
          >
            <div className="-rotate-2">
              <p
                data-text="PRE SALE ENDED"
                className="glitch font-broad text-[24px] text-white  font-black text-center my-4"
              >
                PRE SALE ENDED
              </p>
              <p className="glow font-broad text-[24px] text-white font-black text-center my-4">
                PRE SALE ENDED
              </p>
              <p className="font-broad text-[35px] text-white font-black text-center leading-[34px]">
                6759 SOL <br /> RAISED
              </p>
            </div>
          </div> */}

          {/* <Image
            width={500}
            height={500}
            src={RocketCoin}
            // src="/icons/HomeSectionBrief/coin-rocket.svg"
            data-aos="fade-left"
            data-aos-delay="600"
            data-aos-duration="1000"
            alt="coin-rocket"
            className="w-[94px] h-[94px] z-20 absolute left-[30%] bottom-[30%] lg:bottom-[30%] lg:scale-[70%] xl:bottom-[30%] xl:scale-[80%] 2xl:bottom-[30%] 2xl:scale-[90%] min-[1668px]:bottom-[30%] min-[1668px]:scale-100"
          /> */}

          <motion.div
            animate={{ x: [100, 0, 100, 0, 100, 0] }}
            transition={{ ease: "easeOut", duration: 2 }}
            className="relative z-30"
          >
            <Image
              width={500}
              height={500}
              src={bannerCar}
              data-aos="fade-left"
              data-aos-delay="600"
              data-aos-duration="200"
              data-aos-easing="ease-in-sine"
              // src="/icons/HomeSectionBrief/driver-kingkong-shadow.svg"
              alt="driver-kingkong-shadow"
              className="w-full -mt-4 lg:mt-0 lg:pt-[36px]"
            />
            <div className="hidden md:block absolute -bottom-6 left-0 w-full h-[120px] bg-gradient-to-t from-transparent to-[#cec6ff] filter blur-2xl" />
          </motion.div>
          {/* <motion.div
            initial={{ translateX: 700 }}
            transition={{
              duration: 1,
            }}
            whileInView={{ translateX: 0 }}
            viewport={{ once: false }}
            className="relative z-30"
          >
            <Image
              width={500}
              height={500}
              src={bannerCar}
              // src="/icons/HomeSectionBrief/driver-kingkong-shadow.svg"
              alt="driver-kingkong-shadow"
              className="w-full -mt-4 lg:mt-0 lg:pt-[36px]"
            />
            <div className="hidden md:block absolute -bottom-6 left-0 w-full h-[120px] bg-gradient-to-t from-transparent to-[#cec6ff] filter blur-2xl" />
          </motion.div> */}
        </div>
      </div>

      {/* Launching Soon Memepad Section */}
      <LaunchingSoonMemepad />
    </div>
  );
}
