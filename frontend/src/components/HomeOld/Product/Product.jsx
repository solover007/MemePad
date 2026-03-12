import { TEXT_MAP } from "@/lib/utils/constants";
import Image from "next/image";

const Product = () => {
  return (
    <div className="relative my-2">
      <Image
        width={500}
        height={500}
        src="/images/sh2/Subtract.svg"
        className="w-[100%]"
        alt="usp logo"
      />
      {/* <Subtract className="w-[100%]" /> */}
      <div className="w-full h-full flex absolute top-0">
        <div className="w-1/2 flex justify-center flex-col relative scale-[80%] p-0 pl-0 min-[1400px]:p-16 min-[1400px]:pl-24 min-[1400px]:scale-100">
          <h3 className="text-4xl font-semibold font-lato">
            We aim to be the top choice for launching MEME tokens.
          </h3>

          <div className="relative w-fit">
            <p className="font-broad text-[#8B76FF] text-8xl font-extrabold z-20 mt-8">
              PRoDUCT
            </p>

            <Image
              width={500}
              height={500}
              src="/images/sh2/Vector36.svg"
              className="absolute -z-10 -mt-8"
              alt="product line"
            />
            {/* <Vector className="absolute -z-10 -mt-8" /> */}
          </div>
          <div className="mt-10 flex flex-col gap-8 w-[530px] leading-5">
            <div>
              <Image
                width={500}
                height={500}
                // src={bulletPointMark}
                src="/images/sh2/Group 6345779.svg"
                className="w-8 h-8 mb-2"
                alt="Start icon"
              />
              {TEXT_MAP.product.one({ className: "text-lg" })}
            </div>
            <div>
              <Image
                width={500}
                height={500}
                // src={bulletPointMark}
                src="/images/sh2/Group 6345779.svg"
                className="w-8 h-8 mb-2"
                alt=""
              />
              {TEXT_MAP.product.two({ className: "text-lg" })}
            </div>
            <div>
              <Image
                width={500}
                height={500}
                // src={bulletPointMark}
                src="/images/sh2/Group 6345779.svg"
                className="w-8 h-8 mb-2"
                alt=""
              />
              {TEXT_MAP.product.three({ className: "text-lg" })}
            </div>
          </div>
        </div>

        <div className="w-1/2 flex justify-center flex-col relative scale-[80%] p-0 pl-0 min-[1400px]:p-16 min-[1400px]:pl-24 min-[1400px]:scale-100">
          <Image
            width={500}
            height={500}
            // src={UPSLogo}
            src="/images/sh2/Group 6345766.svg"
            className="w-[60%]"
            alt="usp logo"
          />

          <div className="p-10 px-14 bg-white border-[#E7E7E7] border rounded-tl-[68px] rounded-br-[68px] mt-10">
            Participate in{" "}
            <span className="font-bold">meme token launches</span> and recieve
            free tokens for holding memepad tokens.
          </div>

          <div className="grid grid-cols-2 gap-2 mt-2">
            <div className="flex justify-center items-center px-4 py-6 bg-white border-[#E7E7E7] border rounded-tl-[68px] rounded-br-[68px] min-[1100px]:py-7 min-[1400px]:py-9">
              <p className="text-center">
                <span className="font-bold">KOL Support</span> for all memecoins
                launching
              </p>
            </div>

            <div className="flex justify-center items-center px-4 py-6 bg-[#DBD8F2] border-[#E7E7E7] border rounded-tr-[68px] rounded-bl-[68px] min-[1100px]:py-7 min-[1400px]:py-9">
              <p className="text-center">
                Memepad becomes a <span className="font-bold">central hub</span>{" "}
                for memecoiners
              </p>
            </div>

            <div className="flex justify-center items-center px-4 py-6 bg-[#DBD8F2] border-[#E7E7E7] border rounded-tr-[68px] rounded-bl-[68px] min-[1100px]:py-7 min-[1400px]:py-9">
              <p className="text-center">
                Liquidity providing{" "}
                <span className="font-bold">opportunities for hodlers</span> to
                earn from volume.
              </p>
            </div>

            <div className="flex justify-center items-center px-4 py-6 bg-white border-[#E7E7E7] border rounded-tl-[68px] rounded-br-[68px] min-[1100px]:py-7 min-[1400px]:py-9">
              <p className="text-center">
                <span className="font-bold">Meme Market</span> is Massive
              </p>
            </div>

            <div className="flex justify-center items-center px-4 py-6 bg-white border-[#E7E7E7] border rounded-tl-[68px] rounded-br-[68px] min-[1100px]:py-7 min-[1400px]:py-9">
              <p className="text-center">
                <span className="font-bold">No direct competitor</span> –
                dedicated memecoin launchpad
              </p>
            </div>

            <div className="flex justify-center items-center px-4 py-6 bg-[#DBD8F2] border-[#E7E7E7] border rounded-tr-[68px] rounded-bl-[68px] min-[1100px]:py-7 min-[1400px]:py-9">
              <p className="text-center">
                Initial <span className="font-bold">community support</span> for
                all memecoins launching
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
