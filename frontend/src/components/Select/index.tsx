import React from "react";
import classNames from "classnames";

type OptionType = {
  label: string;
  value: any;
};

interface Props extends React.SelectHTMLAttributes<HTMLSelectElement> {
  options: OptionType[];
  className?: string;
  onSelect?: (value: any) => void;
};

export default function Select({ options, className, onSelect }: Props) {
  const handleSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = event.target.value;
    console.log("handleSelect: ", selectedValue);
    onSelect && onSelect(selectedValue);
  };

  return (
    <div className={classNames("relative", className)}>
      <select
        className="block w-full py-2 px-4 pr-6 border min-w-[160px] border-gray-300 bg-white rounded-[10px] shadow-sm focus:outline-none focus:border-blue-500 appearance-none"
        onChange={handleSelect}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>

      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
        <svg
          className="h-4 w-4 fill-current"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
        >
          <path d="M10 12l-5-5 1.5-1.5L10 9l3.5-3.5L15 7z" />
        </svg>
      </div>
    </div>
  );
}
