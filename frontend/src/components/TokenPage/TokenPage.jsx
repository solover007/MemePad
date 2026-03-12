"use client";
import TopBanner from "../Shared/TopBanner";
import DudeDiligenceSection from "./DudeDiligenceSection";
import TokenPageBanner from "./TokenPageBanner";
import useDetectScroll from "@smakss/react-scroll-direction";

const TokenPage = () => {
  const { scrollDir, scrollPosition } = useDetectScroll();

  return (
    <div className="mx-auto">
      <div
        className={`${
          scrollPosition.top > 160 ? "translate-y-0" : "translate-y-36"
        } w-full px-4 fixed bottom-[30px] z-[100] duration-700 transition-all`}
      >
        <TopBanner />
      </div>
      <div className="mx-4">
        <TopBanner />
      </div>

      <TokenPageBanner />
      <DudeDiligenceSection />
    </div>
  );
};

export default TokenPage;
