import React from "react";

interface InfoCardProps {
  backgroundColor: string;
  shadowColor: string;
  label: string;
  value: any;
  imgSrc?: string;
  imgAlt?: string;
  textColor: string;
}

const InfoCard: React.FC<InfoCardProps> = ({
  backgroundColor,
  shadowColor,
  label,
  value,
  imgSrc,
  imgAlt,
  textColor,
}) => {
  return (
    <div
      className="p-4 px-8 flex-grow h-[6rem]"
      style={{ backgroundColor, boxShadow: `8px 8px 0px 0px ${shadowColor}` }}
    >
      <div className="flex items-center gap-4 h-full">
        {imgSrc && (
          <div
            className="flex items-center justify-center w-[67px] h-[67px] rounded-full"
            style={{ backgroundColor: shadowColor }}
          >
            <img src={imgSrc} alt={imgAlt} />
          </div>
        )}
        <div
          className="flex flex-col justify-start h-full py-2"
          style={{ color: textColor }}
        >
          <p className="font-lato text-[16px] opacity-[80%]">{label}</p>
          <p className="font-broad text-[20px] bg-transparent border-none focus-visible:outline-none">
            {value || "Not Set"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default InfoCard;
