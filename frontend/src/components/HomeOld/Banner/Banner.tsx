import GroupLines from "../../../../public/icons/GroupLines";
import Ape from "../../../../public/icons/Ape";
import BannerText from "./BannerText";
import BannerRectangleBg from "../../../../public/icons/BannerRectangleBg";
import Navbar from "../Navbar/Navbar";

const Banner = () => {
  return (
    <div className="relative h-full overflow-hidden">
      <Navbar />
      <div className="mt-28">
        <BannerText />
        <Ape className="absolute w-[43%] max-h-[700px] lg:-bottom-[5%] xl:right-[0%] xl:bottom-[0%] 2xl:-bottom-[4.4%] lg:-right-[2.5%] 2xl:-right-[2.3%]" />
      </div>
      {/* background lines */}
      <GroupLines className="absolute top-0 left-0" />
      {/* banner rectangle bg */}
      <BannerRectangleBg className="w-[400px] bottom-0 md:top-[26%] -left-[5%] absolute lg:-bottom-[5%] xl:-bottom-[4.5%] lg:w-1/2 xl:-left-8 2xl:-bottom-[4.5%]" />
    </div>
  );
};
export default Banner;
