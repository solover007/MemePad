import React from "react";
import Select from "../../../components/Select";
import ContentEditor from "../../../components/Shared/ContentEditor";
import { TokenListingFormData } from "./types";
import { NumericFormat } from "react-number-format";
import TokenomicsSection from "./TokenomicsSection";
// import DatePicker from "react-datepicker";
import DurationPicker from "@/components/Shared/DurationPicker";
import { DatePicker } from "@nextui-org/date-picker";

import "react-datepicker/dist/react-datepicker.css";
import { uploadFile } from "@/lib/api";
import { toast } from "react-toastify";
import { GUMMY, WSOL } from "@/contract/launchpad/web3";
import ConnectButton from "@/components/ui/ConnectButton";

export default function TokenListingSection({
  symbol,
  formData,
  setFormData,
}: {
  symbol?: string;
  formData: TokenListingFormData;
  setFormData: (data: TokenListingFormData) => void;
}) {
  const handleInputChange =
    (field: keyof TokenListingFormData) =>
    (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const newData = { ...formData, [field]: event.target.value };

      // If hardcap hanged, or mc is changed, recalculate price
      if (field === "hardCap" || field === "totalSupply") {
        const dexPct =
          newData.tokenomicsList.find((e) => e.name.toLowerCase() == "dex")
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

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (!event.target.files) return;

    try {
      const { url } = await uploadFile(event.target.files[0]);

      setFormData({
        ...formData,
        coverImage: {
          file: event.target.files[0],
          url: url,
        },
      });
    } catch (error: any) {
      toast.error("Failed to upload file: " + error.message);
    }
  };

  return (
    <div className="w-full p-5 pb-14 bg-[#F5F5F5] shadow-[16px_16px_4px_0px_black] mt-[60px]">
      <div className="flex flex-row w-full justify-between">
      <p className="font-broad text-[20px] mt-4">Listing Description</p>
        <ConnectButton />
      </div>
      <div className="w-full rounded-xl flex flex-col bg-white p-6 mt-4 gap-6">
        <div className="relative w-full flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <p className="font-lato text-[16px] text-[#4B2ED1] font-medium">
              Upload Cover Image (998px x 450px)
            </p>
            <input
              type="file"
              onChange={handleFileChange}
              className="w-full h-[90px] border rounded-md inline-block overflow-hidden bg-img-default bg-center bg-no-repeat bg-[#F6F6F6] bg-[length:35px_35px] pt-[90px] cursor-pointer"
              style={{
                backgroundImage: `url(${
                  formData.coverImage?.url ||
                  "/icons/CreateListing/img-default.svg"
                })`,
                backgroundSize: formData.coverImage?.url ? "cover" : "auto",
              }}
            />
          </div>
          <div className="w-full flex flex-col gap-2">
            <p className="font-lato text-[16px] text-[#4B2ED1] font-medium">
              Listing Name
            </p>
            <input
              type="text"
              value={formData.listingName}
              onChange={handleInputChange("listingName")}
              className="h-[50px] text-[14px] font-lato border border-[#B6B6B6] rounded-md px-6 focus-visible:outline-none"
              placeholder="Enter Listing Name"
            />
          </div>
          <div className="w-full flex gap-6">
            <div className="w-1/2">
              <div className="w-full flex flex-col gap-2">
                <p className="font-lato text-[16px] text-[#4B2ED1] font-medium">
                  Token Selection
                </p>
                <input
                  type="text"
                  value={formData.tokenAddress}
                  onChange={handleInputChange("tokenAddress")}
                  className="h-[50px] text-[14px] font-lato border border-[#B6B6B6] rounded-md px-6 focus-visible:outline-none"
                  placeholder="Enter Token address"
                />
              </div>
            </div>
            <div className="w-1/2">
              <div className="w-full flex flex-col gap-2">
                <p className="font-lato text-[16px] text-[#4B2ED1] font-medium">
                  Quote Token Selection
                </p>
                <Select
                  className="block w-full py-[13px] px-4 pr-6 border min-w-[160px] !border-[#B6B6B6] bg-white rounded-md text-[14px] font-lato text-gray-400 focus:outline-none appearance-none"
                  options={[
                    {
                      label: "WSOL",
                      value: WSOL,
                    },
                    {
                      label: "GUMMY",
                      value: GUMMY,
                    },
                  ]}
                  value={formData.quoteTokenAddress}
                  onChange={(e: any) =>
                    setFormData({
                      ...formData,
                      quoteTokenAddress: e.target.value,
                    })
                  }
                />
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <p className="font-lato text-[16px] text-[#4B2ED1] font-medium">
              Listing Description
            </p>
            <ContentEditor
              content={formData.listingDescription}
              setContent={(content) =>
                setFormData({ ...formData, listingDescription: content })
              }
              className="border border-[#B6B6B6] rounded-md focus-visible:outline-none"
            />
          </div>
          <div className="w-full hidden flex-col gap-2">
            <p className="font-lato text-[16px] text-[#4B2ED1] font-medium">
              Treasury Wallet
            </p>
            <input
              type="text"
              value={formData.treasuryWallet}
              onChange={handleInputChange("treasuryWallet")}
              className="h-[50px] text-[14px] font-lato border border-[#B6B6B6] rounded-md px-6 focus-visible:outline-none"
              placeholder="Treasury Wallet"
            />
          </div>
          <div className="w-full flex gap-6">
            <div className="w-1/2">
              <div className="w-full flex flex-col gap-2">
                <p className="font-lato text-[16px] text-[#4B2ED1] font-medium">
                  Soft Cap
                </p>
                <NumericFormat
                  type="text"
                  prefix="SOL  "
                  value={formData.softCap}
                  className="h-[50px] text-[14px] font-lato border border-[#B6B6B6] rounded-md px-6 focus-visible:outline-none"
                  placeholder="Soft Cap"
                  onValueChange={(values) => {
                    handleInputChange("softCap")({
                      //@ts-ignore
                      target: { value: values.floatValue },
                    });
                  }}
                  thousandSeparator
                />
              </div>
            </div>
            <div className="w-1/2">
              <div className="w-full flex flex-col gap-2">
                <p className="font-lato text-[16px] text-[#4B2ED1] font-medium">
                  Hard Cap
                </p>
                <NumericFormat
                  type="text"
                  prefix="SOL  "
                  value={formData.hardCap}
                  className="h-[50px] text-[14px] font-lato border border-[#B6B6B6] rounded-md px-6 focus-visible:outline-none"
                  placeholder="Hard Cap"
                  onValueChange={(values) => {
                    handleInputChange("hardCap")({
                      //@ts-ignore
                      target: { value: values.floatValue },
                    });
                  }}
                  thousandSeparator
                />
              </div>
            </div>
          </div>
          <div className="w-full flex gap-6">
            <div className="w-1/2">
              <div className="w-full flex flex-col gap-2">
                <p className="font-lato text-[16px] text-[#4B2ED1] font-medium">
                  Min Buy Amount
                </p>
                <NumericFormat
                  type="text"
                  // prefix={symbol ? `$${symbol}` : ""}
                  prefix="SOL  "
                  value={formData.minBuy}
                  className="h-[50px] text-[14px] font-lato border border-[#B6B6B6] rounded-md px-6 focus-visible:outline-none"
                  placeholder="Minimum Buy Amount"
                  onValueChange={(values) => {
                    handleInputChange("minBuy")({
                      //@ts-ignore
                      target: { value: values.floatValue },
                    });
                  }}
                  thousandSeparator
                />
              </div>
            </div>
            <div className="w-1/2">
              <div className="w-full flex flex-col gap-2">
                <p className="font-lato text-[16px] text-[#4B2ED1] font-medium">
                  Max Buy Amount
                </p>
                <NumericFormat
                  type="text"
                  prefix="SOL  "
                  value={formData.maxBuy}
                  className="h-[50px] text-[14px] font-lato border border-[#B6B6B6] rounded-md px-6 focus-visible:outline-none"
                  placeholder="Maximum Buy Amount"
                  onValueChange={(values) => {
                    handleInputChange("maxBuy")({
                      //@ts-ignore
                      target: { value: values.floatValue },
                    });
                  }}
                  thousandSeparator
                />
              </div>
            </div>
          </div>
          <div className="w-full flex gap-6">
            <div className="w-1/2">
              <div className="w-full flex flex-col gap-2">
                <p className="font-lato text-[16px] text-[#4B2ED1] font-medium">
                  Presale Price(SOL)
                </p>
                <NumericFormat
                  type="text"
                  prefix={symbol ? `$${symbol}` : ""}
                  value={formData.presaleRate}
                  className="h-[50px] text-[14px] font-lato border border-[#B6B6B6] rounded-md px-6 focus-visible:outline-none"
                  placeholder="Presale Price"
                  onValueChange={(values) => {
                    handleInputChange("presaleRate")({
                      //@ts-ignore
                      target: { value: values.floatValue },
                    });
                  }}
                  thousandSeparator
                />
              </div>
            </div>
            <div className="w-1/2">
              <div className="w-full flex flex-col gap-2">
                <p className="font-lato text-[16px] text-[#4B2ED1] font-medium">
                  Listing Price
                </p>
                <NumericFormat
                  type="text"
                  prefix={symbol ? `$${symbol}` : ""}
                  value={formData.listingRate}
                  className="h-[50px] text-[14px] font-lato border border-[#B6B6B6] rounded-md px-6 focus-visible:outline-none"
                  placeholder="Listing Price"
                  onValueChange={(values) => {
                    handleInputChange("listingRate")({
                      //@ts-ignore
                      target: { value: values.floatValue },
                    });
                  }}
                  thousandSeparator
                />
              </div>
            </div>
          </div>
          <div className="w-full flex gap-6">
            <div className="w-1/2">
              <div className="w-full flex flex-col gap-2">
                <p className="font-lato text-[16px] text-[#4B2ED1] font-medium">
                  Presale Price(GUMMY)
                </p>
                <NumericFormat
                  type="text"
                  prefix={symbol ? `$${symbol}` : ""}
                  value={formData.presaleRate2}
                  className="h-[50px] text-[14px] font-lato border border-[#B6B6B6] rounded-md px-6 focus-visible:outline-none"
                  placeholder="Presale Price"
                  onValueChange={(values) => {
                    handleInputChange("presaleRate2")({
                      //@ts-ignore
                      target: { value: values.floatValue },
                    });
                  }}
                  thousandSeparator
                />
              </div>
            </div>
         
          </div>
          <div className="w-full flex gap-6">
            <div className="w-1/2">
              <div className="w-full flex flex-col gap-2">
                <p className="font-lato text-[16px] text-[#4B2ED1] font-medium">
                  Start Date
                </p>
                <DatePicker
                  granularity="minute"
                  className="h-[50px] text-[14px] font-lato border border-[#B6B6B6] rounded-md focus-visible:outline-none w-full overflow-hidden"
                  size="lg"
                  radius="none"
                  //@ts-ignore
                  selected={formData.startDate}
                  onChange={(date: any) =>
                    setFormData({
                      ...formData,
                      startDate: date.toString(),
                    })
                  }
                  dateFormat="MM/dd/yyyy"
                />
              </div>
            </div>
            <div className="w-1/2">
              <div className="w-full flex flex-col gap-2">
                <p className="font-lato text-[16px] text-[#4B2ED1] font-medium">
                  End Date
                </p>
                <DatePicker
                  className="h-[50px] text-[14px] font-lato border border-[#B6B6B6] rounded-md focus-visible:outline-none w-full overflow-hidden"
                  size="lg"
                  radius="none"
                  granularity="minute"
                  //@ts-ignore
                  selected={formData.endDate}
                  onChange={(date: any) =>
                    setFormData({
                      ...formData,
                      endDate: date.toString(),
                    })
                  }
                  dateFormat="MM/dd/yyyy"
                />
              </div>
            </div>
          </div>
          <div className="w-full hidden gap-6">
            <div className="w-1/2">
              <div className="w-full hidden flex-col gap-2">
                <p className="font-lato text-[16px] text-[#4B2ED1] font-medium">
                  Min Ticket Size
                </p>
                <NumericFormat
                  type="text"
                  prefix="SOL  "
                  value={formData.minTicketSize}
                  className="h-[50px] text-[14px] font-lato border border-[#B6B6B6] rounded-md px-6 focus-visible:outline-none"
                  placeholder="Enter Minimum Ticket Size"
                  onValueChange={(values) => {
                    handleInputChange("minTicketSize")({
                      //@ts-ignore
                      target: { value: values.floatValue },
                    });
                  }}
                  thousandSeparator
                />
              </div>
            </div>
            <div className="w-1/2">
              <div className="w-full hidden flex-col gap-2">
                <p className="font-lato text-[16px] text-[#4B2ED1] font-medium">
                  Maximum Ticket Size
                </p>
                <NumericFormat
                  type="text"
                  prefix="SOL  "
                  value={formData.maxTicketSize}
                  className="h-[50px] text-[14px] font-lato border border-[#B6B6B6] rounded-md px-6 focus-visible:outline-none"
                  placeholder="Enter Maximum Ticket Size"
                  thousandSeparator
                  onValueChange={(values) => {
                    handleInputChange("maxTicketSize")({
                      //@ts-ignore
                      target: { value: values.floatValue },
                    });
                  }}
                />
              </div>
            </div>
          </div>
          <div className="w-full flex gap-6">
            <div className="w-1/2">
              <div className="w-full flex flex-col gap-2">
                <p className="font-lato text-[16px] text-[#4B2ED1] font-medium">
                  TGE Date
                </p>
                <DatePicker
                  className="h-[50px] text-[14px] font-lato border border-[#B6B6B6] rounded-md focus-visible:outline-none w-full overflow-hidden"
                  size="lg"
                  radius="none"
                  granularity="minute"
                  //@ts-ignore
                  selected={formData.tgeDate}
                  onChange={(date: any) =>
                    setFormData({
                      ...formData,
                      tgeDate: date.toString(),
                    })
                  }
                  dateFormat="MM/dd/yyyy"
                />
              </div>
            </div>
            <div className="w-1/2">
              <div className="w-full flex flex-col gap-2">
                <p className="font-lato text-[16px] text-[#4B2ED1] font-medium">
                  TGE Percent (%)
                </p>
                <NumericFormat
                  type="text"
                  prefix={symbol ? `$${symbol}` : ""}
                  value={formData.tgePercent}
                  className="h-[50px] text-[14px] font-lato border border-[#B6B6B6] rounded-md px-6 focus-visible:outline-none"
                  placeholder="TGE Percent"
                  onValueChange={(values) => {
                    handleInputChange("tgePercent")({
                      //@ts-ignore
                      target: { value: values.floatValue },
                    });
                  }}
                  thousandSeparator
                />
              </div>
            </div>
          </div>
          <div className="w-full flex gap-6">
            <div className="w-1/2">
              <div className="w-full flex flex-col gap-2">
                <p className="font-lato text-[16px] text-[#4B2ED1] font-medium">
                  Cycle Days
                </p>
                <NumericFormat
                  type="text"
                  prefix={symbol ? `$${symbol}` : ""}
                  value={formData.cycleDays}
                  className="h-[50px] text-[14px] font-lato border border-[#B6B6B6] rounded-md px-6 focus-visible:outline-none"
                  placeholder="cycle Days"
                  onValueChange={(values) => {
                    handleInputChange("cycleDays")({
                      //@ts-ignore
                      target: { value: values.floatValue },
                    });
                  }}
                  thousandSeparator
                />
              </div>
            </div>
            <div className="w-1/2">
              <div className="w-full flex flex-col gap-2">
                <p className="font-lato text-[16px] text-[#4B2ED1] font-medium">
                  Cycle Release Percent (%)
                </p>
                <NumericFormat
                  type="text"
                  prefix={symbol ? `$${symbol}` : ""}
                  value={formData.cycleReleasePercent}
                  className="h-[50px] text-[14px] font-lato border border-[#B6B6B6] rounded-md px-6 focus-visible:outline-none"
                  placeholder="Cycle Release Percent"
                  onValueChange={(values) => {
                    handleInputChange("cycleReleasePercent")({
                      //@ts-ignore
                      target: { value: values.floatValue },
                    });
                  }}
                  thousandSeparator
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <TokenomicsSection formData={formData} setFormData={setFormData} />
    </div>
  );
}
