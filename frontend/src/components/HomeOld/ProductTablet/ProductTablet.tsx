"use client";

import productBottom from "../../../../public/images/sh2/Vector36.svg";
import bulletPointMark from "../../../../public/images/sh2/Group 6345779.svg";
import UPSLogo from "../../../../public/images/sh2/Group 6345766.svg";
import { useState } from "react";
import { TEXT_MAP } from "@/lib/utils/constants";
import bgProduct from "../../../../public/images/tabletProductsBG.svg";
import Image from "next/image";

const slides = [
  {
    id: 1,
    text: "To initiate fundraising through the MEMEPad platform, wallets must maintain a specified token balance.",
  },
  {
    id: 2,
    text: "Participate in meme token launches and receive free tokens for holding MEMEPad tokens.",
  },
  {
    id: 3,
    text: "Initial community support for all memecoins launching",
  },
];

const ProductTablet = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const nextSlide = () => {
    const isLastSlide = currentIndex === slides.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  return (
    <div className="w-full h-full relative flex justify-center items-center">
      <div className="relative w-[100%] min-[570px]:w-[90%] min-[640px]:w-[80%] md:w-[70%]">
        <Image
          width={500}
          height={500}
          className="w-full"
          // src={bgProduct}
          src="/images/tabletProductsBG.svg"
          alt="bg-product"
        />
        <div className="absolute top-0">
          <h3 className="text-lg font-bold text-stroke-1-black font-lato mt-4 px-4 text-center md:pt-3 min-[460px]:mt-10 min-[460px]:text-xl min-[570px]:text-2xl">
            We aim to be the top choice for launching MEME tokens.
          </h3>
          <div className="pt-4 flex flex-col justify-center items-center relative">
            <div className="flex flex-col justify-center items-center w-fit relative">
              <h1 className="font-broad text-[#8B76FF] text-[52px] font-extrabold z-10 relative min-[460px]:text-[72px] min-[570px]:text-[92px]">
                PRoDUCT
              </h1>
              <Image
                width={500}
                height={500}
                // src={productBottom}
                src="/images/sh2/Vector36.svg"
                className="absolute -bottom-1 z-0"
                alt="product logo"
              />
            </div>
          </div>
          <div className="flex flex-col gap-4 px-6 leading-5 text-left mt-4 min-[570px]:gap-8">
            {/* one */}
            <div className="text-sm min-[460px]:text-base min-[570px]:text-lg">
              <div className="mb-4">
                <Image
                  width={500}
                  height={500}
                  src="/images/sh2/Group 6345779.svg"
                  className="w-4 h-4 min-[460px]:w-6 min-[460px]:h-6"
                  alt=""
                />
              </div>
              {TEXT_MAP.product.one()}
            </div>

            {/* two */}
            <div className="text-sm min-[460px]:text-base min-[570px]:text-lg">
              <div className="mb-4">
                <Image
                  width={500}
                  height={500}
                  src="/images/sh2/Group 6345779.svg"
                  className="w-4 h-4 min-[460px]:w-6 min-[460px]:h-6"
                  alt=""
                />
              </div>
              {TEXT_MAP.product.two()}
            </div>

            {/* three */}
            <div className="text-sm min-[460px]:text-base min-[570px]:text-lg">
              <div className="mb-4">
                <Image
                  width={500}
                  height={500}
                  src="/images/sh2/Group 6345779.svg"
                  className="w-4 h-4 min-[460px]:w-6 min-[460px]:h-6"
                  alt=""
                />
              </div>
              {TEXT_MAP.product.three()}
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 flex justify-center items-center flex-col w-full min-[390px]:bottom-[2%] min-[460px]:bottom-[8%] md:bottom-[10%]">
          <Image
            width={500}
            height={500}
            src="/images/sh2/Group 6345766.svg"
            alt="UPS logo"
            className="w-1/2 mt-40 md:mt-20 mx-auto -rotate-6 "
          />

          <div className="relative">
            <div
              style={{ boxShadow: "10px 10px 0px 0px #02000B" }}
              className="relative flex w-72 md:w-96 mt-10 mb-20 border-2 border-black mx-auto"
            >
              <div className="w-48 md:w-full h-72 py-14 md:px-4 mx-auto text-left ">
                <p className="text-xl">{slides[currentIndex].text}</p>
                <div className=" w-48 mt-5 mb-20 border-2 border-[#56F0CC] mx-auto"></div>
              </div>
            </div>

            {/* left and right arrow */}
            <div
              onClick={nextSlide}
              className="absolute top-[45%] -right-[8%] min-[460px]:-right-[15%]"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="17"
                height="30"
                viewBox="0 0 17 30"
                fill="none"
              >
                <path
                  d="M0.661639 0.808965L0.841737 0.988675L0.661638 0.808966C0.190515 1.28111 0.190515 2.05198 0.661638 2.52413L13.2045 15.0941L0.847493 27.4778C0.376369 27.95 0.376369 28.7208 0.847494 29.193C1.31892 29.6654 2.08908 29.6654 2.56051 29.193L15.7788 15.9517L15.7788 15.9517C16.25 15.4795 16.25 14.7087 15.7788 14.2365L2.38029 0.808966C2.13838 0.566538 1.83009 0.451807 1.51817 0.451807C1.20994 0.451807 0.896581 0.573515 0.661639 0.808965Z"
                  fill="#A393FE"
                  stroke="#A393FE"
                  strokeWidth="0.510448"
                />
              </svg>
            </div>

            <div
              onClick={prevSlide}
              className="absolute top-[45%] -left-[8%] min-[460px]:-left-[15%]"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="17"
                height="30"
                viewBox="0 0 17 30"
                fill="none"
              >
                <path
                  d="M1.22023 14.0483L1.22019 14.0483C0.749066 14.5205 0.749066 15.2913 1.22019 15.7635L14.6187 29.191L14.7994 29.0108L14.6187 29.191C14.8606 29.4335 15.1689 29.5482 15.4808 29.5482C15.7891 29.5482 16.1024 29.4265 16.3374 29.191C16.8085 28.7189 16.8085 27.948 16.3374 27.4759L3.79456 14.9059L16.1515 2.52217C16.6227 2.05002 16.6227 1.27915 16.1515 0.807005C15.6801 0.334557 14.9099 0.334557 14.4385 0.807005L1.22023 14.0483Z"
                  fill="#A393FE"
                  stroke="#A393FE"
                  strokeWidth="0.510448"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductTablet;
