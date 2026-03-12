import Image from "next/image";
import MobileMenu from "../MobileMenu";
import { useWallet } from "@solana/wallet-adapter-react";

export const DashboardAddressSection = () => {
  const { publicKey } = useWallet();

  return (
    <div
      className="bg-white rounded-[0.188rem] flex lg:space-x-[13px] justify-between items-center min-h-[51px]"
      style={{ boxShadow: "0px 9px 0px 0px #4B2ED1" }}
    >
      <Image
        className="rounded-tl-[0.188rem]"
        width={52}
        height={51}
        src="/images/avt-user.png"
        alt="avt-user"
      />
      <p className="text-base font-broad lg:pr-[9px] truncate w-60 uppercase">
        {publicKey?.toString()}
      </p>
      <MobileMenu className="h-[15px] lg:hidden" color="black" />
    </div>
  );
};
