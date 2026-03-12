"use client";

import { COMPLETE_LIST, ONGOING_LIST, UPCOMING_LIST } from "@/lib/utils/constants";
import Carousel from "../Carousel";
import DashboardItem from "./DashboardItem";
import LaunchPadItem from "../LaunchpadPage/LaunchPadItem";

export const DashboardListingSection = () => {
  const SLIDES_ACTIVE = ONGOING_LIST?.map((item) => (
    <div key={item.id} className="mx-2">
      <LaunchPadItem item={item} />
    </div>
  ));

  const SLIDES_UPCOMING = UPCOMING_LIST?.map((item) => (
    <div key={item.id} className="mx-2">
      <LaunchPadItem key={item.id} item={item} />
    </div>
  ));

  return (
    <div
      className="bg-white pb-11 pt-9 lg:py-8 px-6 rounded-[0.188rem] flex flex-col space-y-10 lg:w-80 lg:h-full"
      style={{ boxShadow: "0px 12px 0px 0px #4B2ED1" }}
    >
      <div className="flex flex-col min-h-[279px] lg:min-h-80">
        <p className="text-2xl leading-6 font-broad">MPAD CHaRT</p>
        <div className="flex flex-col flex-grow h-full w-full justify-center items-center">
          <p className="font-broad font-medium">CoMING SooN</p>
        </div>
      </div>
      <div>
        <p className="text-2xl leading-6 mb-6 font-broad">ACTIVE LISTING</p>
        <Carousel slides={SLIDES_ACTIVE} isSlickArrow />
      </div>
      <div>
        <p className="text-2xl leading-6 mb-6 font-broad">UPCOMING LISTING</p>
        <Carousel slides={SLIDES_UPCOMING} isSlickArrow />
	{/* <p className="font-broad text-center">COMING SOON</p> */}
      </div>
    </div>
  );
};
