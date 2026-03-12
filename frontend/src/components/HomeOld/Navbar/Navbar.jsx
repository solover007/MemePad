// import {
//   WalletDisconnectButton,
//   useWalletModal,
// } from "@solana/wallet-adapter-react-ui";



import NavPinkButton from "./NavPinkButton";
import NavRoutes from "./NavRoutes";
// import { useWallet } from "@solana/wallet-adapter-react";
import LogoWhiteText from "@/public/icons/LogoWhiteText";
import { WHITEPAPER_URL } from "@/lib/utils/constants";
import PinkButton from "../../Countdown/PinkButton/PinkButton";

// import css


const Navbar = () => {
  // const { setVisible } = useWalletModal();
  // const { publicKey } = useWallet();
  return (
    <div className="md:flex items-center justify-between z-[100] relative px-12 pt-8">
      {/* logo */}
      <div className="hidden md:flex items-center gap-9">
        <LogoWhiteText />

        {/* nav routes */}
        <NavRoutes color="white" />
      </div>

      {/* header for mobile view only */}
      <div className="md:hidden flex items-center justify-between relative z-[100]">
        <LogoWhiteText />
        <button className="relative z-[100]">
          <PinkButton text="whitepaper" url={WHITEPAPER_URL} />
        </button>
      </div>

      {/* whitepaper button for desktop */}
      {/* <div className="hidden md:flex items-center gap-12">
        {publicKey ? (
          <div className="hidden md:block">
            <WalletDisconnectButton className="disconnect-button"></WalletDisconnectButton>
          </div>
        ) : (
          <button
            onClick={() => setVisible(true)}
            className="text-white text-stroke-1-white font-broad"
          >
            CONNeCT WALLET
          </button>
        )}

      </div> */}
        <NavPinkButton text="WHITePAPER" url={WHITEPAPER_URL} />
    </div>
  );
};
export default Navbar;
