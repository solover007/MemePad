"use client";

import React from "react";
import "./FlagButton.scss";
import { toast as _toast } from "react-toastify";
import classNames from "classnames";

interface FlagButtonProps {
  bgColor?: string;
  style?: React.CSSProperties;
  className?: string;
  innerClassName?: string;
  onClick?: () => void;
  children?: React.ReactNode;
  shadow?: boolean;
  shadowWhite?: string;
  toast?: string;
  href?: string;
  target?: string;
}

const FlagButton: React.FC<FlagButtonProps> = ({
  bgColor = "bg-[#d89bff]",
  style,
  className = "",
  innerClassName = "",
  onClick,
  shadow,
  toast,
  children,
  href,
  shadowWhite,
  target = "_blank",
}) => {
  return (
    <button
      className={"relative " + className}
      onClick={() => {
        if (onClick) onClick();
        if (toast) _toast(toast);
        if (href) window.open(href, target);
      }}
    >
      {/* Wrapper div for the shadow */}
      <div
        className={`flag-button ${
          shadow ? "flag-button-shadow" : "flag-button-hover-shadow"
        } ${
          shadowWhite
            ? "flag-button-shadow-white"
            : "flag-button-hover-shadow-white"
        }`}
      >
        {/* Button itself */}
        <div className={`flag-button-wrapper relative bg-black rounded-sm`}>
          <div
            style={{ ...style }}
            className={classNames(
              `${bgColor} flag-button-inner flex flex-row justify-center items-center pr-4 lg:pr-10 lg:pl-4 py-1 lg:py-3 min-w-[12rem] lg:min-h-14 rounded-sm relative`,
              innerClassName
            )}
          >
            {children}
          </div>
        </div>
      </div>
    </button>
  );
};

export default FlagButton;
