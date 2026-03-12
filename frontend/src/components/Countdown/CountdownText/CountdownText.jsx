import Arrow from "@/public/icons/Arrow";
import { PreSaleLive } from "@/public/icons/PreSaleLive";
import solanaLogo from "@/public/images/solana-logo-round-black.png";
import { PRE_SALE_ADDRESS } from "@/lib/utils/constants";
import WalletAddress from "../SendMoney/WalletAddress";

// import fire emoji
import fireEmoji from "@/public/images/fire-emoji.png";

const CountdownText = () => {
  const textClasses =
    "relative uppercase text-stroke-2-black font-lato font-black text-[2.9rem] md:text-[2rem] lg:text-[3rem] tracking-[6.10px] leading-[3.5rem] select-none z-[100]";
  return (
    <div className="relative flex flex-col lg:max-w-[40rem] lg:ml-[4rem] md:mt-8 lg:mt-0 md:p-4">
      {/* Pre sale sticker */}
      <div className="hidden md:block absolute -top-8 md:-top-20 -right-10 md:right-[15%] lg:right-[-18%] lg:top-[-26%] z-50">
        <PreSaleLive />
      </div>

      {/* Hero text */}
      <p className={textClasses}>
        h
        <img
          className="mb-1 inline w-10 md:w-[50px]"
          src={fireEmoji}
          alt="fire-emoji"
        />
        ttest{" "}
        <span className="z-50 text-teal text-[2.9rem] md:text-[2rem] lg:text-[3rem]">
          memecoin
        </span>
        <br /> launchpad <br />
      </p>
      <div className="flex items-center mt-4 md:mt-2 text-stroke-4-black">
        <span className="relative uppercase text-stroke-3-black md:text-stroke-4-black font-lato font-black text-[2.1rem] md:text-[2rem] lg:text-[3rem] tracking-[5.10px] md:tracking-[6.10px] leading-[2.5rem] select-none z-[100]">
          on
        </span>
        <div className="flex w-[4.4rem] h-[2.2rem] md:w-[6rem] lg:w-[8rem] ml-1  mr-2  md:h-[2.5rem] lg:h-[3.2rem] md:py-1 px-2 md:px-4 rounded-[3rem] md:rounded-[4rem] border-darkblue border-4 items-center justify-center mt-1 z-50">
          <Arrow />
        </div>
        <span className="relative uppercase font-lato text-stroke-3-black md:text-stroke-4-black font-black text-[2.1rem] md:text-[2rem] lg:text-[3rem] tracking-[5px] leading-[2.5rem] select-none z-[100]">
          s
        </span>
        <div className="inline-flex items-center justify-center">
          <img
            src={solanaLogo}
            alt="Solana Logo"
            className=" object-contain mr-1 ml-0 text-stroke-3-black md:text-stroke-4-black md:mr-1 md:ml-0 lg:mx-0 w-8 h-8 lg:mr-1 lg:w-12 lg:h-12 z-50"
          />
        </div>
        <span className="relative uppercase text-stroke-3-black md:text-stroke-4-black font-lato font-black text-[2.1rem] md:text-[2rem] lg:text-[3rem] tracking-[5.10px] md:tracking-[6.10px] leading-[2.5rem] select-none z-[100]">
          lana
        </span>
      </div>

      {/* send money section */}
      <div className="relative flex flex-col gap-2 mb-6 md:mb-0 mt-10 z-50 md:bg-transparent bg-[#8D7CEE] p-5 py-10 md:p-0 rounded-3xl">
        <div className=" text-white md:text-black text-2xl md:text-3xl  leading-[2.2rem] uppercase font-extrabold md:font-normal md:[-webkit-text-stroke:3.14px_#000000] font-lato ">
          <h3 style={{textShadow: "0 2px 2px rgba(0, 0, 0, 0.25)"}}>send money here.</h3>
          <h3 style={{textShadow: "0 2px 2px rgba(0, 0, 0, 0.25)"}}>you snooze you lose</h3>
        </div>
        <WalletAddress text="INVEST NOW" address={PRE_SALE_ADDRESS} design="one" />

         {/* Pre sale sticker for mobile view */}
      <div className="md:hidden absolute -top-14 md:-top-20 -right-10 md:right-16 lg:right-[-18%] lg:top-[-26%] z-50">
        <PreSaleLive />
      </div>
      </div>
    </div>
  );
};
export default CountdownText;
