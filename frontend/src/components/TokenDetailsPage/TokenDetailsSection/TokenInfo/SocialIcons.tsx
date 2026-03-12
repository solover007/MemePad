import InstaIcon from "@/public/icons/TokenDetailsPage/InstaIcon";
import TelegramIcon from "@/public/icons/TokenDetailsPage/TelegramIcon";
import TwitterIcon from "@/public/icons/TokenDetailsPage/TwitterIcon";
import WebIcon from "@/public/icons/TokenDetailsPage/WebIcon";
import Link from "next/link";

const SocialIcons = ({
  website,
  twitter,
  telegram,
  instagram,
}: {
  website?: string;
  twitter?: string;
  telegram?: string;
  instagram?: string;
}) => {
  return (
    <div className="flex gap-4 items-center justify-center">
      {website && (
        <Link href={website}>
          <WebIcon className="w-6" />
        </Link>
      )}
      {twitter && (
        <Link href={twitter}>
          <TwitterIcon className="w-6" />
        </Link>
      )}
      {telegram && (
        <Link href={telegram}>
          <TelegramIcon className="w-6" />
        </Link>
      )}
      {instagram && (
        <Link href={instagram}>
          <InstaIcon className="w-6" />
        </Link>
      )}
    </div>
  );
};
export default SocialIcons;
