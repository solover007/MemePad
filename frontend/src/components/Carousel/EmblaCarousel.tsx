"use client";

import React, { useEffect, useRef } from "react";
import { EmblaOptionsType } from "embla-carousel";
import {
  PrevButton,
  NextButton,
  usePrevNextButtons,
} from "./EmblaCarouselArrowButtons";
import useEmblaCarousel from "embla-carousel-react";
import classNames from "classnames";
import {
  NextButtonSlick,
  PrevButtonSlick,
} from "./EmblaCaroselSlickArrowButtons";

type PropType = {
  slides: number[];
  options?: EmblaOptionsType;
  className?: string;
  isShowArrow?: boolean;
  isSlickArrow?: boolean;
  isScrollVersion?: boolean;
  autoScroll?: boolean;
  autoScrollDuration?: number; // in milliseconds
  slidesToShow?: number; // number of slides to show
};

const EmblaCarousel: React.FC<PropType> = (props) => {
  const {
    slides,
    options,
    className = "",
    isShowArrow = true,
    isScrollVersion = false,
    isSlickArrow = false,
    autoScroll = true,
    autoScrollDuration = 3000, // default to 3 seconds
    slidesToShow = 1, // default to 1 slide shown
  } = props;
  const [emblaRef, emblaApi] = useEmblaCarousel(options);
  const autoScrollInterval = useRef<NodeJS.Timeout | null>(null);

  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
  } = usePrevNextButtons(emblaApi);

  const startAutoScroll = () => {
    if (autoScroll && emblaApi) {
      autoScrollInterval.current = setInterval(() => {
        if (emblaApi) {
          emblaApi.scrollNext();
        }
      }, autoScrollDuration);
    }
  };

  const stopAutoScroll = () => {
    console.log("stopAutoScroll");
    if (autoScrollInterval.current) {
      clearInterval(autoScrollInterval.current);
    }
  };

  useEffect(() => {
    if (emblaApi) {
      startAutoScroll();

      emblaApi.on("init", startAutoScroll);
      emblaApi.on("destroy", stopAutoScroll);
    }

    return () => stopAutoScroll();
  }, [emblaApi, autoScroll, autoScrollDuration]);

  const slideWidth = `${100 / slidesToShow}%`;

  return (
    <section className={`w-full ${className}`}>
      <div
        className="relative w-full overflow-hidden flex flex-col justify-center items-center select-none"
        ref={emblaRef}
      >
        <div
          className="w-full flex touch-pan-y"
          style={{ backfaceVisibility: "hidden" }}
        >
          {slides?.map((slide, index) => {
            if (isScrollVersion) {
              return (
                <div
                  className={classNames(
                    slidesToShow === 1
                      ? `w-full flex-[0_0_calc(100%/1)] z-[100]`
                      : "w-full px-3 flex-[0_0_calc(100%/4)] z-[100]",
                  )}
                  key={index}
                  onClick={() => console.log("CLICKED")}
                  onMouseEnter={stopAutoScroll}
                  onMouseLeave={startAutoScroll}
                >
                  {slide}
                </div>
              );
            }

            return (
              <div
                className={classNames(
                  slidesToShow === 1
                    ? `w-full flex-[0_0_calc(100%)] lg:flex-[0_0_calc(100%/1)]`
                    : "w-full px-3 flex-[0_0_calc(100%)] lg:flex-[0_0_calc(100%/4)] 2xl:flex-[0_0_calc(100%/3)] min-[1920px]:flex-[0_0_calc(100%/4)]",
                )}
                key={index}
              >
                {slide}
              </div>
            );
          })}
        </div>

        {isShowArrow && !isSlickArrow && (
          <div className="flex items-center gap-8 mt-[140px]">
            <PrevButton
              onClick={onPrevButtonClick}
              disabled={prevBtnDisabled}
            />
            <NextButton
              onClick={onNextButtonClick}
              disabled={nextBtnDisabled}
            />
          </div>
        )}

        {isShowArrow && isSlickArrow && (
          <div className="flex justify-center items-center space-x-6 mt-6">
            <PrevButtonSlick
              onClick={onPrevButtonClick}
              disabled={prevBtnDisabled}
            />
            <NextButtonSlick
              onClick={onNextButtonClick}
              disabled={nextBtnDisabled}
            />
          </div>
        )}
      </div>
    </section>
  );
};

export default EmblaCarousel;
