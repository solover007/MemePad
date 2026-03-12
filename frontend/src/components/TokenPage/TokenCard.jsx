/* eslint-disable react/prop-types */
import RocketIcon from "../../../public/icons/TokenPage/RocketIcon";
import SolanaIcon from "../../../public/icons/TokenPage/SolanaIcon";
import WarningIcon from "../../../public/icons/TokenPage/WarningIcon";

const TokenCard = ({ data }) => {
  return (
    <div className="flex flex-col bg-black border border-white text-white pl-3 py-3 w-[170px] h-[130px]">
      {/*icon  */}
      {data?.iconName === "rocket" ? (
        <RocketIcon className="w-7" />
      ) : data?.iconName === "warning" ? (
        <WarningIcon className="w-6" />
      ) : data?.iconName === "solana" ? (
        <SolanaIcon className="w-7" />
      ) : null}

      <p className="mt-2 font-bold uppercase">{data?.name}</p>
      <h6 className="text-xl mt-4">{data?.amount}</h6>
    </div>
  );
};
export default TokenCard;
