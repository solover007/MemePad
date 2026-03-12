"use client";

type TokenProps = { params: { id: string } };

const TokenDetailsPageLayout = ({ params }: TokenProps) => {
  const { id } = params;

  return <p>FUCKOFF {id}</p>;
};

export default TokenDetailsPageLayout;
