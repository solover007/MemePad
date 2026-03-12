import { WSOL, GUMMY } from "@/contract/launchpad/web3";

export interface CreateTokenFormData {
  name: string;
  symbol: string;
  decimals: number;
  totalSupply: number;
  // icon?: File | null;
  icon?: {
    file: File;
    url: string;
  };
  description?: string;
  website?: string;
  discord?: string;
  twitter?: string;
  telegram?: string;
}

export const defaultCreateTokenFormData: CreateTokenFormData = {
  name: "",
  symbol: "",
  decimals: 9,
  totalSupply: 10_000_000
};

export interface TokenListingFormData {
  coverImage?: {
    file: File;
    url: string;
  };
  tokenSelection: string;
  listingName: string;
  listingDescription: string;
  treasuryWallet: string;
  tokenAddress: string;
  quoteTokenAddress: string[];
  minBuy: number;
  maxBuy: number;
  presaleRate: number; // SOL price
  presaleRate2: number; // GUMMY price
  listingRate: number;
  liquidityPercent: number;
  softCap: number;
  hardCap: number;
  startDate: string;
  endDate: string;
  isVesting: boolean;
  tgeDate: string;
  tgePercent: number;
  cycleDays: number;
  cycleReleasePercent: number;
  minTicketSize: number;
  maxTicketSize?: number;
  pootLaunchDelay?: string;
  tokenomicsList: TokenomicsEntry[];
  totalSupply: number;
  tokenPrice?: number;
  launchMC?: number;
}

export interface TokenomicsEntry {
  name: string;
  wallet: string;
  amount: number;
  cliff?: number;
  vesting?: number;
  TGE?: number;
}

export const defaultTokenListingFormData: TokenListingFormData = {
  tokenSelection: "",
  listingName: "",
  listingDescription: "",
  tokenAddress: "",
  quoteTokenAddress: [WSOL, GUMMY],
  minBuy: 0.01,
  maxBuy: 100,
  presaleRate: 375,
  presaleRate2: 0.1,
  listingRate: 300,
  liquidityPercent: 50,
  softCap: 69,
  hardCap: 2000,
  startDate: '',
  endDate: '',
  isVesting: false,
  tgeDate: '',
  tgePercent: 0,
  cycleDays: 10,
  cycleReleasePercent: 100,
  minTicketSize: 0.01,
  treasuryWallet: "",
  totalSupply: 10_000_000,
  tokenomicsList: [
    {
      name: "DEX",
      wallet: "--",
      amount: 10,
    },
    {
      name: "Presale",
      wallet: "--",
      amount: 10,
    },
  ],
};

// export interface TokenomicsFormData {
//   tokenomicsList: TokenomicsEntry[];
//   totalSupply: string;
//   tokenPrice: string;
//   launchMC: string;
// }
//
// export const defaultTokenomicsFormData: TokenomicsFormData = {
//   tokenomicsList: [
//     {
//       name: "DEX",
//       wallet: "--",
//       amount: 10,
//     },
//     {
//       name: "Presale",
//       wallet: "--",
//       amount: 10,
//     },
//   ],
//   totalSupply: "10,000,000",
//   tokenPrice: "0.0001 SOL",
//   launchMC: "60k",
// };
