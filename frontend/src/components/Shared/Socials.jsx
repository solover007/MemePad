/* eslint-disable react/prop-types */
import Email from "../HomeOld/SocialLinks/Email";
import Telegram from "../HomeOld/SocialLinks/Telegram";
import Twitter from "../HomeOld/SocialLinks/Twitter";

const Socials = ({ color, gap, textSize }) => {
  return (
    <div
      className={`flex items-center justify-center gap-${gap} text-${color}`}
    >
      <Twitter color={color} textSize={textSize} />
      <Telegram color={color} textSize={textSize} />
      <Email color={color} textSize={textSize} />
    </div>
  );
};
export default Socials;
