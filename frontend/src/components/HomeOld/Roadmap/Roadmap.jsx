/* eslint-disable react/no-unescaped-entities */
import EllipseRoadmap from "@/public/icons/ellipse-roadmap.svg";
import EllipseAroundRoadmap from "@/public/icons/ellipse-around-roadmap.svg";
import MonkeyRoadmap from "@/public/icons/monkey-roadmap.svg";
import ArrowOneRoadmap from "@/public/icons/arrow-one-roadmap.svg";
import ArrowTwoRoadmap from "@/public/icons/arrow-two-roadmap.svg";

const Roadmap = () => {
  return (
    <div className="mb-7 overflow-hidden">
      <div className="p-4 relative flex justify-center items-center w-full scale-75 xl:scale-90 2xl:scale-100">
        <div className="size-[768px] relative flex justify-center items-center">
          <img
            src={EllipseRoadmap}
            className="w-full h-[70%] absolute"
            alt="Ellipse Roadmap"
          />
          <img
            src={MonkeyRoadmap}
            className="w-full h-[60%] absolute top-[14%]"
            alt="Monkey Roadmap"
          />
          <img
            src={EllipseAroundRoadmap}
            className="w-full h-[74%] absolute"
            alt="Ellipse Around Roadmap"
          />
          <img
            src={ArrowOneRoadmap}
            className="w-8 absolute top-[26%] left-[18%]"
            alt="Arrow One Roadmap"
          />
          <img
            src={ArrowTwoRoadmap}
            className="w-8 absolute bottom-[17%] right-[32%]"
            alt="Arrow Two Roadmap"
          />

          <h2 className="absolute font-broad self-center font-extrabold text-[76px] z-10">
            RoADMAP
          </h2>
          {/* KOL Round */}
          <div className="absolute flex flex-col text-right max-w-[500px] top-[10%] -left-[33%]">
            <div className="flex justify-end gap-5">
              <p className="text-[36px] font-extrabold uppercase leading-[44px]">
                KOL Round
              </p>
              <div className="size-[60px] flex justify-center items-center text-[#57F0CD] rounded-full font-lato bg-black font-extrabold text-2xl -mr-[60px]">
                1
              </div>
            </div>
            <div className="mr-[92px]">
              <p className="text-xl font-normal">
                Collaboration with Key Opinion Leaders (KOLs) for support and
                marketing.
              </p>
            </div>
          </div>
          {/* Community Growth */}
          <div className="absolute flex flex-col text-right max-w-[500px] top-[35%] -left-[30%]">
            <div className="flex justify-end gap-5">
              <p className="text-[36px] font-extrabold uppercase max-w-[300px] leading-[44px]">
                Community Growth
              </p>
              <div className="size-[60px] flex justify-center items-center text-[#57F0CD] rounded-full font-lato bg-black font-extrabold text-2xl -mr-[60px]">
                2
              </div>
            </div>
            <div className="mr-[20px]">
              <p className="text-xl font-normal max-w-[300px]">
                Focus on expanding the community, developing the website, and
                initiating presale marketing.
              </p>
            </div>
          </div>
          {/* Presale Initiation */}
          <div className="absolute flex flex-col text-right max-w-[500px] bottom-[10%] -left-[31%]">
            <div className="flex justify-end gap-5">
              <p className="text-[36px] font-extrabold uppercase max-w-[300px] leading-[44px]">
                Presale Initiation
              </p>
              <div className="size-[60px] flex justify-center items-center text-[#57F0CD] rounded-full font-lato bg-black font-extrabold text-2xl -mr-[60px]">
                3
              </div>
            </div>
            <div className="mr-[20px]">
              <p className="text-xl font-normal max-w-[360px]">
                Rolling out a two stage pre-sale, one on the website, and one on
                our own launchpad.
              </p>
            </div>
          </div>
          {/* Ideation */}
          <div className="absolute flex flex-col text-right max-w-[500px] -bottom-[4%]">
            <div className="flex flex-col justify-center items-center gap-2">
              <div className="size-[60px] flex justify-center items-center text-[#57F0CD] rounded-full font-lato bg-black font-extrabold text-2xl">
                4
              </div>

              <p className="text-[36px] font-extrabold uppercase max-w-[300px] leading-[44px]">
                Ideation
              </p>

              <p className="text-xl font-normal text-center mb-3 max-w-[500px]">
                This stage involves brainstorming ideas, creating the
                whitepaper, and outlining the project's plan.
              </p>
            </div>
          </div>
          {/* Community Growth */}
          <div className="absolute flex flex-col text-left max-w-[500px] bottom-[7%] -right-[31%]">
            <div className="flex justify-end gap-5">
              <div className="size-[60px] flex justify-center items-center text-[#57F0CD] rounded-full font-lato bg-black font-extrabold text-2xl">
                5
              </div>
              <div>
                <p className="text-[36px] font-extrabold uppercase max-w-[300px] leading-[44px]">
                  Community Growth
                </p>

                <p className="text-xl font-normal max-w-[360px]">
                  Focus on expanding the community, developing the website, and
                  initiating presale marketing.
                </p>
              </div>
            </div>
          </div>
          {/* More Community Growth */}
          <div className="absolute flex flex-col text-left max-w-[500px] top-[37%] -right-[38%]">
            <div className="flex justify-end gap-5">
              <div className="size-[60px] flex justify-center items-center text-[#57F0CD] rounded-full font-lato bg-black font-extrabold text-2xl">
                6
              </div>
              <div>
                <p className="text-[36px] font-extrabold uppercase max-w-[360px] leading-[44px]">
                  More Community Growth
                </p>

                <p className="text-xl font-normal max-w-[360px]">
                  Focus on expanding the community, developing the website, and
                  initiating presale marketing.
                </p>
              </div>
            </div>
          </div>
          {/* Even More Community Growth */}
          <div className="absolute flex flex-col text-left max-w-[750px] top-[12%] -right-[37%]">
            <div className="flex justify-end gap-5">
              <div className="size-[60px] flex justify-center items-center text-[#57F0CD] rounded-full font-lato bg-black font-extrabold text-2xl">
                7
              </div>
              <div>
                <p className="text-[36px] font-extrabold uppercase max-w-[420px] leading-[44px] ml-6">
                  Even More Community Growth
                </p>

                <p className="text-xl font-normal max-w-[400px] ml-[71px]">
                  Focus on expanding the community, developing the website, and
                  initiating presale marketing.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Roadmap;
