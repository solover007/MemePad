/* eslint-disable react/no-unescaped-entities */
"use client";

import React, { useEffect, useRef, useState } from "react";
import useCountDown from "@/lib/hooks/useCountDown";
import { FIRST_LAUNCH } from "@/lib/utils/constants";
import Image from "next/image";
import { CountUp } from "use-count-up";

type Props = {
  className?: string;
};

const TimerBrief = ({ className }: Props) => {
  const [isClient, setIsClient] = useState(false);
  const { days, hours, minutes, seconds } = useCountDown(FIRST_LAUNCH);
  const timer = [days, hours, minutes, seconds];
  const [counterOn, setCounterOn] = useState<boolean>(false);
  const timeSectionRef = useRef<HTMLDivElement>(null);

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

    if (timeSectionRef.current) {
      observer.observe(timeSectionRef.current);
    }

    return () => {
      if (timeSectionRef.current) {
        observer.unobserve(timeSectionRef.current);
      }
    };
  }, []);

  useEffect(() => {
    setIsClient(true);
  }, []);
  if (!isClient) {
    return null;
  }

  return (
    <div className="w-full relative">
      {/* Timer */}
      <div
        ref={timeSectionRef}
        className="relative z-50 flex flex-col items-start mt-10 w-full lg:w-[calc(100%-40px)] lg:mt-[100px] xl:w-[calc(100%-200px)]"
      >
        <div className="w-full flex items-center gap-5 justify-center lg:justify-normal">
          {timer?.map((item, idx) => (
            <div key={idx}>
              <div
                data-aos="fade-up"
                data-aos-duration="200"
                data-aos-delay={
                  idx === 0
                    ? "0"
                    : idx === 1
                    ? "300"
                    : idx === 2
                    ? "600"
                    : "900"
                }
                data-aos-easing="ease-in-sine"
                className={`bg-white flex items-center justify-center border-2 border-black shadow-[5px_5px_0px_0px_#453C7F] w-[72px] h-[96px] lg:shadow-[11px_11px_0px_0px_#453C7F] lg:w-[100px] lg:h-[120px] xl:w-[134px] xl:h-[160px] 2xl:w-[160px] 2xl:h-[192px]`}
              >
                <h3 className=" text-[#8D7CEE] font-medium font-peanut text-[40px] lg:text-[60px] xl:text-[70px] 2xl:text-[80px]">
                  {/* {item} */}
                  {counterOn ? (
                    <CountUp
                      start={0}
                      isCounting={true}
                      end={item}
                      duration={3}
                      easing={"linear"}
                    />
                  ) : (
		  item || "?"
                  )}
                </h3>
              </div>

              <p className="uppercase font-lato font-extrabold text-white text-[14px] text-center mt-3 lg:text-[16px] xl:text-[18px] 2xl:text-[20px]">
                {idx === 0
                  ? "Days"
                  : idx === 1
                  ? "Hours"
                  : idx === 2
                  ? "Minutes"
                  : "Seconds"}
              </p>
            </div>
          ))}
        </div>

        <p className="font-lato text-center text-white opacity-75 mt-10 px-4 text-[20px] lg:text-[31px]">
          Forget everything you know about memecoins.
          <br className="hidden lg:block" />{" "}
          <span className="font-semibold">
            THIS is the one you've been waiting for.{" "}
          </span>{" "}
          <br />
          Prepare to be amazed..
        </p>

        {/* For Mobile */}
        <Image
          width={500}
          height={500}
          // src={BrotherShadowSVG}
          src="/icons/HomeSectionBrief/brother-shadow.svg"
          className="w-full max-w-[420px] mt-10 block lg:hidden"
          alt="brother shadow"
        />
      </div>
    </div>
  );
};
export default TimerBrief;
