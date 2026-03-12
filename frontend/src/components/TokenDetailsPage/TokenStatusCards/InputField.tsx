import React, { useState } from "react";

export default function InputField({
  token,
  label,
  value,
  setValue,
  hint,
  isInput = false,
  backgroundColor = "#eeeeee",
  showPriceHint = false,
  isNumberInput = false,
  minPurchase = 0,
  maxPurchase = Infinity,
}: {
  token: string;
  label: string;
  value: string;
  setValue: (value: string) => void;
  hint: string;
  isInput?: boolean;
  backgroundColor?: string;
  showPriceHint?: boolean;
  isNumberInput?: boolean;
  minPurchase?: number;
  maxPurchase?: number;
}) {
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value

    if (isNumberInput) {
      // Validate if the new value is a valid number
      const numberValue = parseFloat(newValue);
      if (!newValue.length) {
        setValue("1");
      }
      else if (isNaN(numberValue)) {
        setError("Invalid number");
        return;
      } else if (numberValue < minPurchase) {
        // console.log("MIN", minPurchase);
        // setError(`Min amount is ${minPurchase}`);
	setValue(minPurchase.toString())
        return;
      } else if (maxPurchase && numberValue > maxPurchase) {
        setError(`Max amount is ${maxPurchase}`);
        return;
      } else {
        setError("");
      }
    }

    setValue(newValue);
  };

  const handleBlur = () => {
    if (isNaN(parseFloat(value)) || !value.length) 
    {
      setValue(minPurchase.toString())
    }
    setError("")   
  }

  return (
    <div
      className={`flex flex-col w-full border px-5 pt-5 border-black `}
      style={{ backgroundColor }}
    >
      <div className="flex-1 flex items-center justify-between select-none">
        <div className="flex items-center gap-3">
          <p className="border-r border-gray-400 pr-3 font-medium min-w-20">
            {token}
          </p>
          <p className="text-[#949494] nowrap">{label}</p>
        </div>
        {isInput ? (
          <div className="flex flex-1 items-center justify-end">
            {showPriceHint && <p className="text-[#949494]">${hint}</p>}
                <input
                  type={isNumberInput ? "number" : "text"}
                  className="font-bold text-2xl text-[#323232] outline-none text-right max-w-24 pl-2"
                  value={value}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  style={{ backgroundColor, width: `${value.length + 2}ch` }}
                />
          </div>
         ) : (
            <div className="font-bold text-2xl text-[#323232] flex-1 max-w-36 overflow-hidden text-right">{value}</div>
          )}
      </div>
      {error ? <div className="text-red-500 text-sm h-5 text-right">{error}</div> : <div className="h-5"/>}
    </div>
  );
}
