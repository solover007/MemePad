/* eslint-disable react/prop-types */
import { EMAIL } from "@/lib/utils/constants";

const Email = ({color}) => {
  return (
    <a className="z-50 flex items-center gap-1 font-bold hover:cursor-pointer">
      <svg
        xmlns="http://www.w3.org/2000/svg"
      className="w-5 md:w-7"
        viewBox="0 0 44 45"
        fill="none"
      >
        <path
          d="M36.666 7.83325H7.33268C5.31602 7.83325 3.68435 9.48325 3.68435 11.4999L3.66602 33.4999C3.66602 35.5166 5.31602 37.1666 7.33268 37.1666H36.666C38.6827 37.1666 40.3327 35.5166 40.3327 33.4999V11.4999C40.3327 9.48325 38.6827 7.83325 36.666 7.83325ZM36.666 15.1666L21.9993 24.3333L7.33268 15.1666V11.4999L21.9993 20.6666L36.666 11.4999V15.1666Z"
          fill={color}
        />
      </svg>
      <p className={`text-[10px] md:text-sm`}>{EMAIL}</p>
    </a>
  );
};
export default Email;
