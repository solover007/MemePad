"use client";

import React, { useRef, useState } from "react";
import Icons from "./Icons";
import Link from "next/link";
import { usePathname } from "next/navigation";
import FlagButton from "./Buttons/FlagButton";
import { EMAIL, PURPLE_PRIMARY_COLOR } from "@/lib/utils/constants";
import MobileMenu, { MenuColorType } from "./MobileMenu"; // Import the MobileMenu component
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { useAuth } from "@/lib/providers/AuthProvider";
import ConnectButton from "./ui/ConnectButton";

type LinkItem = {
  name: string;
  href: string;
  subLinks?: LinkItem[];
  target?: string;
  offset?: number;
};

type Props = {
  color: MenuColorType;
};

export const links: LinkItem[] = [
  {
    name: "HoME",
    href: "/",
    subLinks: [
      { name: "LISTINGS", href: "launches" },
      { name: "INVEST", href: "invest" },
      { name: "LAUNCHPAD", href: "launchpad" },
      { name: "TOKENoMICS", href: "tokenomics" },
      { name: "ROADMAP", href: "roadmap" },
      { name: "FEATURES", href: "features" },
      { name: "TOKEN", href: "token" },
      { name: "JOIN", href: "join" },
    ],
  },
  { name: "LAUNCHPAD", href: "/launchpad" },
  { name: "TOKEN", href: "/token" },
  { name: "STAKING", href: "/staking" },
  { name: "MEMBERSHIPS", href: "/memberships" },
  { name: "ABOUT", href: "/about" },
  { name: "AIRDROP", href: "https://airdrop.memepad.ai", target: "_blank" },
];

export default function Header({ color }: Props) {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openSubMenu, setOpenSubMenu] = useState<string | null>(null);
  const menuRef = useRef(null);
  const { login } = useAuth();

  const handleSubLinkClick = (mainPage: string, subLink: string) => {
    if (window.location.pathname !== mainPage) {
      window.location.href = `${mainPage}#${subLink}`;
    } else {
      document.getElementById(subLink)?.scrollIntoView({ behavior: "smooth" });
    }
  };

  const isWhite = color === "white";

  return (
    <header className="sticky flex items-center justify-between p-4 gap-4 z-[500] select-none overflow-x-clip">
      <div className="flex items-center gap-6 xl:gap-[52px]">
        {/* Logo */}
        <Link href="/">
          <Icons.Logo className={`${isWhite ? "text-white" : "text-black"}`} />
        </Link>

        {/* Links */}
        <div
          className={`${
            isWhite ? "text-white" : "text-black"
          } opacity-80 items-center font-broad gap-4 text-sm hidden lg:flex min-[1150px]:text-base xl:gap-8`}
        >
          {links.map((link) => (
            <div key={link.name} className={`relative group `}>
              {link.subLinks ? (
                <>
                  <Link
                    target={link.target || "_self"}
                    className={`${pathname === link.href ? "font-black" : ""}`}
                    href={link.href}
                  >
                    {link.name}
                  </Link>
                  <div className="absolute hidden group-hover:block bg-white shadow-lg rounded text-black">
                    {link.subLinks.map((subLink) => (
                      <span
                        key={subLink.name}
                        className="block p-2 hover:bg-gray-200 cursor-pointer px-2 hover:font-bold"
                        onClick={() =>
                          handleSubLinkClick(link.href, subLink.href)
                        }
                      >
                        {subLink.name}
                      </span>
                    ))}
                  </div>
                </>
              ) : link.href.startsWith("/") ? (
                <Link
                  target={link.target || "_self"}
                  className={`${
                    pathname === link.href ? "font-black" : ""
                  } hover:font-bold`}
                  href={link.href}
                >
                  {link.name}
                </Link>
              ) : (
                <Link
                  target={link.target || "_self"}
                  className="cursor-pointer hover:font-bold "
                  href={link.href}
                >
                  {link.name}
                </Link>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-4 xl:gap-8">
        {/* Socials */}
        <div className="items-center gap-8 hidden z-20 min-[1500px]:flex">
          <a
            href="https://t.me/Memepad_Community"
            target="_blank"
            rel="noopener noreferrer"
            className={`transition-all duration-200 ${
              isWhite ? "text-white" : "text-black"
            } hover:text-[${PURPLE_PRIMARY_COLOR}]`}
          >
            <Icons.Telegram className="w-10 h-10" />
          </a>

          <a
            href="https://twitter.com/MemePadSol"
            target="_blank"
            rel="noopener noreferrer"
            className={`transition-all duration-200 ${
              isWhite ? "text-white" : "text-black"
            } hover:text-[${PURPLE_PRIMARY_COLOR}]`}
          >
            <Icons.X className="w-10 h-10" />
          </a>

          <a
            href={"mailto:" + EMAIL}
            className={`transition-all duration-200 ${
              isWhite ? "text-white" : "text-black"
            } hover:text-[${PURPLE_PRIMARY_COLOR}]`}
          >
            <Icons.Message className="w-10 h-10" />
          </a>
        </div>

        <ConnectButton />

        <FlagButton className="hidden lg:block" href="https://docs.memepad.ai/">
          <p
            className={`font-broad text-xl font-extrabold ${
              isWhite ? "text-white" : "text-black"
            } mr-4 text-sm min-[1150px]:text-base`}
          >
            MeMEPAPER
          </p>
        </FlagButton>

        {/* Menu for Mobile */}
        <MobileMenu color={color} />
      </div>
    </header>
  );
}
