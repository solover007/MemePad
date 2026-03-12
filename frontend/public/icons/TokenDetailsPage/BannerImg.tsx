/* eslint-disable react/prop-types */
import headerImg from "./TokenDetailsBanner.png";

const BannerImg = ({ className, src }: { className?: string, src?: string }) => {
  // @ts-ignore
  return <img className={`object-cover ${className}`} src={src} alt="banner image" />;
};

export default BannerImg;
