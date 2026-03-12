import useCountDown from "@/lib/hooks/useCountDown";
import { PINK_SALE_STARTS } from "@/lib/utils/constants";

const Timer = ({ textSize, cardWidth, cardHeight, cardTextSize }) => {
  const { days, hours, minutes, seconds } = useCountDown(PINK_SALE_STARTS);
  const timer = [days, hours, minutes, seconds];
  return (
    <div>
      <h1
        className={`text-white uppercase font-lato mb-5 text-${textSize} font-bold z-50 relative`}
      >
        <span className="text-[#DE9CFD]"> pink sale</span> starts in:
      </h1>
      {/* timer */}
      <div className="relative z-50 flex flex-col items-start mt-4">
        <div className="flex items-center gap-5">
          {timer?.map((item, idx) => (
            <div key={idx} className="relative">
              {/* backdrop */}
              <div
                className={`bg-white w-16 h-20  md:w-${cardWidth} md:h-${cardHeight} absolute -top-[6px] right-[6px] flex items-center justify-center border-2 border-black`}
              >
                <h3 className="text-[#C06FE5] text-5xl font-medium font-peanut">
                  {item}
                </h3>
              </div>
              <div
                className={` bg-white w-16 h-20 md:w-${cardWidth} md:h-${cardHeight}`}
              ></div>
              <p className="uppercase text-white text-xs text-center mt-3">
                {idx === 0
                  ? "Days"
                  : idx === 1
                  ? "Hours"
                  : idx === 2
                  ? "Minutes"
                  : "Seconds"}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default Timer;
