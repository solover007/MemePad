"use client";

import ButtonBg from "@/public/icons/TokenPage/ButtonBg";
import toast from "react-hot-toast";

const MpadButton = ({
  text,
  color,
  textColor,
  leftMargin,
  onClick,
  toastMsg,
}: {
  text: string;
  color: string;
  textColor: string;
  leftMargin: string;
  onClick?: () => void;
  toastMsg?: string;
}) => {
  return (
    <button
      className="relative md:mt-0 hover:-translate-y-1 duration-200 hover:shadow-lg"
      onClick={() => {
        if (onClick) {
          onClick();
          return;
        }

        if (toastMsg) {
          toast(toastMsg);
        }
      }}
    >
      <p
        style={{ color: textColor, left: leftMargin }}
        className="absolute z-30  text-stroke-1-inherit font-broad text-xl top-[27%] tracking-widest md:tracking-normal md:top-[24%] md:text-lg"
      >
        {text}
      </p>
      <ButtonBg color={color} className="w-[320px] md:w-[240px]" />
    </button>
  );
};
export default MpadButton;
