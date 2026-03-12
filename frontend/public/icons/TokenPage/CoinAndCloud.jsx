/* eslint-disable react/prop-types */
import Image from "next/image";
import coinAndCloudImg from "./cloudAndCoin.png";
const CoinAndCloud = ({ className }) => {
  return (
    <Image
      width={500}
      height={500}
      className={className}
      src={coinAndCloudImg}
      alt="cloud and coin"
    />
  );
};
export default CoinAndCloud;
