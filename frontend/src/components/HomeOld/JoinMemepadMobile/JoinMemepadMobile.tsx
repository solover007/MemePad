import Image from "next/image";
import Exclude from "../../../../public/icons/JoinMemepadIcons/Exclude";
import TwoBox from "../../../../public/icons/JoinMemepadIcons/TwoBox";
import joinMemeImg from "../../../../public/images/JoinMemepad.png";
import goatImgMobile from "../../../../public/images/goatMobile.png";
// import { PRE_SALE_ADDRESS } from "@/lib/utils/constants";
// import WalletAddress from "../../Countdown/SendMoney/WalletAddress";
import JoinNowButton from "../../Shared/JoinNowButton";

const JoinMemepadMobile = () => {
  return (
    <div className="flex flex-col items-center min-h-screen">
      {/* top */}
      <div className="flex-1  relative w-full flex flex-col items-center justify-center pb-20">
        <Image
          width={500}
          height={500}
          className="w-[350px] mt-11"
          src={joinMemeImg}
          alt="join memepad"
        />
        <TwoBox />
      </div>

      {/* bottom */}
      <div className="relative flex-1 pt-6 flex flex-col items-center bg-[#7A64F4] w-full pb-9 rounded-br-3xl rounded-bl-3xl">
        <Image
          width={500}
          height={500}
          className="w-[370px]"
          src={goatImgMobile}
          alt="goat image"
        />
        <h1 className="mt-4 font-lato text-stroke-1-white text-white text-[30px]">
          A premier launchpad on <br /> Solana for{" "}
          <span className="bg-pink rounded-[30px] px-2 pb-2">memecoins</span>
        </h1>

        {/* send money section */}

        {/* <div className="w-[290px] mt-10 mb-4 md:mb-16 md:flex md:justify-end">
          <WalletAddress
            address={PRE_SALE_ADDRESS}
            text="INVEST NoW"
            font="broad"
            design="one"
          />
        </div> */}
        {/* join now button */}
        <div className="mt-14 md:mb-6 mr-32">
          <JoinNowButton text="JoIN" design="two" color="#57F0CD" />
        </div>

        <Exclude />
      </div>
    </div>
  );
};
export default JoinMemepadMobile;
