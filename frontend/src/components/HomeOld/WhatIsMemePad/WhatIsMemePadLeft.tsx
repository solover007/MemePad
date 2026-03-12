import Image from "next/image";
import BlueLines from "../../../../public/icons/BlueLines";
import BlueStar from "../../../../public/icons/BlueStar";
import Star from "../../../../public/icons/Star";

// import butterfly meme image
import butterflyMeme from "../../../../public/images/Make-a-meme-butterfly.png";

const WhatIsMemePadLeft = () => {
  return (
    <div className="relative bg-[#57F0CD] w-[50%] h-full">
      {/* what is memepad title */}

      <div className="absolute top-[40%] left-[60%] transform -translate-x-1/2 -translate-y-1/2 w-[70%] h-[28%] bg-[#8B77FF] rotate-[-15deg] z-10">
        <div className="w-full h-full bg-black -mt-4 -ml-4 flex justify-center items-center px-6">
          <h1 className="text-stroke-4-white font-broad text-[60px] min-[1400px]:text-[80px] text-white leading-[4rem]">
            WhAT IS MeMEPAD?
          </h1>
        </div>
      </div>

      {/* butterfly meme image */}
      <Image
        width={500}
        height={500}
        className="w-[300px] absolute top-[52%] right-[25%] z-20"
        src={butterflyMeme}
        alt="butterly meme image"
      />

      {/* background blue lines */}
      <BlueLines className="absolute top-0 left-0 w-[60%]" />

      {/* background blue star */}
      <BlueStar className="absolute left-2 top-2  w-20  lg:top-[4%] lg:left-[18%] lg:w-[200px] z-20" />

      {/* regular star */}
      <Star className="absolute bottom-2 right-2 w-16 lg:w-[150px] lg:bottom-[2%] lg:left-[5%]" />
    </div>
  );
};
export default WhatIsMemePadLeft;
