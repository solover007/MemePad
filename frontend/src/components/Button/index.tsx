"use client";

import React, { CSSProperties, useState } from "react";
import Icons from "../Icons";

type Props = {
  color?: string;
  borderColor?: string;
  text?: string;
  width?: number;
  height?: number;
  textStyle?: CSSProperties;
  className?: string;
};

export default function Button({
  color = "white",
  text,
  width = 186,
  height = 75,
  textStyle,
  borderColor = "black",
  className = "",
}: Props) {
  const [isHover, setIsHover] = useState(false);

  return (
    <button
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
      className={className}
    >
      <div className="relative text-center">
        <div
          className={`flex justify-center items-center absolute transition-all duration-300 ${
            isHover ? "top-0" : "-top-2"
          }`}
        >
          <Icons.Button
            style={{
              color,
            }}
            width={width}
            height={height}
            borderColor={borderColor}
          />

          <span
            className="text-[24px] font-broad text-black absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
            style={textStyle}
          >
            {text}
          </span>
        </div>

        <Icons.Button className={`text-black`} width={width} height={height} />
      </div>
    </button>
  );
}
