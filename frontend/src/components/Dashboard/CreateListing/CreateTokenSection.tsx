import React, { useState } from "react";
import { CreateTokenFormData, TokenListingFormData } from "./types";
import { toast } from "react-toastify";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { useWallet } from "@solana/wallet-adapter-react";
import { createSPLToken } from "./utils";
import { send } from "@/contract/launchpad/keys";
import { uploadFile } from "@/lib/api";
import { showTxResult } from "@/contract/launchpad/web3";
import FlagButton from "@/components/Buttons/FlagButton";
import ConnectButton from "@/components/ui/ConnectButton";

interface SocialInputProps {
  icon: string;
  placeholder: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const SocialInput: React.FC<SocialInputProps> = ({
  icon,
  placeholder,
  value,
  onChange,
}) => (
  <div className="h-[58px] w-full flex items-center text-[14px] font-lato border border-[#B6B6B6] rounded-md px-4 gap-4">
    <div className="w-[36px]">
      <img src={icon} alt={placeholder} />
    </div>
    <div className="w-[1px] h-[28px] bg-[#B6B6B6]" />
    <div className="w-[calc(100%-37px)]">
      <input
        type="text"
        className="h-[50px] text-[14px] font-lato w-full focus-visible:outline-none"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </div>
  </div>
);

export default function CreateTokenSection({
  formData,
  setFormData,
  listingData,
  setListingData,
}: {
  formData: CreateTokenFormData;
  setFormData: (data: any) => void;
  listingData: TokenListingFormData;
  setListingData: (data: any) => void;
}) {
  const wallet = useWallet();

  const [loading, setLoading] = useState<boolean>(false);

  const handleInputChange =
    (field: keyof CreateTokenFormData) =>
    (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setFormData({ ...formData, [field]: event.target.value });
    };

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    if (!event.target.files) return;

    try {
      const { url } = await uploadFile(event.target.files[0]);
      setFormData({
        ...formData,
        icon: {
          file: event.target.files[0],
          url: url,
        },
      });
    } catch (error: any) {
      toast.error("Failed to upload file: " + error.message);
    }
  };

  const handleCreateToken = async () => {
    if (loading) {
      toast.error("Processing now. please try again later");
      return;
    }

    if (!wallet?.publicKey) {
      toast.error("Please connect your wallet");
      return;
    }

    if (formData.name == "") {
      toast.error("Please enter your token name.");
      return;
    }
    if (formData.symbol == "") {
      toast.error("Please enter your token symbol.");
      return;
    }
    // if (decimals == 0) {
    //   toast.error("Please enter your token decimal.");
    //   return;
    // }
    // if (totalSupply == 0) {
    //   toast.error("Please enter your token total supply.");
    //   return;
    // }

    if (formData.description == "") {
      toast.error("Please enter your token description.");
      return;
    }

    console.log("Image URL: ", formData.icon?.url);

    // if (totalSupply * Math.pow(10, decimals) > Math.pow(2, 64)) {
    //   toast.error(`Invalid total supply. (available max amount: ${(Math.pow(2, 64) / Math.pow(10, decimals))})`);

    //   return;
    // }

    // if (ownerWallet == '') {
    //   toast.error("Please enter your owner wallet address.");
    //   return;
    // }

    // if (!checkAddressFormat(ownerWallet)) {
    //   toast.error("Owner wallet address format error!");

    //   return;
    // }

    setLoading(true);

    const res = await createSPLToken(
      wallet,
      wallet.publicKey.toBase58(),
      formData,
    );

    if (res.tx == null) {
      toast.error("Token Creation failed");
      setLoading(false);
      return;
    }

    try {
      const txHash = await send(wallet, res.tx, res.mintKeypair);
      if (txHash) {
        setListingData({
          ...listingData,
          ["tokenAddress"]: res.mintKeypair.publicKey.toBase58(),
        });
      }
      showTxResult(txHash, 0, "Successfully created!");
    } catch (err) {
      console.error("handleClickCreateToken Error: ", err);
      toast.error("Token Creation failed!");
    }

    setLoading(false);
  };

