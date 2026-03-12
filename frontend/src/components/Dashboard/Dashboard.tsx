import React from "react";

import Sidebar from "./Sidebar";
import Header from "../Header";

export default function Dashboard({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-screen overflow-hidden bg-[#9173FF] bg-dashboard-token-listing bg-center bg-no-repeat bg-cover">
      <div className="relative w-full h-full p-4 pr-8 flex gap-6">
        <Sidebar />

        <div className="flex-grow flex overflow-y-auto flex-col pr-6">
          {children}
        </div>
      </div>
    </div>
  );
}
