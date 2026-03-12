import { ITokenMetadata } from "@/components/LaunchpadPage/LaunchpadSection";

export const TG_USERNAME = "MEMEPad_Community";
export const EMAIL = "info@memepad.ai";
export const TWITTER_USERNAME = "MemePadSol";
export const PRE_SALE_ADDRESS = "mpadWWTtVeZZAEmTaA1mQR4Ks42wiarNYpfCVd6yXPV";
export const WHITEPAPER_URL = "https://docs.memepad.ai";
export const COUNTDOWN_DATE = "2024-04-08T20:00:00+02:00";
export const PRESALE_DATE = "2024-04-17T12:00:00+02:00";
export const PINK_SALE_STARTS = "2024-04-18T17:17:00Z";
export const PINK_SALE_ENDS = "2024-04-21T17:17:00Z";
export const FIRST_LAUNCH = "2024-06-15T22:38:00Z";
export const PINK_SALE_URL =
  "https://www.pinksale.finance/solana/launchpad/E5heBwgj7VsMKVZtPMF8hhCoyowejCSdhg2aUKDvwVcc";
export const PINK_SALE_SITE = "https://www.pinksale.finance";
export const DEX_SITE_URL = "https://dexview.com";
export const JOIN_TG = "https://t.me/Memepad_Community";
export const HOME_BRIEF_STARTS = "2024-05-20T17:17:00Z";
export const PURPLE_PRIMARY_COLOR = "#8C79FF";

export const TEXT_MAP = {
  roadmap: [
    {
      title: "KOL ROUND",
      text: "Collaboration with Key Opinion Leaders (KOLs) for support and marketing",
    },
    {
      title: "COMMUNITY GROWTH",
      text: "Focus on expanding the community, developing the website, and initiating presale marketing.",
    },
    {
      title: "PRESALE INITIATION",
      text: "Rolling out a two stage pre-sale, one on the website, and one on our own launchpad.",
    },
    {
      title: "IDEATION",
      text: "This stage involves brainstorming ideas and creating the whitepaper and outlining the project's plan.",
    },
    {
      title: "COMMUNITY GROWTH",
      text: "Focus on expanding the community, developing the website, and initiating presale marketing.",
    },
    {
      title: "MORE COMMUNITY GROWTH",
      text: "Focus on expanding the community, developing the website, and initiating presale marketing.",
    },
    {
      title: "EVEN MORE COMMUNITY GROWTH",
      text: "Focus on expanding the community, developing the website, and initiating presale marketing.",
    },
  ],
  product: {
    one: (className = "") => (
      <p className={className}>
        Project raisers must allocate{" "}
        <span className="font-bold">a portion of their tokens</span> to MEMEPad
        for airdrops to native token holders.
      </p>
    ),
    two: (className = "") => (
      <p className={className}>
        MEMEPad has a level of{" "}
        <span className="font-bold">centralizatation</span>, meaning that the
        projects and founders and subject to in-depth DD, tokens and raised
        capital will be vested through mpad, while liquidity is locked through
        the memepad platform.
      </p>
    ),
    three: (className = "") => (
      <p className={className}>
        To participate, a wallet needs to hold a specific amount of{" "}
        <span className="font-bold">MEMEPad&apos;s native tokens</span> similar
        to how decentralized launchpads operate.
      </p>
    ),
  },
};

export const UPCOMING_LIST = [
  {
    id: 1,
    // banner: "/icons/Launchpad/banner-1.svg",
    banner: "/icons/Launchpad/banner-3.svg",
    icon: "/images/mango-logo.png",
    name: "CRYPTO MANGO",
    shortDescription: "Takes Two To Tango With Crypto & Mango",
    raised: "4,2M",
    holders: "4,2M",
    following: "4,2M",
    platform: "platform-a",
    task: "task-a",
    group: "group-a",
    sort: "",
    tokenAddress: "0x1234567890",
  },
  {
    id: 2,
    // banner: "/icons/Launchpad/banner-1.svg",
    banner: "/icons/HomeSectionBrief/bgTwo.png",
    icon: "/images/caesar-icon.png",
    name: "CAESAR",
    shortDescription: "One Memecoin King To Rule Them All 👑",
    raised: "4,2M",
    holders: "4,2M",
    following: "4,2M",
    platform: "platform-a",
    task: "task-a",
    group: "group-a",
    sort: "",
    tokenAddress: "0x1234567890",
  },
  {
    id: 3,
    // banner: "/icons/Launchpad/banner-2.svg",
    banner: "/icons/Launchpad/banner-1.svg",
    icon: "/icons/HomeSectionBrief/Cat.svg",
    name: "DEGEN YOUKI",
    shortDescription: "Be A Degen To Play - Be A Degen To Win",
    raised: "4,2M",
    holders: "4,2M",
    following: "4,2M",
    platform: "platform-a",
    task: "task-a",
    group: "group-a",
    sort: "",
    tokenAddress: "0x1234567890",
  },
  {
    id: 4,
    // banner: "/icons/Launchpad/banner-3.svg",
    banner: "/icons/Launchpad/banner-5.svg",
    icon: "/icons/Launchpad/questionMark.svg",
    name: "RUG FACTORY",
    shortDescription: "Keeping the Rugs under the Table Where They Belong",
    raised: "4,2M",
    holders: "4,2M",
    following: "4,2M",
    platform: "platform-a",
    task: "task-a",
    group: "group-a",
    sort: "",
    tokenAddress: "0x1234567890",
  },
  {
    id: 5,
    banner: "/icons/Launchpad/banner-4.svg",
    icon: "/icons/Launchpad/questionMark.svg",
    name: "SUPERTARD",
    shortDescription: "News & Media For Degens, By Super Degens",
    raised: "4,2M",
    holders: "4,2M",
    following: "4,2M",
    platform: "platform-b",
    task: "task-b",
    group: "group-b",
    sort: "",
    tokenAddress: "0x1234567890",
  },
  {
    id: 6,
    // banner: "/icons/Launchpad/banner-5.svg",
    banner: "/icons/Launchpad/banner-3.svg",
    icon: "/icons/Launchpad/questionMark.svg",
    name: "CRYPTO SNIPER",
    shortDescription:
      "Sniping MEMEs Like Your Wallet Depended On It, Cos It Does",
    raised: "4,2M",
    holders: "4,2M",
    following: "4,2M",
    platform: "platform-b",
    task: "task-b",
    group: "group-b",
    sort: "",
    tokenAddress: "0x1234567890",
  },
];

