import React from "react";
import Icons from "../Icons";
import Link from "next/link";
import ConnectButton from "../ui/ConnectButton";

const DashboardIcon = () => (
  <div className="size-[28px] flex items-center justify-center bg-[#5865F2] rounded-full">
    <img src="/icons/CreateListing/dashboard.svg" alt="dashboard" />
  </div>
);

const CreateListingIcon = () => (
  <div className="size-[28px] flex items-center justify-center bg-white rounded-full">
    <img src="/icons/CreateListing/create-listing.svg" alt="create listing" />
  </div>
);

const SIDEBAR_MENU = [
  {
    name: "Dashboard",
    link: "/dashboard",
    isSelected: false,
    icon: <DashboardIcon />,
  },
  {
    name: "Creating Listing",
    link: "/create-listing",
    isSelected: true,
    icon: <CreateListingIcon />,
  },
];

export default function Sidebar() {
  return (
    <div
      className="w-1/5 max-w-[256px]"
      style={{
        background:
          "linear-gradient(179.99deg, #0C0A13 60.66%, #A790FE 99.99%)",
      }}
    >
      <div className="bg-gradient-sidebar bg-no-repeat bg-center bg-cover h-full w-full px-4 py-8 flex-grow mb-32">
        <Link href="/">
          <Icons.Logo className="text-white mx-4" />
        </Link>

        <div className="w-full flex flex-col mt-10">
          {SIDEBAR_MENU.map((item) => (
            <div
              key={item.name}
              className={`w-full h-[50px] flex items-center gap-4 font-lato text-[16px] text-white p-4 ${
                item.isSelected ? "bg-[#00B68B]" : "bg-transparent"
              }`}
            >
              {item.icon} <p>{item.name}</p>
            </div>
          ))}
        </div>

        <img
          src="/icons/CreateListing/dice.svg"
          alt="dice"
          className="absolute bottom-[24rem] left-[5rem] z-[100] w-[85px]"
        />

        <img
          src="/icons/CreateListing/monkey-fly.svg"
          alt="monkey fly"
          className="absolute -bottom-[2rem] left-0 z-[100] w-[412px]"
        />
      </div>
    </div>
  );
}
