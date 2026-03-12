import productBottom from "@/public/images/sh2/Vector36.svg";
import bulletPointMark from "@/public/images/sh2/Group 6345779.svg";
import UPSLogo from "@/public/images/sh2/Group 6345766.svg";
import { useState } from "react";
import Image from "next/image";

const slides = [
  {
    id: 1,
    text: "To initiate fundraising through the MEMEPad platform, wallets must maintain a specified token balance.",
  },
  {
    id: 2,
    text: "Participate in meme token launches and receive free tokens for holding memepad tokens.",
  },
  {
    id: 3,
    text: "Initial community support for all memecoins launching",
  },
];

const ProductMobile = () => {
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

  const goToSlide = (slideIndex) => {
    setCurrentIndex(slideIndex);
  };

  return (
    <div>
      <div
        className="h-[1250px] md:h-[1100px] bg-[url('/images/tabletProductsBG.svg')] bg-no-repeat text-center mx-auto bg-contain"
        style={{ backgroundSize: "100% 100%" }}
      >
        <div>
          <div className="pt-4">
            <h3 className="text-2xl font-bold text-stroke-1-black font-lato pt-8 md:pt-3">
              We aim to be the top choice for launching MEME tokens.
            </h3>
          </div>
          <div className="pt-4">
            <h1 className="font-broad text-[#8B76FF] text-[56px] font-extrabold z-10 relative w-72 mx-auto text-left">
              PRoDUCT
            </h1>
            <Image
              width={500}
              height={500}
              src="/images/sh2/Vector36.svg"
              className="w-72 z-0 mx-auto mt-[-35px] mb-5"
              alt=""
            />
          </div>
          <div className=" flex flex-col gap-2 w-72 mx-auto leading-5 text-left">
            <div>
              <div className="flex mx-auto w-[350px]">
                <Image
                  width={500}
                  height={500}
                  // src={bulletPointMark}
                  src="/images/sh2/Group 6345779.svg"
                  className="w-6 h-6 "
                  alt=""
                />
              </div>
              <p className=" ">
                Project raisers must allocate{" "}
                <span className="font-bold">a portion of their tokens</span> to
                MEMEPad for airdrops to native token holders.
              </p>
            </div>
            <div>
              <div className="flex mx-auto w-[350px]">
                <Image
                  width={500}
                  height={500}
                  src="/images/sh2/Group 6345779.svg"
                  className="w-6 h-6 "
                  alt=""
                />
              </div>
              <p className=" ">
                MEMEPad has a level of{" "}
                <span className="font-bold">centralizatation</span>, meaning
                that the projects and founders and subject to indepth dd, tokens{" "}
                <br />
                and raise capital will be vested through mpad, while liquidity
                is locked through the memepad platform
              </p>
            </div>
            <div>
              <div className="flex mx-auto w-[350px]">
                <Image
                  width={500}
                  height={500}
                  src="/images/sh2/Group 6345779.svg"
                  className="w-6 h-6 "
                  alt=""
                />
              </div>
              <p className=" ">
                To participate, a wallet needs to hold a specific amount of{" "}
                <span className="font-bold">MEMEPad&apos;s native tokens</span>{" "}
                similar to how decentralized launchpads operate.
              </p>
            </div>
          </div>
        </div>

        <div>
          <div className="w-full ">
            <Image
              width={500}
              height={500}
              // src={UPSLogo}
              src="/images/sh2/Group 6345766.svg"
              alt="UPS logo"
              className="w-52 mt-40 md:mt-20   mx-auto -rotate-6 "
            />
          </div>

          <div className="relative">
            <div
              style={{ boxShadow: "10px 10px 0px 0px #02000B" }}
              className="relative w-60 mt-10 mb-20 border-2 border-black mx-auto"
            >
              <div className="w-48 h-60 py-14  mx-auto text-left ">
                {slides[currentIndex].text}
                <div className=" w-48 mt-5 mb-20  border-2 border-[#56F0CC] mx-auto"></div>
              </div>
            </div>

            {/* left and right arrow */}
            <div onClick={nextSlide} className="absolute top-[45%] right-[10%]">
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

            <div onClick={prevSlide} className="absolute top-[45%] left-[10%]">
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
            {/* slider dots */}
            <div className="absolute bottom-[-15%] right-[40%] flex items-center gap-2">
              {slides.map((slide, index) => (
                <div key={slide.id} onClick={() => goToSlide(index)}>
                  {index === currentIndex ? (
                    <svg
                      className="h-1"
                      viewBox="0 0 38 4"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <rect
                        x="0.676758"
                        width="37.2896"
                        height="3.99531"
                        rx="1.99766"
                        fill="#8B77FF"
                      />
                    </svg>
                  ) : (
                    <svg
                      className="w-3"
                      viewBox="0 0 10 4"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <rect
                        x="0.499023"
                        width="9.32239"
                        height="3.99531"
                        rx="1.99766"
                        fill="#C5C5C5"
                      />
                    </svg>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductMobile;
