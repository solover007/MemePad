"use client";

import TokenDetailsPage from "@/components/TokenDetailsPage/TokenDetailsPage";
import { Web3Provider } from "@/components/TokenDetailsPage/contexts/Web3Context";

// type TokenProps = { params: { id: string } };
type TokenProps = { params: { id: string } };

const TokenDetailsPageLayout = ({ params }: TokenProps) => {
  const { id } = params;
  // const { id } = params;

  // const id = "mpadYYmm4W8xwTweM9QCpN3xBsrDwGkmuVq5iKBQoiB";

  return (
    <Web3Provider>
      <TokenDetailsPage id={id} />
    </Web3Provider>
  );
};
export default TokenDetailsPageLayout;
