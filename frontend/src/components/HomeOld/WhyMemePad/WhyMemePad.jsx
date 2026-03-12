import VectorWhyMemePad from "@/public/icons/VectorWhyMemePad";

import JoinNowButton from "../../Shared/JoinNowButton";

const WhyMemePad = () => {
  return (
    <>
      {/* main container */}
      <div className="relative flex flex-col lg:flex-col justify-center items-center gap-10 lg:gap-30 ">
        {/* text section */}
        <div className="z-40 text-white space-y-6 text-center lg:text-center lg:w-[600px]">
          <h1 className="text-7xl font-extrabold font-lato text-stroke-1-white">
            WHY{" "}
            <span className="text-[#A393FE] font-broad font-extrabold text-stroke-3-purple">
              MeME PAD
            </span>
          </h1>
          <p className="text-lg pb-8">
            <span className="font-extrabold">MEMEPAD</span> is setting{" "}
            <span className="font-extrabold">a new standard</span> for future
            memecoins entering the ecosystem. It stands as a beacon,{" "}
            <span className="font-extrabold">safeguarding investors</span> from
            the pitfalls of rugpulls, scams, and inactive teams that have
            plagued the crypto world.
          </p>
          {/* join now button */}
        </div>
        <div className="mr-48">
          <JoinNowButton text="JoIN" design="two" color="#DE9CFD" />
        </div>{" "}
        {/* use the background vector */}
        <VectorWhyMemePad />
      </div>
    </>
  );
};
export default WhyMemePad;
