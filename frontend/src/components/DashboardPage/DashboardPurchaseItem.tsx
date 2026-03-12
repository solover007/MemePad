import { toast } from "react-toastify";
import FlagButton from "../Buttons/FlagButton";

type DashboardPurchaseItemProps = {
  id: number;
  name: string;
  symbol: string;
  amount: number;
  quote: string;
  amountInUsd: string;
  status: string;
  date: string;
  image: string;
};

export const DashboardPurchaseItem = (props: DashboardPurchaseItemProps) => {
  const { id, name, symbol, amount, quote, amountInUsd, status, date, image } =
    props;

  return (
    <div className="bg-[#876DFF] px-4 py-[27.5px] rounded-[0.188rem] h-[117px] lg:h-[84px] flex justify-between items-center">
      <div className="flex flex-col lg:flex-row lg:w-2/3">
        <div className="flex space-x-2.5 items-center  lg:w-1/2">
          <img className="h-9 w-9" src={image} alt={name} />
          <div className="lg:pr-[50px]">
            <p className="text-base leading-4 font-broad text-white uppercase">
              {name}
            </p>
            <p className="text-xs leading-[14.4px] font-lato text-white text-opacity-50">
              ${symbol}
            </p>
          </div>
        </div>
        <div className="flex space-x-6 mt-4 lg:mt-0 lg:w-1/2 items-center">
          <div className="w-[100px]">
            <p className="text-sm leading-3 lg:text-base lg:leading-4 text-[#ffffff] font-broad">
              {amount} {symbol}
            </p>
            <p className="text-[10px] leading-3 lg:text-xs lg:leading-[14px] text-[#ffffff] font-lato text-opacity-50">
              {date}
            </p>
          </div>
          <div>
            <p className="text-sm leading-3 lg:text-base lg:leading-4 text-[#ffffff] font-broad">
              {amountInUsd} {quote}
            </p>
            <p className="text-[10px] leading-3 lg:text-xs lg:leading-[14px] text-[#ffffff] font-lato text-opacity-50">
              {status}
            </p>
          </div>
          <div>
            <p className="text-sm leading-3 lg:text-base lg:leading-4 text-[#ffffff] font-broad">
              15%
            </p>
            <p className="text-[10px] leading-3 lg:text-xs lg:leading-[14px] text-[#ffffff] font-lato text-opacity-50">
              TGE
            </p>
          </div>
          <div>
            <p className="text-sm leading-3 lg:text-base lg:leading-4 text-[#ffffff] font-broad">
              1 M
            </p>
            <p className="text-[10px] leading-3 lg:text-xs lg:leading-[14px] text-[#ffffff] font-lato text-opacity-50">
              Vesting
            </p>
          </div>
        </div>
      </div>
      <div className="flex flex-col lg:flex-row justify-end space-y-4 lg:space-y-0 lg:space-x-4 lg:items-center lg:w-1/3">
        {/* TODO: enable in the future */}
        {/* <FlagButton */}
        {/*   innerClassName="!min-h-full !h-[33px] !pr-0 !pl-0 !py-0 !min-w-[100px] !w-[100px]" */}
        {/*   style={{ */}
        {/*     background: "linear-gradient(90deg, #F3925B 0%, #FF9E80 100%)", */}
        {/*   }} */}
        {/*   shadow */}
        {/* > */}
        {/*   <p className="text-[13px] font-broad leading-3 tracking-[0.03em] text-white whitespace-nowrap pr-4"> */}
        {/*     STAKE */}
        {/*   </p> */}
        {/* </FlagButton> */}
        <div className="hidden lg:block">
          <FlagButton
            innerClassName="!min-h-full !h-[33px] !pr-0 !pl-0 !py-0 !min-w-[100px] !w-[100px]"
            style={{
              background: "linear-gradient(90deg, #4D7CFE 0%, #799DFF 100%)",
            }}
            onClick={() => {
              toast("Haha not yet you jeeter");
            }}
            shadow
          >
            <p className="text-[13px] font-broad leading-3 tracking-[0.03em] text-white whitespace-nowrap pr-4">
              CLAIM
            </p>
          </FlagButton>
        </div>
      </div>
    </div>
  );
};
