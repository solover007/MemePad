'use client';

import { Dashboard } from "@/components/DashboardPage/Dashboard";
import Overlay from "@/components/Overlay";
import { useAuth } from "@/lib/providers/AuthProvider";

const DashboardPageLayout = () => {
  const { isLoggedIn } = useAuth();

  if (!isLoggedIn && typeof window !== "undefined") {
    window.location.href = "/";
  }

  const isHidden = false;

  return (
    <>
      <Dashboard />
      {isHidden && <Overlay />}
    </>
  );
};
export default DashboardPageLayout;
