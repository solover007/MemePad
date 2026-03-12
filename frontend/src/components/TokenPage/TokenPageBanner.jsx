import { toast } from "react-toastify";
import CoinAndCloud from "../../../public/icons/TokenPage/CoinAndCloud";
import Header from "../../components/Header";
import MpadButton from "./MpadButton";
import TokenCard from "./TokenCard";
import FlagButton from "../Buttons/FlagButton";

const dummyData = [
  {
    id: 1,
    name: "Total Supply",
    iconName: "warning",
    amount: "10,000,000",
  },
  {
    id: 2,
    name: "FDV",
    iconName: "rocket",
    amount: "5,000,000",
  },
  {
    id: 3,
    name: "Blockchain",
    iconName: "solana",
    amount: "Solana",
  },
  {
    id: 4,
    name: "Sale Allocation",
    iconName: "warning",
    amount: "7%%",
  },
  {
    id: 5,
    name: "Circulating Supply",
    // iconName: "rocket",
    amount: "7%",
  },
  {
    id: 6,
    name: "Launch Market Cap",
    // iconName: "solana",
    amount: "$355,000",
  },
  {
    id: 7,
    name: "Price",
    iconName: "warning",
    amount: "$0.50",
  },
  {
    id: 8,
    name: "Volume",
    iconName: "rocket",
    amount: "-",
  },
  {
    id: 9,
    name: "Holders",
    iconName: "solana",
    amount: "250",
  },
];

const TokenPageBanner = () => {
  return (
    <div className="relative z-30 bg-[#6C4FF8] bg-center bg-no-repeat object-contain mx-4 rounded-3xl mt-4 border-[3px] border-black overflow-hidden bg-token-banner-mobile md:bg-top md:bg-token-banner md:bg-cover justify-center items-center">
      {/* navbar */}
      <Header color="white" />

      {/* hero section */}
      <div className="relative z-40 flex flex-col m-auto px-10 items-center justify-between max-w-7xl my-20 lg:flex-row">
        {/* container one */}
        <div className="ml-7 md:ml-0">
          <div>
            <h1 className="font-broad font-bold text-white tracking-wider md:text-stroke-1-inherit text-5xl mb-4 md:leading-[55px]">
              $MpAD IDo <br /> CoMMUNITY PReSALE
            </h1>

            <h4 className=" text-white text-sm md:text-xl">
              The $MPAD community sale features 2 million <br /> tokens priced
              between $0.40 & $0.50.
            </h4>
          </div>
          <div className="mt-9 md:mt-14">
            <FlagButton
              bgColor="bg-[#FFFFFF]"
              // toast="Sit tight, coming soon you DEGEN"
              href="/listings/mpad"
            >
              <p className="font-broad text-[#452BC0] ml-4 text-[1.1em] font-extrabold mr-4 whitespace-nowrap">
                BUY $MPAD TOKens
              </p>
            </FlagButton>

            <h5 className="text-[#B6B6B6] text-sm w-[80%] md:w-full md:text-xl mt-4">
              Click button above to access the MPAD presale on SOL.
            </h5>
          </div>
        </div>

        {/* container two */}
        <div className="grid gap-3 grid-cols-2 md:grid-cols-3 mt-12 lg:mt-0">
          {dummyData?.map((data) => (
            <TokenCard key={data.id} data={data} />
          ))}
        </div>
      </div>

      {/* coin and cloud background right corder asset */}
      <CoinAndCloud className="absolute z-50 w-64 bottom-0 right-0" />
      {/* background asset */}
      {/* <BannerBg className="absolute w-full left-0 top-0" /> */}
    </div>
  );
};
export default TokenPageBanner;
