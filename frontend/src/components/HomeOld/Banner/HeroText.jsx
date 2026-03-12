// import fire emoji
import Arrow from "@/public/icons/Arrow";
// import { PreSaleLive } from "@/public/icons/PreSaleLive";
import PreSaleLiveTeal from "@/public/icons/PreSaleLiveTeal";
import fireEmojiTeal from "@/public/images/fire-emoji-teal.png";

// import logo
import solanaLogo from "@/public/images/solana-logo-round-black.png";

// import { PRE_SALE_ADDRESS } from "@/lib/utils/constants";
// import WalletAddress from "../../Countdown/SendMoney/WalletAddress";
import Email from "../../Countdown/SocialLinks/Email";
import Telegram from "../../Countdown/SocialLinks/Telegram";
import Twitter from "../../Countdown/SocialLinks/Twitter";
import JoinNowButton from "../../Shared/JoinNowButton";
import PinkSale from "../../Countdown/SocialLinks/PinkSale";
// import PinkButton from "../../Countdown/PinkButton/PinkButton";

const HeroText = () => {
 
  const textClasses =
    "relative text-white text-stroke-4-white font-black font-broad text-[2.9rem] md:text-[2rem] lg:text-[80px] tracking-[6.10px] leading-[4.8rem] z-[100]";
  return (
    <div className="relative flex flex-col lg:max-w-[40rem] lg:ml-[3rem] md:mt-8 lg:mt-0 md:p-4">
      {/* Pre sale sticker */}
      <div className="hidden md:block absolute -top-8 md:-top-20 -right-10 md:right-[15%] lg:right-[-30%] lg:top-[-10%] z-50">
        <PreSaleLiveTeal />
      </div>

      {/* Hero text */}
      <p className={textClasses}>
        H
        <img
          className="mb-1 inline w-10 md:w-[75px]"
          src={fireEmojiTeal}
          alt="fire-emoji"
        />
        TTeST{" "}
        <span className="z-50 text-teal text-stroke-4-teal text-[2.9rem] md:text-[2rem] lg:text-[80px]">
          MeMECoINS
        </span>
      </p>
      <div className="flex items-center mt-4 md:mt-2">
        <span className="relative text-white text-stroke-4-white font-broad font-black text-[2.1rem] md:text-[2rem] lg:text-[80px] tracking-[5.10px] md:tracking-[6.10px] leading-[3.7rem] z-[100]">
          oN
        </span>
        {/* solana arrow */}
        <div className="flex w-[4.4rem] h-[2.2rem] md:w-[6rem] lg:w-[9rem] ml-1  mr-2  md:h-[2.5rem] lg:h-[3.6rem] md:py-1 px-2 md:px-4 rounded-[3rem] md:rounded-[4rem] border-4 items-center justify-center mt-1 z-50">
          <Arrow />
        </div>
        <span className="relative text-stroke-4-white font-broad font-black text-[2.1rem] md:text-[2rem] lg:text-[80px] tracking-[5px] leading-[2.5rem] text-white  z-[100]">
          S
        </span>

        <img
          src={solanaLogo}
          alt="Solana Logo"
          className=" object-contain mr-1 ml-0 text-stroke-3-black md:text-stroke-4-black md:mr-1 md:ml-0 lg:mx-0 w-8 h-8 lg:mr-1 lg:w-16 lg:h-16 z-50"
        />

        <span className="relative text-white text-stroke-4-white uppercase font-broad font-black text-[2.1rem] md:text-[2rem] lg:text-[80px] tracking-[5.10px] md:tracking-[6.10px] leading-[2.5rem] z-[100]">
          lana
        </span>
      </div>

      {/* send money section */}
      {/* <div className="relative flex flex-col gap-2 mb-6 md:mb-0 mt-10 z-50 md:bg-transparent bg-[#8D7CEE] p-5 py-10 md:p-0 rounded-3xl">
        <div className=" text-white md:text-black text-2xl md:text-3xl  leading-[2.2rem] uppercase font-extrabold md:font-normal md:[-webkit-text-stroke:3.14px_#000000] font-lato ">
          <h3 style={{ textShadow: "0 2px 2px rgba(0, 0, 0, 0.25)" }}>
            send money here.
          </h3>
          <h3 style={{ textShadow: "0 2px 2px rgba(0, 0, 0, 0.25)" }}>
            you snooze you lose
          </h3>
        </div>
        <WalletAddress
          address={PRE_SALE_ADDRESS}
          text="INVEST NoW"
          font="broad"
          design="one"
        />

       
        <div className="md:hidden absolute -top-14 md:-top-20 -right-10 md:right-16 lg:right-[-18%] lg:top-[-26%] z-50">
          <PreSaleLive />
        </div>
      </div> */}

                  <div className="mb-4 mt-14">
        <JoinNowButton text="JoIN" design="one" color="#DE9CFD" />
      </div>

      {/* Social links */}
      <div className="flex  items-center gap-10 mt-32 text-white">
        <Twitter color="white" />
        <Telegram color="white" />
        <Email color="white" />
        <PinkSale />
      </div>
    </div>
  );
};
export default HeroText;
