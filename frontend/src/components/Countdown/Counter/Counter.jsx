import useCountDown from "@/lib/hooks/useCountDown";
import { COUNTDOWN_DATE } from "@/lib/utils/constants";

const Counter = () => {
  const { days, hours, minutes, seconds } = useCountDown(COUNTDOWN_DATE);
  const timer = [days, hours, minutes, seconds];
  return (
    <div className="lg:mr-28 flex flex-col lg:flex-row items-center lg:items-start gap-3 mt-7 lg:mt-0 lg:gap-6">
      {/* heading */}
      <div className="flex items-center justify-center relative gap-2 lg:mr-3 w-full z-50">
        <div className="flex gap-2 uppercase text-center  text-[25px]">
          <h3 className="font-black ">Website</h3>
          <h3 className="lg:absolute top-7 right-2  font-black">live in</h3>
        </div>

        <p className="hidden lg:block lg:absolute top-3 -right-4 text-[25px]  lg:text-[30px] font-extrabold">
          :
        </p>
      </div>

      {/* timer */}
      <div className="flex items-center gap-5 z-50">
        {timer?.map((item, idx) => (
          <div key={idx} className="relative">
            {/* backdrop */}
            <div className="bg-white w-16 h-10 md:w-24 md:h-22 lg:w-[120px] lg:h-[75px] absolute -top-[3px] right-[3px] md:-top-[6px] md:right-[6px] flex items-center justify-center border md:border-2 border-black">
              <h2 className="text-purple text-3xl lg:text-[50px] font-peanut">
                {item || "?"}
              </h2>
            </div>
            <div className="bg-white w-16 h-10 md:w-24 md:h-22 lg:w-[120px] lg:h-[75px] border md:border-2 border-black"></div>
            <p className="uppercase text-xs text-center mt-1 z-50">
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
  );
};
export default Counter;
