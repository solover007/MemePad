import React from "react";
import Ape1 from "./Ape1.png";
import Ape2 from "./Ape2.png";
import Image from "next/image";

export default function TwoApes() {
  return (
    <div className="relative w-full h-full flex items-center gap-6 justify-between -mt-10 z-[50]">
      <div className="relative w-1/2">
        <Image
          width={500}
          height={500}
          src={Ape1}
          alt="ape 1"
          className="w-full"
        />
      </div>
      <div className="relative w-1/2" style={{ marginTop: "auto" }}>
        <Image
          width={500}
          height={500}
          src={Ape2}
          alt="ape 2"
          className="w-full"
        />
      </div>
    </div>
  );
}
