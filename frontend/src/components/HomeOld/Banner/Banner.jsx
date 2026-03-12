import GroupLines from "@/public/icons/GroupLines";
import Ape from "@/public/icons/Ape";
import HeroText from "./HeroText";

import BannerRectangleBg from "@/public/icons/BannerRectangleBg";
import Navbar from "../Navbar/Navbar";

const Banner = () => {
  return (
    <div className="relative h-full overflow-hidden">
      <Navbar />
      <div className="mt-28">
        <HeroText />
        <Ape />
      </div>
      {/* background lines */}
      <GroupLines />
      {/* banner rectangle bg */}
      <BannerRectangleBg />
    </div>
  );
};
export default Banner;
