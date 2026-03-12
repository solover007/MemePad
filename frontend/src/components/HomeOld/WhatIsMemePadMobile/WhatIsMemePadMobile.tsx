import BlueLines from "../../../../public/icons/BlueLines";
import BlueStar from "../../../../public/icons/BlueStar";
import Star from "../../../../public/icons/Star";
import SocialsMobile from "../../Shared/SocialsMobile";
import butterflyMeme from "../../../../public/images/Make-a-meme-butterfly-mobile.png";
import Image from "next/image";

const WhatIsMemePadMobile = () => {
  return (
    <div className="flex flex-col min-h-screen rounded-3xl overflow-hidden">
      <div className="w-full min-h-[calc(100vh/2)] flex justify-center items-center relative bg-teal overflow-hidden">
        {/* what is memepad title */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[80%] h-[31%] bg-[#8B77FF] rotate-[-10deg] z-10">
          <div className="w-full h-full bg-black -mt-3 -ml-3 flex justify-center items-center px-6">
            <h1 className="text-stroke-4-white font-broad text-[36px] leading-[2.5rem] text-white  text-center tracking-wider md:leading-[4rem] md:text-[48px]">
              WhAT IS MeMEPAD?
            </h1>
          </div>
        </div>

        {/* butterfly meme image */}
        <Image
          src={butterflyMeme}
          alt="butterfly meme image"
          className="w-[60%] h-[25%] absolute top-[75%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 min-[480px]:top-[80%] min-[480px]:h-[35%] min-[480px]:w-[50%] md:w-[40%] md:h-[40%]"
        />

        {/* background blue lines */}
        <BlueLines className="absolute top-0 left-0 w-[70%]" />

        {/* background blue star */}
        <BlueStar className="absolute top-[2%] left-[2%] w-[68px] h-[68px]" />

        {/* regular star */}
        <Star className="absolute bottom-[2%] right-[2%] w-[68px] h-[68px]" />
      </div>

      <div className="w-full min-h-[calc(100vh/2)] flex justify-center items-center flex-col p-4 relative">
        {" "}
        {/* text content */}
        <div className="text-center scale-[80%] sm:scale-100">
          {/* component heading */}
          <h1 className="font-lato text-stroke-1-black text-black text-[30px] font-bold">
            A premier launchpad on <br /> Solana for{" "}
            <span className="bg-pink rounded-[30px] px-2 pb-2">memecoins</span>
          </h1>

          {/* sub heading */}
          <div className=" mt-6">
            <p className="font-lato text-[21px]">
              Specializing in{" "}
              <span className="font-extrabold">promoting high-quality,</span>{" "}
              <span className="font-extrabold">
                highly anticipated presales,
              </span>{" "}
              with plans for fair launches in the future.
            </p>
          </div>
        </div>
        {/* socials */}
        <SocialsMobile />
        {/* ellipse */}
        <div className="absolute bottom-4 right-2">
          <svg
            width="157"
            height="77"
            className="-mb-4"
            viewBox="0 0 157 77"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g id="Group 6345784">
              <g id="Ellipse 34">
                <mask id="path-1-inside-1_2517_6006" fill="white">
                  <path d="M145.929 47.751C144.485 41.5223 141.705 35.6969 137.749 30.6077C133.793 25.5185 128.738 21.265 122.872 18.0901C117.007 14.9152 110.445 12.881 103.563 12.1038C96.6807 11.3266 89.6122 11.8215 82.761 13.5602C75.9097 15.299 69.4101 18.2476 63.633 22.2377C57.8559 26.2277 52.9146 31.1811 49.0912 36.815C45.2678 42.4489 42.6372 48.653 41.3495 55.0731C40.0618 61.4931 40.1423 68.0034 41.5864 74.2321L60.7178 69.3768C59.8033 65.4321 59.7523 61.3092 60.5678 57.2434C61.3832 53.1776 63.0492 49.2486 65.4706 45.6807C67.8919 42.1128 71.0212 38.9758 74.6798 36.4489C78.3384 33.922 82.4546 32.0547 86.7934 30.9535C91.1323 29.8524 95.6088 29.539 99.9673 30.0312C104.326 30.5234 108.481 31.8116 112.196 33.8223C115.91 35.8329 119.112 38.5266 121.617 41.7496C124.123 44.9726 125.883 48.6617 126.797 52.6064L145.929 47.751Z" />
                </mask>
                <path
                  d="M145.929 47.751C144.485 41.5223 141.705 35.6969 137.749 30.6077C133.793 25.5185 128.738 21.265 122.872 18.0901C117.007 14.9152 110.445 12.881 103.563 12.1038C96.6807 11.3266 89.6122 11.8215 82.761 13.5602C75.9097 15.299 69.4101 18.2476 63.633 22.2377C57.8559 26.2277 52.9146 31.1811 49.0912 36.815C45.2678 42.4489 42.6372 48.653 41.3495 55.0731C40.0618 61.4931 40.1423 68.0034 41.5864 74.2321L60.7178 69.3768C59.8033 65.4321 59.7523 61.3092 60.5678 57.2434C61.3832 53.1776 63.0492 49.2486 65.4706 45.6807C67.8919 42.1128 71.0212 38.9758 74.6798 36.4489C78.3384 33.922 82.4546 32.0547 86.7934 30.9535C91.1323 29.8524 95.6088 29.539 99.9673 30.0312C104.326 30.5234 108.481 31.8116 112.196 33.8223C115.91 35.8329 119.112 38.5266 121.617 41.7496C124.123 44.9726 125.883 48.6617 126.797 52.6064L145.929 47.751Z"
                  stroke="#4B2ED1"
                  strokeWidth="2.01795"
                  mask="url(#path-1-inside-1_2517_6006)"
                />
              </g>
              <path
                id="Ellipse 33"
                d="M115.339 70.1553C113.895 63.9265 111.115 58.1012 107.159 53.012C103.203 47.9228 98.1481 43.6693 92.2825 40.4944C86.4168 37.3194 79.8555 35.2853 72.9732 34.5081C66.0909 33.7308 59.0223 34.2257 52.1711 35.9645C45.3199 37.7033 38.8202 40.6519 33.0432 44.642C27.2661 48.632 22.3248 53.5854 18.5014 59.2193C14.678 64.8532 12.0473 71.0573 10.7596 77.4774C9.47196 83.8974 9.55246 90.4077 10.9965 96.6364L30.1279 91.7811C29.2134 87.8364 29.1624 83.7135 29.9779 79.6477C30.7934 75.5819 32.4594 71.6529 34.8807 68.085C37.3021 64.5171 40.4314 61.3801 44.09 58.8532C47.7485 56.3263 51.8648 54.459 56.2036 53.3578C60.5424 52.2567 65.0189 51.9433 69.3775 52.4355C73.736 52.9277 77.8912 54.2159 81.6059 56.2266C85.3206 58.2372 88.522 60.9309 91.0273 64.1539C93.5327 67.3769 95.2928 71.066 96.2074 75.0107L115.339 70.1553Z"
                fill="#00AB96"
              />
            </g>
          </svg>
        </div>
      </div>
    </div>
  );
};
export default WhatIsMemePadMobile;
