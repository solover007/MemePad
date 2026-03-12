import Image from "next/image";
import eye from "./eye.png";
const Eye = ({ className }: { className: string }) => {
  return (
    <Image className={className} width={500} height={500} src={eye} alt="eye" />
  );
};
export default Eye;
