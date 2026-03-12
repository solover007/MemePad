"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { OUR_PRODUCT_LIST } from "./HomeNew/HomeNew";
import kingkongfly from "@/public/icons/HomeSectionBrief/kingkongfly.png";
import productBannerOne from "@/public/icons/HomeSectionBrief/Product1.png";
import productBannerTwo from "@/public/icons/HomeSectionBrief/Product2.png";
import productBannerThree from "@/public/icons/HomeSectionBrief/Product3.png";
import productBannerFour from "@/public/icons/HomeSectionBrief/Product5.png";
type Props = {
  className?: string;
};

export default function OurProductSectionDesktop({ className = "" }: Props) {
  const [currentAsset, setCurrentAsset] = useState(productBannerOne);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  const handleImageChange = (id: number) => {
    if (id === 0) {
      setCurrentAsset(productBannerOne);
    } else if (id === 1) {
      setCurrentAsset(productBannerTwo);
    } else if (id === 2) {
      setCurrentAsset(productBannerThree);
    } else if (id === 3) {
      setCurrentAsset(productBannerFour);
    }
  };

  return (
    <div
      id="features"
      className={`bg-home-bg-section-our-product w-full relative hidden lg:block ${className}`}
    >
      <div className="bg-home-bg-section-our-product-title-new bg-no-repeat relative bg-top h-[700px] lg:bg-[length:100%_700px] 2xl:bg-left">
        <motion.div
          initial={{ translateY: -500, opacity: 0 }}
          transition={{
            duration: 2,
          }}
          whileInView={{ translateY: 0, opacity: 1 }}
          viewport={{ once: true }}
        >
          <Image
            width={500}
            height={500}
            alt="current image"
            src={currentAsset}
            className={`absolute -top-[60px] right-0 w-full max-w-[500px] z-50`}
          />
        </motion.div>

        <div className="absolute top-[500px] w-full flex justify-center items-center lg:-mt-10 2xl:-mt-10">
          <div
            className="flex justify-center relative w-[90%] lg:gap-4 xl:gap-8 2xl:gap-[51.82px] 2xl:w-[85%]"
            onMouseLeave={() => setHoveredCard(null)}
          >
            {OUR_PRODUCT_LIST.map((item, idx) => (
              <motion.div
                initial={{ translateY: "200px" }}
                transition={{
                  duration:
                    idx === 0 ? 0.1 : idx === 1 ? 0.2 : idx === 2 ? 0.3 : 0.4,
                }}
                whileInView={{ translateY: "0px" }}
                viewport={{ once: true }}
                onMouseEnter={() => {
                  setHoveredCard(idx);
                  handleImageChange(idx);
                }}
                key={item.id}
                className={`relative h-[270px] w-full mt-[50.32px] cursor-pointer duration-300 ${
                  hoveredCard === idx ? "hover:-mt-2 hover:h-[310px]" : ""
                }`}
              >
                <div
                  className={`w-full h-full shadow-[9.89px_9.89px_0px_0px_#271A5D] transition-all delay-200 preserve-3d duration-700 ${
                    hoveredCard === idx ? "rotate-y-180" : ""
                  }`}
                >
                  <div className="w-full h-full bg-[#303030] flex flex-col justify-center px-6 absolute delay-100 backface-hidden">
                    <p className="font-broad font-[400] text-white lg:text-[52px] lg:leading-[54px] xl:text-[60px] xl:leading-[62px] 2xl:text-[74px] 2xl:leading-[71.19px]">
                      {item.id}
                    </p>
                    <p className="uppercase font-broad font-[400] tracking-[3%] text-white lg:text-[30px] lg:leading-[32px] xl:text-[36px] xl:leading-[38px] 2xl:text-[42px] 2xl:leading-[40.4px]">
                      {item.name}
                    </p>
                  </div>

                  <div
                    style={{ backgroundColor: item.color }}
                    className="w-full h-full flex flex-col justify-center px-6 absolute delay-200 rotate-y-180 backface-hidden overflow-hidden"
                  >
                    <span className="font-lato font-[700] text-white lg:text-[16px] lg:leading[18px] xl:text-[18px] xl:leading[21px] 2xl:text-[21px] 2xl:leading[23.2px]">
                      {item.description}
                      {item.bulletList && (
                        <ul>
                          {item.bulletList.map((item, idx) => (
                            <li className="list-disc ml-6" key={idx}>
                              {item}
                            </li>
                          ))}
                        </ul>
                      )}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
