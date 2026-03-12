import Image from "next/image";
import Header from "../Header";
import FlagButton from "../Buttons/FlagButton";

const LaunchpadBanner = () => {
  return (
    <div className="p-2">
      <div className="relative rounded-3xl border-4 border-black  bg-grid-memberships bg-no-repeat bg-cover w-full bg-[#FBFBF5] mx-auto pb-20 overflow-hidden">
        {/* Header Navbar */}
        <Header color="purple" />
        {/* Launchpad banner text */}
        <div className="flex flex-col gap-6 mt-10 lg:ml-24 w-full px-7 lg:w-[60%]">
          {/* heading */}

          <div className="font-broad font-medium text-5xl">
            <h1>THe PREMIER MeMECOIN</h1>
            <h1>LAUNCHPAD & INCUBAToR</h1>
          </div>

          {/* sub heading */}

          <p className=" text-[#070707] text-sm md:w-full md:text-base lg:text-xl">
            MEMEPad helps everyone to create their own tokens and token sales
            with launch and incubation support. Tokens created on MEMEPad will
            be verified with our security and quality guarantee.
          </p>

          {/* buttons */}
          <div className="flex items-start  flex-col md:flex-row lg:mt-6 gap-6 lg:gap-10">
            <FlagButton
              className="lg:mt-4 lg:mb-4"
              href="https://forms.gle/ozN22F9x2ckpaBFw6"
              shadow
              bgColor="bg-[#7A64F4]"
            >
              <p className=" font-broad font-black text-white whitespace-nowrap text-base px-4 lg:px-0 lg:text-[24px]">
                SUbMIT YoUR PrOJECT
              </p>
            </FlagButton>

            <FlagButton
              className="lg:mt-4 lg:mb-4"
              href="https://docs.memepad.ai/"
              shadow
              bgColor="bg-[#FBFBF5]"
            >
              <p className="font-broad font-black  whitespace-nowrap text-base px-4 lg:px-0 lg:text-[24px]">
                LeARN MoRE
              </p>
            </FlagButton>
          </div>
        </div>

        <Image
          width={500}
          height={500}
          src="/images/ape-rocket.png"
          alt="saw"
          className="bottom-10 -right-[140px] w-fit mt-10 md:ml-28 lg:mt-0 lg:scale-[60%] lg:absolute xl:-bottom-[120px] xl:-right-[76px] xl:scale-[80%] 2xl:-right-[11px] 2xl:scale-100"
        />
      </div>
    </div>
  );
};
export default LaunchpadBanner;
