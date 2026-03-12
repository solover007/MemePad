/* eslint-disable no-unused-vars */


/* eslint-disable react/prop-types */
import { DEX_SITE_URL,  } from "@/lib/utils/constants";
import dexLogo from "@/public/images/dexview.png"

const DexScreener = ({color}) => {
  return (
    <a href={DEX_SITE_URL} target="_blank"  className="z-50 flex items-center gap-1 font-bold hover:cursor-pointer">
    <img className="w-16 md:w-20 rounded-lg" src={dexLogo} alt="" /> 
     
    </a>
  );
};
export default DexScreener;
