import { CSSProperties } from "react";

type Props = {
  angle?: number;
  image?: string;
  children?: React.ReactNode;
  shadowColor?: string;
  className?: string;
  strokeSize?: number;
};

export default function Box({
  angle,
  image,
  strokeSize = 8,
  className = "",
  shadowColor = "black",
  children,
}: Props) {
  let style: CSSProperties = {
    boxShadow: `${strokeSize}px ${strokeSize}px ${shadowColor}`,
  };

  if (angle) {
    style["transform"] = `rotate(${angle}deg)`;
  }

  if (image) {
    style["backgroundImage"] = `url(${image})`;
    style["backgroundSize"] = "cover";
    style["backgroundPosition"] = "center";
    style["backgroundRepeat"] = "no-repeat";
  }

  return (
    <div
      style={style}
      id="box"
      className={`${className} flex items-center justify-center select-none`}
    >
      {children}
    </div>
  );
}