export const COMPLETE_LIST = [
  {
    id: 1,
    banner: "/icons/Launchpad/banner-1.svg",
    icon: "/icons/Launchpad/icon.svg",
    name: "KEBAPP CoIN",
    raised: "4,2M",
    holders: "4,2M",
    following: "4,2M",
    platform: "platform-a",
    task: "task-a",
    group: "group-a",
    sort: "",
    tokenAddress: "0x1234567890",
  },
  {
    id: 2,
    banner: "/icons/Launchpad/banner-1.svg",
    icon: "/icons/Launchpad/icon.svg",
    name: "KEBAPP CoIN",
    raised: "4,2M",
    holders: "4,2M",
    following: "4,2M",
    platform: "platform-a",
    task: "task-a",
    group: "group-a",
    sort: "",
    tokenAddress: "0x1234567890",
  },
  {
    id: 3,
    banner: "/icons/Launchpad/banner-2.svg",
    icon: "/icons/Launchpad/icon.svg",
    name: "KEBAPP CoIN",
    raised: "4,2M",
    holders: "4,2M",
    following: "4,2M",
    platform: "platform-b",
    task: "task-b",
    group: "group-b",
    sort: "",
    tokenAddress: "0x1234567890",
  },
];

export const PURCHASE_LIST = [
  {
    id: 1,
    name: "SAMOYEDCOIN",
    symbol: "SAMO",
    amount: 50,
    amountInUsd: "40,023 $M",
    status: "Unlocked",
    date: "12-12-2024",
    image: "/images/coin-samo.png",
  },
  {
    id: 2,
    name: "BONK",
    symbol: "BONK",
    amount: 12,
    amountInUsd: "40,023 $M",
    status: "Unlocked",
    date: "12-12-2024",
    image: "/images/coin-bonk.png",
  },
  {
    id: 3,
    name: "DEGEN YOUKI",
    symbol: "DGEN",
    amount: 10,
    amountInUsd: "40,023 $M",
    status: "Unlocked",
    date: "12-12-2024",
    image: "/images/coin-dgen.png",
  },
];

export const ONGOING_LIST: {
  id: number;
  banner: string;
  icon: string;
  name: string;
  shortDescription?: string;
  raised: string;
  holders: string;
  following: string;
  tokenAddress: string;
}[] = [
  {
    id: 1,
    name: "MEMEPAD",
    icon: "https://arweave.net/I55qtHXZWaEzblm97EeITc3NmUAo-f6xEt5Wb4Bz8YI",
    banner: "/images/twitter-banner.png",
    tokenAddress: "mpadYYmm4W8xwTweM9QCpN3xBsrDwGkmuVq5iKBQoiB",
    shortDescription:
      "MEMEPad is a decentralized launchpad for meme coins. We are a community-driven project that aims to bring meme coins to the masses. Our platform is designed to help meme coins launch in a fair and transparent way.",
    holders: "4,2M",
    following: "4,2M",
    raised: "4,2M",
  },
];

export const listingMetadata: { [key: string]: ITokenMetadata } = {
  mpadYYmm4W8xwTweM9QCpN3xBsrDwGkmuVq5iKBQoiB: {
    banner: "/images/twitter-banner.png",
    icon: "https://arweave.net/I55qtHXZWaEzblm97EeITc3NmUAo-f6xEt5Wb4Bz8YI",
    name: "MEMEPad",
    tokenAddress: "mpadYYmm4W8xwTweM9QCpN3xBsrDwGkmuVq5iKBQoiB",
    shortDescription:
      "MEMEPad is a decentralized launchpad for meme coins. We are a community-driven project that aims to bring meme coins to the masses. Our platform is designed to help meme coins launch in a fair and transparent way.",
    website: "https://memepad.ai",
    twitter: "https://twitter.com/MemePadSol",
    telegram: "https://t.me/Memepad_Community",
  },
};