  return (
    <div className="w-full p-5 pb-14 bg-[#F5F5F5] shadow-[16px_16px_4px_0px_black]">
      <div className="flex flex-row w-full justify-between">
        <p className="font-broad text-[20px] mt-4">Create token</p>
        <ConnectButton />
      </div>
      <div className="w-full rounded-xl flex flex-col bg-white p-6 mt-4 gap-6">
        <div className="relative w-full flex gap-14">
          <div className="relative w-2/3 flex flex-col gap-6">
            <div className="w-full flex items-center gap-5">
              <div className="flex flex-col gap-2">
                <p className="font-lato text-[16px] text-[#4B2ED1] font-medium">
                  Icon
                </p>
                <input
                  type="file"
                  onChange={handleFileChange}
                  className="w-[54px] h-[54px] border rounded-full inline-block overflow-hidden bg-img-default bg-center bg-no-repeat bg-[#D9D9D9] pt-[54px] cursor-pointer"
                  style={{
                    backgroundImage: `url(${
                      formData.icon?.url ||
                      "/icons/CreateListing/img-default.svg"
                    })`,
                    backgroundSize: formData.icon?.url ? "cover" : "auto",
                  }}
                />
              </div>
              <div className="flex flex-col w-full max-w-[9rem]  gap-2">
                <p className="font-lato text-[16px] text-[#4B2ED1] font-medium">
                  Symbol
                </p>
                <input
                  type="text"
                  value={formData.symbol}
                  onChange={handleInputChange("symbol")}
                  className="h-[50px] text-[14px] font-lato border border-[#B6B6B6] rounded-md px-6 focus-visible:outline-none"
                  placeholder="Token Symbol"
                />
              </div>
              <div className="flex flex-col w-[calc(100%-50px)] gap-2">
                <p className="font-lato text-[16px] text-[#4B2ED1] font-medium">
                  Name
                </p>
                <input
                  type="text"
                  value={formData.name}
                  onChange={handleInputChange("name")}
                  className="h-[50px] text-[14px] font-lato border border-[#B6B6B6] rounded-md px-6 focus-visible:outline-none"
                  placeholder="Enter Name"
                />
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <p className="font-lato text-[16px] text-[#4B2ED1] font-medium">
                Description
              </p>
              <textarea
                rows={6}
                value={formData.description}
                onChange={handleInputChange("description")}
                className="text-[14px] font-lato border border-[#B6B6B6] rounded-md p-6 focus-visible:outline-none"
              />
            </div>
          </div>
          <div className="relative w-1/3">
            <p className="font-lato text-[16px] text-[#4B2ED1] font-medium">
              Socials
            </p>
            <div className="h-[calc(100%-34px)] flex flex-col justify-between mt-2">
              <SocialInput
                icon="/icons/CreateListing/website.svg"
                placeholder="https://Website"
                value={formData.website ?? ""}
                onChange={handleInputChange("website")}
              />
              <SocialInput
                icon="/icons/CreateListing/discord.svg"
                placeholder="https://Discord"
                value={formData.discord ?? ""}
                onChange={handleInputChange("discord")}
              />
              <SocialInput
                icon="/icons/CreateListing/twitter.svg"
                placeholder="https://Twitter"
                value={formData.twitter ?? ""}
                onChange={handleInputChange("twitter")}
              />
              <SocialInput
                icon="/icons/CreateListing/telegram.svg"
                placeholder="https://Telegram"
                value={formData.telegram ?? ""}
                onChange={handleInputChange("telegram")}
              />
            </div>
          </div>
        </div>
        <div className="flex justify-end">
          {wallet?.publicKey ? (
            <FlagButton onClick={handleCreateToken} shadow>
              <p className="text-lg font-broad font-black text-black whitespace-nowrap">
                CReATE ToKEN
              </p>
            </FlagButton>
          ) : (
            <ConnectButton />
          )}
        </div>
      </div>
    </div>
  );
}
