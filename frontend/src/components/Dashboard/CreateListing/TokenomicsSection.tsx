import React from "react";
import { TokenListingFormData, TokenomicsEntry } from "./types";
import InfoCard from "./InfoCard";
import { NumericFormat, numericFormatter } from "react-number-format";
import FlagButton from "@/components/Buttons/FlagButton";

export default function TokenomicsSection({
  formData,
  setFormData,
}: {
  formData: TokenListingFormData;
  setFormData: (data: TokenListingFormData) => void;
}) {
  const handleTokenomicsChange =
    (index: number, field: keyof TokenomicsEntry) =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const newTokenomicsList: any = [...formData.tokenomicsList];
      newTokenomicsList[index][field] = event.target.value;

      const newData = { ...formData, tokenomicsList: newTokenomicsList };

      // If hardcap hanged, or mc is changed, recalculate price
      if (
        newTokenomicsList.length > 0 &&
        newTokenomicsList[index].name.toLowerCase() == "dex"
      ) {
        const dexPct =
          newData.tokenomicsList.find((e: any) => e.name.toLowerCase() == "dex")
            ?.amount || 0;
        const hardCap = newData.hardCap || 0;
        const totalSupply = newData.totalSupply || 0;
        const mc = (hardCap / (1 - dexPct / 100)) * 100;
        const tokenPrice = totalSupply / mc;

        newData.launchMC = mc;
        newData.tokenPrice = tokenPrice;
      }

      setFormData(newData);
    };

  const addTokenomicsRow = () => {
    setFormData({
      ...formData,
      tokenomicsList: [
        ...formData.tokenomicsList,
        { name: "", wallet: "", amount: 0, cliff: 0, vesting: 0, TGE: 0 },
      ],
    });
  };

  return (
    <div className="mt-8 w-full pt-4">
      <div className="flex items-center justify-between">
        <p className="font-broad text-[20px] mt-4">Tokenomics</p>
        <FlagButton onClick={addTokenomicsRow} shadow>
          <p className="text-lg font-broad font-black text-black whitespace-nowrap">
            ADD RoW
          </p>
        </FlagButton>
      </div>
      <div className="w-full rounded-xl flex flex-col bg-white mt-4">
        <div className="grid grid-cols-6 h-[62px] border-b border-[#00000033]">
          <div className="h-full flex flex-col justify-center font-lato text-[16px] text-[#4B2ED1] px-6">
            Name
          </div>
          <div className="h-full flex flex-col justify-center font-lato text-[16px] text-[#4B2ED1] px-6">
            Wallet
          </div>
          <div className="h-full flex flex-col justify-center font-lato text-[16px] text-[#4B2ED1] px-6">
            Amount
          </div>
          <div className="h-full flex flex-col justify-center font-lato text-[16px] text-[#4B2ED1] px-6">
            Cliff
          </div>
          <div className="h-full flex flex-col justify-center font-lato text-[16px] text-[#4B2ED1] px-6">
            Vesting
          </div>
          <div className="h-full flex flex-col justify-center font-lato text-[16px] text-[#4B2ED1] px-6">
            TGE
          </div>
        </div>
        {formData.tokenomicsList.map((item, index) => (
          <div
            key={index}
            className={`grid grid-cols-6 h-[62px] border-[#00000033] ${
              index < formData.tokenomicsList.length - 1 ? "border-b" : ""
            }`}
          >
            <input
              type="text"
              value={item.name}
              onChange={handleTokenomicsChange(index, "name")}
              className="h-full flex flex-col justify-center font-lato text-[14px] px-6 focus-visible:outline-none"
            />
            <input
              type="text"
              value={item.wallet}
              onChange={handleTokenomicsChange(index, "wallet")}
              className="h-full flex flex-col justify-center font-lato text-[14px] px-6 focus-visible:outline-none"
            />
            <NumericFormat
              type="text"
              suffix="%"
              value={item.amount}
              className="h-full flex flex-col justify-center font-lato text-[14px] px-6 focus-visible:outline-none"
              onValueChange={(values) => {
                handleTokenomicsChange(
                  index,
                  "amount",
                )({
                  //@ts-ignore
                  target: { value: values.floatValue },
                });
              }}
              isAllowed={(values) => {
                const { floatValue }: any = values;
                return floatValue >= 0 && floatValue <= 100;
              }}
              thousandSeparator
            />
            <input
              type="text"
              value={item.cliff}
              onChange={handleTokenomicsChange(index, "cliff")}
              className="h-full flex flex-col justify-center font-lato text-[14px] px-6 focus-visible:outline-none"
            />
            <input
              type="text"
              value={item.vesting}
              onChange={handleTokenomicsChange(index, "vesting")}
              className="h-full flex flex-col justify-center font-lato text-[14px] px-6 focus-visible:outline-none"
            />
            <NumericFormat
              type="text"
              suffix="%"
              value={item.TGE}
              className="h-full flex flex-col justify-center font-lato text-[14px] px-6 focus-visible:outline-none"
              onValueChange={(values) => {
                handleTokenomicsChange(
                  index,
                  "TGE",
                )({
                  //@ts-ignore
                  target: { value: values.floatValue },
                });
              }}
              isAllowed={(values) => {
                const { floatValue }: any = values;
                return floatValue >= 0 && floatValue <= 100;
              }}
              thousandSeparator
            />
          </div>
        ))}
      </div>

      <div className="mt-16 flex items-center justify-between gap-4">
        <InfoCard
          backgroundColor="black"
          shadowColor="#00B68B"
          label="Total Supply"
          value={
            formData.totalSupply
              ? `${numericFormatter(formData.totalSupply.toString(), { thousandsGroupStyle: "thousand", thousandSeparator: "," })}`
              : "Not Set"
          }
          textColor="white"
        />
        <InfoCard
          backgroundColor="#4B2ED1"
          shadowColor="#DE9CFD"
          label="Token Price"
          value={
            formData.tokenPrice
              ? `${numericFormatter(formData.tokenPrice.toString(), { thousandsGroupStyle: "thousand", thousandSeparator: "," })}`
              : "Not Set"
          }
          imgSrc="/icons/CreateListing/token-price.svg"
          imgAlt="token price"
          textColor="white"
        />
        <InfoCard
          backgroundColor="#57F0CD"
          shadowColor="black"
          label="Launch MC"
          value={
            formData.launchMC
              ? `${numericFormatter(formData.launchMC.toString(), { thousandsGroupStyle: "thousand", thousandSeparator: ",", decimalScale: 2 })}`
              : "Not Set"
          }
          imgSrc="/icons/CreateListing/launch-mc.svg"
          imgAlt="Launch MC"
          textColor="black"
        />
      </div>
    </div>
  );
}
