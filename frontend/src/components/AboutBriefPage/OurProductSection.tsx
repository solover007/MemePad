"use client";

import React from "react";

import OurProductSectionDesktop from "../OurProductSectionDesktop";
import OurProductSectionMobile from "../OurProductSectionMobile";

export default function OurProductSection() {
  return (
    <>
      {/* Our Product Section for Desktop */}
      <div className="-mt-8">
        <OurProductSectionDesktop />
      </div>

      {/* Our Product Section for Mobile */}
      <OurProductSectionMobile />
    </>
  );
}
