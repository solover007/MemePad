import { useContext } from "react";
import TokenStatusCards from "../TokenStatusCards/TokenStatusCards";
import Web3Context from "../contexts/Web3Context";
import TokenInfo from "./TokenInfo/TokenInfo";
import { ITokenMetadata } from "@/components/LaunchpadPage/LaunchpadSection";

const TokenDetailsSection = ({ token }: { token: ITokenMetadata }) => {
  const {
    presaleData: { tokenName, symbol },
  } = useContext(Web3Context);

  return (
    <div className="max-w-[1300px] grid grid-cols-1 gap-6 mx-auto -mt-[420px] lg:grid-cols-6  overflow-hidden w-full">
      {/* Left column */}
      <TokenInfo token={token} />

      {/* Right column */}

      <TokenStatusCards />
    </div>
  );
};
export default TokenDetailsSection;
