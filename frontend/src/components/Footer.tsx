"use client";
import React from "react";
import Link from "next/link";

import Icons from "./Icons";

import {
  EMAIL,
  PURPLE_PRIMARY_COLOR,
  TG_USERNAME,
  TWITTER_USERNAME,
} from "../lib/utils/constants";
import { links } from "./Header";

type Props = {
  className?: string;
  isWhite?: boolean;
};

export const SOCIALS = [
  {
    icon: Icons.X,
    name: TWITTER_USERNAME,
    link: "https://twitter.com/MemePadSol",
  },
  {
    icon: Icons.Message,
    name: EMAIL,
    link: "mailto:" + EMAIL,
    isMail: true,
  },
  {
    icon: Icons.Telegram,
    name: TG_USERNAME,
    link: "https://t.me/Memepad_Community",
  },
];

const FooterLink = ({
  href,
  label,
  isWhite,
  target = "_self",
}: {
  href: string;
  label: string;
  isWhite: boolean;
  target?: string;
}) => (
  <Link
    className={`${
      isWhite ? "text-white" : "text-black"
    } cursor-pointer hover:font-bold`}
    href={href}
    target={target}
  >
    {label}
  </Link>
);

const SocialItem = ({
  item,
  isWhite,
}: {
  item: (typeof SOCIALS)[0];
  isWhite: boolean;
}) => {
  const Icon = item.icon;
  return (
    <a
      href={item.link}
      target={item.isMail ? undefined : "_blank"}
      rel={item.isMail ? undefined : "noopener noreferrer"}
    >
      <div
        className={`flex items-center gap-1 transition-all duration-200 hover:text-[${PURPLE_PRIMARY_COLOR}] md:gap-2 ${
          isWhite ? "text-white" : "text-black"
        }`}
      >
        <Icon className={`w-[15px] h-[15px] lg:w-[34px] lg:h-[34px]`} />
        <p className="font-medium text-[11px] lg:text-[18px]">{item.name}</p>
      </div>
    </a>
  );
};

export default function Footer({ className = "", isWhite = true }: Props) {
  return (
    <div
      className={`relative w-full mx-auto overflow-hidden flex justify-center items-center h-fit p-4 ${className}`}
    >
      <div className="w-[90%] flex items-center justify-between gap-4 flex-col min-[1750px]:flex-row">
        {/* Links */}
        <div className="flex flex-row flex-wrap justify-center items-center font-broad text-center text-white text-[14px] gap-6 lg:gap-8 lg:text-[18px] lg:flex lg:items-center">
          {links.map((link, index) => (
            <FooterLink
              key={index}
              href={link.href}
              label={link.name}
              isWhite={isWhite}
              target={link.target}
            />
          ))}
        </div>

        {/* Socials */}
        <div className="flex items-center justify-center gap-4 md:gap-8 flex-wrap">
          {SOCIALS.map((item, index) => (
            <SocialItem key={index} item={item} isWhite={isWhite} />
          ))}
        </div>
      </div>
    </div>
  );
}
