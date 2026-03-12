import { PRE_SALE_ADDRESS } from "@/lib/utils/constants";
import WalletAddress from "./WalletAddress";

const SendMoney = () => {
    return(
        <div className="flex flex-col items-center gap-4 my-2 z-30">
        <div className="text-stroke text-darkblue text-3xl uppercase font-extrabold z-50">
          <h3>send money here</h3>
          <h3>you snooze you loose</h3>
        </div>
  
        <div className="md:w-[540px] z-40">
          <WalletAddress address={PRE_SALE_ADDRESS} />
        </div>
      </div>
    )}
export default SendMoney;