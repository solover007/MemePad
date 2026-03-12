import goatImg from "../../../../public/images/goat.png";
import Exclude from "../../../../public/icons/JoinMemepadIcons/Exclude";
import JoinNowButton from "../../Shared/JoinNowButton";
import Image from "next/image";

const JoinMemepadRight = () => {
  return (
    <div className="relative flex-1 rounded-tr-3xl rounded-br-3xl bg-[#7A64F4]">
      <div className="flex flex-col items-center justify-center  gap-6 py-28 mb-20">
        <Image
          width={500}
          height={500}
          className="w-64"
          src={goatImg}
          alt="goat image"
        />
        {/* component heading */}
        <h1 className="font-lato text-stroke-1-white text-white text-[40px] font-bold">
          A premier launchpad on <br /> Solana for{" "}
          <span className="bg-pink rounded-[30px] px-2 pb-2">memecoins</span>
        </h1>

        <div className="mt-6 mr-36">
          <JoinNowButton text="JoIN" design="two" color="#F68BFF" />
        </div>
      </div>

      <Exclude />
    </div>
  );
};
export default JoinMemepadRight;
