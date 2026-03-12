"use client";

import Footer from "../Footer";
import Header from "../Header";
import { DashboardAddressSection } from "./DashboardAddressSection";
import { DashboardListingSection } from "./DashboardListingSection";
import { DashboardProgressSection } from "./DashboardProgressSection";
import { DashboardPurchasesSection } from "./DashboardPurchasesSection";
import { DashboardRefferalSection } from "./DashboardRefferalSection";
import { DashboardStakeSection } from "./DashboardStakeSection";

export const Dashboard: React.FC = () => {
  return (
    <>
      {/* Mobile */}
      <div className="bg-dashboard-background-mobile bg-center bg-no-repeat bg-cover bg-[#A393FE] lg:bg-transparent pt-[23px] pb-[45px] px-4 space-y-6 block lg:hidden">
        <DashboardAddressSection />
        <DashboardStakeSection />
        <DashboardListingSection />
        <DashboardRefferalSection />
        <DashboardPurchasesSection />
      </div>

      <div className="hidden lg:block">
        {/* Desktop */}
        <Header color="purple" />

        <div className="dashboard-content px-[1.063rem] py-8 bg-dashboard-background bg-center bg-no-repeat bg-cover bg-[#A393FE] lg:bg-transparent flex space-x-5 justify-center">
          <DashboardListingSection />

          <div className="flex flex-col justify-between space-y-[35.5px]">
            <DashboardStakeSection />
            <DashboardRefferalSection />
            <DashboardPurchasesSection />
          </div>

          <div className="flex flex-col justify-between space-y-[35.5px]">
            <DashboardAddressSection />
            <DashboardProgressSection />
          </div>
        </div>

        <div className="footer-wrapper py-2">
          <Footer isWhite={false} />
        </div>
      </div>
    </>
  );
};
