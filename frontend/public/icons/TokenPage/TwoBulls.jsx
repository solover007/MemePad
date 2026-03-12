/* eslint-disable react/prop-types */
import Image from "next/image";
import twoBulls from "./TwoBulls.png";
const TwoBulls = ({ className }) => {
  return (
    <Image
      width={500}
      height={500}
      className={className}
      src={twoBulls}
      alt="two bulls"
    />
  );
};
export default TwoBulls;
