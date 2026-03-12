import React, { useState, useRef, useEffect } from "react";
import Icons from "./Icons";
import Link from "next/link";
import { links } from "./Header";
import classNames from "classnames";

export type MenuColorType = "white" | "purple" | "black";

type MobileMenuProps = {
  color?: MenuColorType;
  className?: string;
};

const MobileMenu: React.FC<MobileMenuProps> = ({
  color = "black",
  className = "",
}: MobileMenuProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openSubMenu, setOpenSubMenu] = useState<string | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  const getColor = (color: MenuColorType) => {
    if (color === "white") return "text-white";
    if (color === "purple") return "text-[#A393FE]";
    return "text-black";
  };

  const handleSubLinkClick = (mainPage: string, subLink: string) => {
    if (window.location.pathname !== mainPage) {
      window.location.href = `${mainPage}#${subLink}`;
    } else {
      document.getElementById(subLink)?.scrollIntoView({ behavior: "smooth" });
    }
    setIsMenuOpen(false);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
      setIsMenuOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleSubMenu = (name: string) => {
    if (openSubMenu === name) {
      setOpenSubMenu(null);
    } else {
      setOpenSubMenu(name);
    }
  };

  return (
    <div className="relative block lg:hidden" ref={menuRef}>
      <div
        tabIndex={0}
        role="button"
        className="btn bg-transparent border-none"
        onClick={toggleMenu}
      >
        <Icons.MenuMobile className={classNames(getColor(color), className)} />
      </div>
      {isMenuOpen && (
        <ul className="absolute right-0 mt-2 space-y-4 menu p-4 font-broad shadow bg-base-100 rounded-box w-52 z-[1000]">
          {links.map((link) => (
            <div key={link.name} className="relative group">
              {link.subLinks ? (
                <>
                  <div
                    className="flex justify-between items-center"
                    onClick={() => toggleSubMenu(link.name)}
                  >
                    <Link target={link.target || "_self"} href={link.href}>
                      {link.name}
                    </Link>
                    <Icons.ChevronRight
                      className={`transition-transform rotate-90 duration-200 ${
                        openSubMenu === link.name ? "-rotate-90" : ""
                      }`}
                    />
                  </div>
                  {openSubMenu === link.name && (
                    <div className="pl-4">
                      {link.subLinks.map((subLink) => (
                        <span
                          key={subLink.name}
                          className="block p-2 hover:bg-gray-200 cursor-pointer"
                          onClick={() =>
                            handleSubLinkClick(link.href, subLink.href)
                          }
                        >
                          {subLink.name}
                        </span>
                      ))}
                    </div>
                  )}
                </>
              ) : link.href.startsWith("/") ? (
                <Link href={link.href} target={link.target || "_self"}>
                  {link.name}
                </Link>
              ) : (
                <Link
                  className="hover:font-bold hover:cursor-pointer"
                  href={link.href}
                  target={link.target || "_self"}
                >
                  {link.name}
                </Link>
              )}
            </div>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MobileMenu;
