import RocketIcon from "../../../../public/icons/TokenPage/RocketIcon";

interface Iprop {
  title: string;
  description: string;
}

const ToolSuiteCard = ({ card }: { card: Iprop }) => {
  return (
    <div className="relative">
      {/* backdrop */}

      <div className=" absolute bottom-2 -left-2 text-center flex flex-col items-center justify-center border-[0.01px] border-white rounded-lg p-4 bg-black w-[300px] h-[260px] lg:w-[350px] lg:h-[280px]">
        <RocketIcon className="w-20" />
        <h3 className="text-3xl font-broad font-bold mb-4">{card.title}</h3>
        <p className="text-sm text-[#cecdcd] md:text-base">
          {card.description}
        </p>
      </div>
      <div className=" rounded-lg bg-white w-[300px] h-[260px] lg:w-[350px] lg:h-[280px]" />
    </div>
  );
};
export default ToolSuiteCard;
