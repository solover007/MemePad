import React, { ChangeEvent } from "react";

interface DurationPickerProps {
  value: string;
  onChange: (value: string) => void;
}

const DurationPicker: React.FC<DurationPickerProps> = ({ value, onChange }) => {
  const parseDuration = (duration: string) => {
    if (!duration) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }

    const regex = /(\d+d)?(\d+h)?(\d+m)?(\d+s)?/;
    const matches = duration.match(regex);
    const days = matches && matches[1] ? parseInt(matches[1], 10) : 0;
    const hours = matches && matches[2] ? parseInt(matches[2], 10) : 0;
    const minutes = matches && matches[3] ? parseInt(matches[3], 10) : 0;
    const seconds = matches && matches[4] ? parseInt(matches[4], 10) : 0;
    return { days, hours, minutes, seconds };
  };

  const handleChange = (unit: keyof ReturnType<typeof parseDuration>) => (e: ChangeEvent<HTMLInputElement>) => {
    const newValue = parseDuration(value);
    newValue[unit] = parseInt(e.target.value, 10) || 0;
    const formattedValue = `${newValue.days}d${newValue.hours}h${newValue.minutes}m${newValue.seconds}s`;
    onChange(formattedValue);
  };

  const duration = parseDuration(value);

  return (
    <div className="flex flex-col gap-2">
      <div className="flex gap-4">
        <div className="flex flex-row gap-2 items-center">
          <input
            type="number"
            value={duration.days}
            onChange={handleChange("days")}
            className="h-[50px] text-[14px] font-lato border border-[#B6B6B6] rounded-md px-2 focus-visible:outline-none"
            min="0"
          />
          <label className="font-lato text-[14px] text-[#4B2ED1] mt-1">Days</label>
        </div>
        <div className="flex flex-row gap-2 items-center">
          <input
            type="number"
            value={duration.hours}
            onChange={handleChange("hours")}
            className="h-[50px] text-[14px] font-lato border border-[#B6B6B6] rounded-md px-2 focus-visible:outline-none"
            min="0"
            max="23"
          />
          <label className="font-lato text-[14px] text-[#4B2ED1] mt-1">Hours</label>
        </div>
        <div className="flex flex-row gap-2 items-center">
          <input
            type="number"
            value={duration.minutes}
            onChange={handleChange("minutes")}
            className="h-[50px] text-[14px] font-lato border border-[#B6B6B6] rounded-md px-2 focus-visible:outline-none"
            min="0"
            max="59"
          />
          <label className="font-lato text-[14px] text-[#4B2ED1] mt-1">Minutes</label>
        </div>
        {/* <div className="flex flex-row gap-2 items-center"> */}
        {/*   <input */}
        {/*     type="number" */}
        {/*     value={duration.seconds} */}
        {/*     onChange={handleChange("seconds")} */}
        {/*     className="h-[50px] text-[14px] font-lato border border-[#B6B6B6] rounded-md px-2 focus-visible:outline-none" */}
        {/*     min="0" */}
        {/*     max="59" */}
        {/*   /> */}
        {/*   <label className="font-lato text-[14px] text-[#4B2ED1] mt-1">Seconds</label> */}
        {/* </div> */}
      </div>
    </div>
  );
};

export default DurationPicker;
