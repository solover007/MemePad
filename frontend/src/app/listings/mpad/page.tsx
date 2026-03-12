"use client";

import TokenDetailsPage from "@/components/TokenDetailsPage/TokenDetailsPage";
import { Web3Provider } from "@/components/TokenDetailsPage/contexts/Web3Context";

// type TokenProps = { params: { id: string } };

const TokenDetailsPageLayout = () => {
  // const { id } = params;

  if (typeof window !== "undefined") {
    window.location.href = "/";
  }
  
  const id = process.env.NEXT_PUBLIC_MPAD_TOKEN || "mpadYYmm4W8xwTweM9QCpN3xBsrDwGkmuVq5iKBQoiB";
  
  return (
    <Web3Provider>
      <TokenDetailsPage id={id} />
    </Web3Provider>
  );
};
export default TokenDetailsPageLayout;
