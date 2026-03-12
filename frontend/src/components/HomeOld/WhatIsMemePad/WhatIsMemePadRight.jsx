import EllipseGreen from "@/public/icons/EllipseGreen";
import EllipseOutline from "@/public/icons/EllipseOutline";
import {
  EMAIL,
  TG_USERNAME,
  TWITTER_USERNAME,
} from "../../../lib/utils/constants";

const WhatIsMemePadRight = () => {
  return (
    <div className="relative flex justify-center items-center flex-col w-[50%]">
      {/* text content */}
      <div className="text-center mt-14">
        {/* component heading */}
        <h1 className="font-lato text-stroke-1-black text-black text-[40px] font-bold">
          A premier launchpad on <br /> Solana for{" "}
          <span className="bg-pink rounded-[30px] px-2 pb-2">memecoins</span>
        </h1>

        {/* sub heading */}
        <div className="w-[450px] mx-auto mt-6">
          <p className="font-lato text-2xl">
            specializing in{" "}
            <span className="font-extrabold">promoting high-quality,</span>{" "}
            <span className="font-extrabold">highly anticipated presales,</span>{" "}
            with plans for fair launches in the future.
          </p>
        </div>
      </div>

      {/* socials */}
      <div className="flex items-center gap-8 justify-center mt-14 flex-wrap px-4">
        <a
          className="z-50 flex items-center gap-1 font-bold hover:cursor-pointer"
          href={`https://x.com/${TWITTER_USERNAME}`}
          target="_blank"
        >
          <svg
            className="w-5 md:w-7"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="m0 0h24v24h-24" fill="#fff" opacity="0" />
            <path
              d="m8.08 20a11.07 11.07 0 0 0 11.44-11 8.09 8.09 0 0 0 1.48-2.84.44.44 0 0 0 -.62-.51 1.88 1.88 0 0 1 -2.16-.38 3.89 3.89 0 0 0 -5.58-.17 4.13 4.13 0 0 0 -1.15 3.9c-3.35.2-5.65-1.39-7.49-3.57a.43.43 0 0 0 -.75.24 9.68 9.68 0 0 0 4.6 10.05 6.73 6.73 0 0 1 -4.47 2.28.45.45 0 0 0 -.14.84 11 11 0 0 0 4.84 1.16"
              fill="black"
            />
          </svg>
          <p className={`text-[10px] md:text-sm`}>{TWITTER_USERNAME}</p>
        </a>

        <a
          className="z-50 flex items-center gap-1 font-bold hover:cursor-pointer"
          href={`https://t.me/${TG_USERNAME}`}
          target="_blank"
        >
          <svg
            className="w-5 md:w-7"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 45 45"
            fill="none"
          >
            <path
              d="M22.5 3.75C12.15 3.75 3.75 12.15 3.75 22.5C3.75 32.85 12.15 41.25 22.5 41.25C32.85 41.25 41.25 32.85 41.25 22.5C41.25 12.15 32.85 3.75 22.5 3.75ZM31.2 16.5C30.9187 19.4625 29.7 26.6625 29.0813 29.9812C28.8188 31.3875 28.2938 31.8563 27.8062 31.9125C26.7188 32.0063 25.8937 31.2 24.8438 30.5063C23.1938 29.4188 22.2563 28.7438 20.6625 27.6938C18.8063 26.475 20.0063 25.8 21.075 24.7125C21.3562 24.4312 26.1562 20.0625 26.25 19.6687C26.263 19.6091 26.2613 19.5472 26.245 19.4884C26.2286 19.4296 26.1982 19.3756 26.1562 19.3313C26.0437 19.2375 25.8937 19.275 25.7625 19.2937C25.5938 19.3313 22.9688 21.075 17.85 24.525C17.1 25.0312 16.425 25.2937 15.825 25.275C15.15 25.2562 13.875 24.9 12.9187 24.5812C11.7375 24.2062 10.8187 24 10.8937 23.3438C10.9313 23.0063 11.4 22.6687 12.2812 22.3125C17.7563 19.9312 21.3937 18.3563 23.2125 17.6063C28.425 15.4313 29.4938 15.0562 30.2063 15.0562C30.3563 15.0562 30.7125 15.0937 30.9375 15.2812C31.125 15.4312 31.1812 15.6375 31.2 15.7875C31.1812 15.9 31.2187 16.2375 31.2 16.5Z"
              fill="black"
            />
          </svg>
          <p className={`text-[10px] md:text-sm`}>{TG_USERNAME}</p>
        </a>
        <a className="z-50 flex items-center gap-1 font-bold hover:cursor-pointer">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 md:w-7"
            viewBox="0 0 44 45"
            fill="none"
          >
            <path
              d="M36.666 7.83325H7.33268C5.31602 7.83325 3.68435 9.48325 3.68435 11.4999L3.66602 33.4999C3.66602 35.5166 5.31602 37.1666 7.33268 37.1666H36.666C38.6827 37.1666 40.3327 35.5166 40.3327 33.4999V11.4999C40.3327 9.48325 38.6827 7.83325 36.666 7.83325ZM36.666 15.1666L21.9993 24.3333L7.33268 15.1666V11.4999L21.9993 20.6666L36.666 11.4999V15.1666Z"
              fill="black"
            />
          </svg>
          <p className={`text-[10px] md:text-sm`}>{EMAIL}</p>
        </a>
      </div>

      {/* ellips background */}
      <div className="absolute top-0 left-[12%] scale-90 xl:scale-100">
        <EllipseOutline className="w-56" />
        <EllipseGreen className="mt-[-80px] ml-[-80px] w-60" />
      </div>
    </div>
  );
};
export default WhatIsMemePadRight;
