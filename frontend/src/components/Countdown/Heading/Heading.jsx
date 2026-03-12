import { LogoPurpleText } from "@/public/icons/LogoPurpleText";
import { WHITEPAPER_URL } from "@/lib/utils/constants";

import Counter from "../Counter/Counter";
import PinkButton from "../PinkButton/PinkButton";

const Heading = () => {
  return (
    <div className="md:flex items-start justify-between z-[100] relative">
      <div className="hidden md:block">
        <LogoPurpleText />
      </div>

      {/* header for mobile view only */}
      <div className="md:hidden flex items-center justify-between relative z-[100]">
        <LogoPurpleText />
        <button className="relative z-[100]">
          <PinkButton text="whitepaper" url={WHITEPAPER_URL} />
         
        </button>
      </div>

    
    
    <Counter />
    
     

    

      {/* whitepaper button for desktop */}
      <button className="hidden md:block">
        <PinkButton text="whitepaper" url={WHITEPAPER_URL} />
      </button>
    </div>
  );
};
export default Heading;
