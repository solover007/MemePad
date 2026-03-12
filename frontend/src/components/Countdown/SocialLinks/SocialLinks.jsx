// import Email from "./Email";
import { useWallet } from "@solana/wallet-adapter-react";
import Telegram from "./Telegram";
import Twitter from "./Twitter";


import {  WalletMultiButton } from "@solana/wallet-adapter-react-ui";

const SocialLinks = () => {
  const { publicKey } = useWallet();
  return (
    <div className={`flex items-center mt-3 z-50 ${publicKey ? "md:justify-between" : "md:justify-end"}`}>

        {/* connect wallet */}
        {
          publicKey &&  <div className="hidden md:block">
          <WalletMultiButton/>
          </div>
        }
     
     <div className="flex items-center justify-center w-full md:w-auto gap-4 md:gap-10 z-50">
     <Twitter />
      <Telegram color="black" />
     </div>
      {/* <Email /> */}
    </div>
  );
};
export default SocialLinks;
