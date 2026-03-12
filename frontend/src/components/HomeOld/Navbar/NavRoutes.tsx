"use client";

import { links } from "@/components/Header";
import Link from "next/link";

const NavRoutes = ({ color }: { color: string }) => {
  return (
    <div
      className={`text-${color} z-40 opacity-80 flex items-center gap-6 font-broad mt-2`}
    >
      {links.map((route, index) => (
        <Link
          className="hover:font-bold hover:cursor-pointer"
          key={index}
          href={route.href}
        >
          {route.name}
        </Link>
      ))}
    </div>
  );
};

export default NavRoutes;
