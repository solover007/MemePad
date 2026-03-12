import { useRouter } from "next/navigation";
import BannerImg from "@/public/icons/TokenDetailsPage/BannerImg";
import LeftArrow from "@/public/icons/TokenDetailsPage/LeftArrow";
import TokenFigure from "@/public/icons/TokenDetailsPage/TokenFigure";
import MinimalisticFaq from "../../MinimalisticFaq";
import Chart from "../../Chart";
import About from "./About";
import ButtonRow from "./ButtonRow";
import LockRecords from "./LockRecords";
import SocialIcons from "./SocialIcons";
import TokenBriefInfo from "./TokenBriefInfo";
import YouTubeVideo from "./YouTubeVideo";
import { ITokenMetadata } from "@/components/LaunchpadPage/LaunchpadSection";

// TODO: not hardcoded
const TokenInfo = ({ token }: { token: ITokenMetadata }) => {
  const router = useRouter();

  const handleClickAllLists = () => {
    router.push("/launchpad");
  };

  return (
    <div className="col-span-4 relative px-1 overflow-hidden">
      <div className="absolute -top-10 flex items-center gap-2 mb-4 hover:cursor-pointer">
        <LeftArrow className="w-2" />
        <p className="font-bold text-lg" onClick={handleClickAllLists}>
          All Listings
        </p>
      </div>

      <BannerImg src={token.banner} />

      <div className="shadow pt-10 pb-1 bg-white px-4">
        {/* token name box */}
        <div className="space-y-4 border-b-2 border-[#C4BEDD] pb-4 mx-6 -mt-28">
          <div className="flex flex-col items-center">
            <TokenFigure src={token.icon} className="w-40 h-36" />
            <h2 className="text-center text-3xl font-medium text-stroke-1-inherit text-[#262626]">
              {token.name}
            </h2>
          </div>

          {/*  badges in a row */}
          {/* TODO: dynamic badges */}
          <ButtonRow />

          {/* social icons */}
          <SocialIcons
            website={token.website}
            twitter={token.twitter}
            telegram={token.telegram}
            instagram={token.instagram}
          />
        </div>
        {/* about section */}
        <About />

        {/* youtube video */}
        <YouTubeVideo />

        {/* address, name, symbol info */}
        <TokenBriefInfo />
      </div>

      <div>
        <Chart />
      </div>

      {/* lock records */}
      {/* <LockRecords symbol={token.icon} /> */}

      {/* faq */}
      <div className="lg:mb-32 lg:mt-12">
        <MinimalisticFaq
          items={[
            {
              title:
                "Is there a minimum and maximum purchase amount for $MPAD?",
              content:
                "The minimum purchase amount is 0.01 SOL and the maximum purchase amount is 100 SOL.",
            },
            {
              title: "Where can I find more information about $MPAD?",
              content:
                "For detailed information about $MPAD, you should read the whitepaper, visit the official website’s about page, and join the official Telegram community or social media channels.",
            },
            {
              title: "How can I buy $MPAD?",
              content:
                "For a detailed guide explaining how to purchase $MPAD, check out our step-by-step guide here.",
            },
            {
              title: "Wen tge?",
              content: "The TGE is on the 24th of June.",
            },
            {
              title: "What vesting?",
              content: "There will be a 15% TGE and a 1 month vesting period.",
            },
            {
              title: "What x at launch?",
              content: "Who knows, it's all about the hype!",
            },
            {
              title: "What IMC?",
              content: "The initial market cap (IMC) is 352k.",
            },
            {
              title: "What FDV?",
              content: "The fully diluted valuation (FDV) is 5 million.",
            },
            {
              title: "How long do I have to ape in?",
              content:
                "You have until the raise is full or until Tuesday, whichever comes first.",
            },
          ]}
        />
      </div>
    </div>
  );
};

export default TokenInfo;
