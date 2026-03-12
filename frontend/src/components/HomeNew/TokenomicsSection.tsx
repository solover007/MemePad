"use client";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import Box from "../Box";
import mobilePie from "@/public/icons/HomeSectionBrief/MobilePie.png";
import { CountUp } from "use-count-up";
const TOKENOMICS_LIST = [
  {
    id: 1,
    name: "KOLs",
    percent: 5,
    color: "#DFB4FB",
  },
  {
    id: 2,
    name: "Marketing",
    percent: 15,
    color: "#95E4D6",
  },
  {
    id: 3,
    name: "early community investors",
    percent: 2,
    color: "#B3F9CF",
  },
  {
    id: 4,
    name: "Ecosystem Rewards",
    percent: 14.5,
    color: "#FCE894",
  },
  {
    id: 5,
    name: "Strategic",
    percent: 12.5,
    color: "#D187FF",
  },
  {
    id: 6,
    name: "Development",
    percent: 9,
    color: "#A0CEF9",
  },
  {
    id: 7,
    name: "Our launchpad",
    percent: 4,
    color: "#FAE4A4",
  },
  {
    id: 8,
    name: "Airdrop",
    percent: 6,
    color: "#F49BCC",
  },
  {
    id: 9,
    name: "Public",
    percent: 4,
    color: "#D1E395",
  },
  {
    id: 10,
    name: "DEX Liquidity",
    percent: 8,
    color: "#A5E1E9",
  },
  {
    id: 11,
    name: "TEAM",
    percent: 12,
    color: "#F6C4DB",
  },
  {
    id: 12,
    name: "CEX Liquidity",
    percent: 8,
    color: "#FFBA94",
  },
];

export default function TokenomicsSection() {
  const [counterOn, setCounterOn] = useState<boolean>(false);
  const enrollSectionRef = useRef<HTMLDivElement>(null);

  // handle side effect for countup section in viewport
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // Check if the "CountUp" section is in the viewport
        if (entry.isIntersecting) {
          setCounterOn(true);
        } else {
          setCounterOn(false);
        }
      },
      {
        root: null,
        rootMargin: "0px",
        threshold: 0.1,
      }
    );

    if (enrollSectionRef.current) {
      observer.observe(enrollSectionRef.current);
    }

    return () => {
      if (enrollSectionRef.current) {
        observer.unobserve(enrollSectionRef.current);
      }
    };
  }, []);

  return (
    <>
      {/* Tokenomics for Desktop */}
      <div
        id="tokenomics"
        className="w-full flex-col items-center justify-center gap-6 hidden lg:flex lg:p-0 lg:rounded-none lg:border-none lg:bg-transparent lg:mt-24"
      >
        <div className="w-full flex items-center justify-between gap-4 px-[7%] mb-16">
          <Box
            className="bg-white border-2 border-gray p-8 w-[23%] aspect-[1.57/1]"
            angle={7.48}
          >
            <div
              data-aos="fade-right"
              data-aos-easing="ease-in-sine"
              data-aos-duration="200"
              className="flex flex-col"
            >
              <p
                ref={enrollSectionRef}
                className="font-bradley text-purple-one font-bold text-[1.8cqw] leading-[2.2cqw] whitespace-nowrap [-webkit-text-stroke:1px] text-center"
              >
                TOTAL SUPPLY OF
                <br />
                <span className="text-[2.7cqw]">
                  {counterOn ? (
                    <CountUp
                      start={0}
                      isCounting={true}
                      end={10000000}
                      duration={2}
                      easing={"linear"}
                      formatter={(value) => value.toLocaleString()}
                    />
                  ) : (
                    10000000
                  )}
                </span>
              </p>
            </div>
          </Box>

          <p className="font-broad text-[42px] leading-[46px] min-[1400px]:text-[60px] min-[1400px]:leading-[57px]">
            MeMENOMICS
          </p>

          <Box
            className="bg-white border-2 border-white !p-0 max-w-[25%]"
            angle={-7.48}
          >
            <Image
              data-aos="zoom-out"
              data-aos-duration="200"
              width={379}
              height={240}
              alt="Buy my tokens"
              src="/images/buy-my-tokens.png"
            />
          </Box>
        </div>

        <div className="w-full flex justify-center items-center">
          <Image
            data-aos="zoom-in-up"
            data-aos-duration="1000"
            width={1546}
            height={623}
            alt="shadow"
            src="/images/tokenomics-new.png"
            className="w-[90%] max-w-[1300px] mx-auto"
          />
        </div>
      </div>

      {/* Tokenomics for Mobile */}
      <div
        id="tokenomics"
        className="w-full flex flex-col items-center justify-center gap-6 p-4 lg:hidden lg:p-0 lg:rounded-none lg:border-none lg:bg-transparent lg:mt-12"
      >
        <p className="font-broad text-[36px] leading-[36px]">MeMENOMICS</p>
        <div className="grid grid-cols-2 gap-4 md:gap-8">
          {TOKENOMICS_LIST.map((item) => (
            <div key={item.id} className="flex items-center gap-2 md:gap-4">
              <div
                className="flex items-center justify-center border border-black rounded-full font-lato font-extrabold min-h-[32px] min-w-[32px] text-[9px] min-[440px]:text-[11px] min-[440px]:min-w-[40px] min-[440px]:min-h-[40px]"
                style={{
                  backgroundColor: item.color,
                }}
              >
                {`${item.percent}%`}
              </div>

              <p className="font-lato font-semibold uppercase max-w-[100px] text-[12px] min-[400px]:max-w-[120px] min-[440px]:text-[14px] min-[500px]:max-w-[160px]">
                {item.name}
              </p>
            </div>
          ))}
        </div>

        <div className="relative w-full flex flex-col items-center justify-center mt-4">
          <Box className="bg-white border border-white !p-0 z-20" angle={-7.48}>
            <Image
              width={379}
              height={240}
              className="w-[200px]"
              alt="Buy my tokens"
              src="/images/buy-my-tokens.png"
            />
          </Box>

          <Image
            width={500}
            height={500}
            alt="shadow"
            // src="/icons/HomeSectionBrief/memenomics-pie-mobile.svg"j
            src={mobilePie}
            className="w-[90%] max-w-[460px] -mt-12"
          />

          <Box className="bg-white border-2 border-gray p-2 w-[190px] mt-8 aspect-[1.8/1] mb-8">
            <div className="flex flex-col">
              <p className="font-bradley text-purple-one font-bold text-[1.1rem] leading-[1.3rem] whitespace-nowrap [-webkit-text-stroke:1px] text-center">
                TOTAL SUPPLY OF
                <br />
                <span className="text-[1.6rem]">10,000,000</span>
              </p>
            </div>
          </Box>
        </div>
      </div>
    </>
  );
}
