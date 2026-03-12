import React from "react";
import EmblaCarousel from "./EmblaCarousel";

type Props = {
  slides: any[];
  className?: string;
  isShowArrow?: boolean;
  isScrollVersion?: boolean;
  isSlickArrow?: boolean;
  slidesToShow?: number;
  duration?: number;
};

export default function Carousel({
  slides,
  className = "",
  isShowArrow = true,
  isScrollVersion = false,
  slidesToShow = 1,
  isSlickArrow = false,
  duration = 40,
}: Props) {
  return (
    <EmblaCarousel
      slides={slides}
      className={className}
      isShowArrow={isShowArrow}
      isScrollVersion={isScrollVersion}
      slidesToShow={slidesToShow}
      isSlickArrow={isSlickArrow}
      autoScrollDuration={4000}
      options={{ loop: true, duration }}
    />
  );
}
