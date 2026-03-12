import ToolSuiteCard from "./ToolSuiteCard";

const dummyCards = [
  {
    id: 1,
    title: "ToKENoMICS",
    description:
      "The MEMEPab Team will help you to correctly structure your Tokenomics strategically and for longetivity.",
  },
  {
    id: 2,
    title: "KoL BAcKING",
    description:
      "MEMEPad is Partnered with some of the best KOLs in the space, giving your project the right push for awareness and reach.",
  },
  {
    id: 3,
    title: "ANGeL'S & Vc'S",
    description:
      "With MEMEPad’s Incubation, you get access to a vast list of VC’s and Angel’s to help kickstart your liquidity.",
  },
  {
    id: 4,
    title: "STrATeGY",
    description:
      "The MEMEPad Team has geniuses from various industries, combining years of experience and strategy into one.",
  },
  {
    id: 5,
    title: "TeCH SUPPoRT",
    description:
      "MEMEPad’s Tech Gurus can assist in supporting, or building your whole project from the ground up to the moon.",
  },
  {
    id: 6,
    title: "MARKeTING",
    description:
      "MEMEPad can assist with your marketing, from strategy, advisory to execution we’re here to take you above and beyond.",
  },
  {
    id: 7,
    title: "BrANDING",
    description:
      "MEMEPad will help you create a unique brand to stand out from the crowd and integrate your narrative into ours.",
  },
  {
    id: 8,
    title: "Advisory",
    description:
      "MEMEPad’s team will continue advising you on your journey post launch to guarantee your success long term.",
  },
];

const ToolSuite = () => {
  return (
    <div className="my-28">
      <h1 className=" font-broad font-bold text-center text-4xl md:text-5xl">
        A TOOLsUITe FoR TOKeEN SALeS
      </h1>
      <p className="text-center text-lg w-[70%] mt-5 mx-auto text-[#a6a6a6]">
        MEMEPad’s infrastructure provides all the tools necessary to build,
        launch, and grow your memecoin project to the moon and beyond.
      </p>
      <div className="flex justify-center">
        <div className="grid  gap-10 mt-16 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
          {dummyCards.map((card) => (
            <ToolSuiteCard key={card.id} card={card} />
          ))}
        </div>
      </div>
    </div>
  );
};
export default ToolSuite;
