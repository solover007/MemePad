import { JOIN_TG } from "@/lib/utils/constants";
import Image from "next/image";

export default function LegendButton() {
  return (
    <a href={JOIN_TG} target="_blank">
      <div className="relative cursor-pointer mt-8 z-[50]">
        <Image
          width={500}
          height={500}
          src="/icons/AboutBrief/btn-im-legend.svg"
          alt="btn-im-legend"
          className="scale-100 w-96 transition-all duration-300 hover:scale-110"
        />
      </div>
    </a>
  );
}
