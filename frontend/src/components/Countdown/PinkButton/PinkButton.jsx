/* eslint-disable react/prop-types */
const PinkButton = ({ text, url }) => {
  return (
    <a href={url} target="_blank">
      <div className="relative  py-1 lg:w-[13rem] md:flex justify-end flex-row items-center text-left text-black z-[100]">
        <CopyButtonBg className="md:absolute relative block h-full lg:left-4 top-0 z-[99]" />
        <p className="absolute md:static top-[3%] -right-[15%] z-[100] font-extrabold mr-[32%] lg:mr-[9%] py-4 text-xs lg:text-lg uppercase">
          {text}
        </p>
      </div>
    </a>
  );
};

const CopyButtonBg = ({ className }) => (
  <svg
    viewBox="0 0 305 91"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`${className} w-36 h-full lg:w-full`}
  >
    <mask
      id="path-1-outside-1_2015_1931"
      maskUnits="userSpaceOnUse"
      x="55.9238"
      y="0"
      width="249"
      height="91"
      fill="black"
    >
      <rect fill="white" x="55.9238" width="249" height="91" />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M297.655 3L270.447 23.9851L297.911 45.1683V46.6447L270.447 67.8279L296.868 88.2059H58.9238V3H297.655Z"
      />
    </mask>
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M297.655 3L270.447 23.9851L297.911 45.1683V46.6447L270.447 67.8279L296.868 88.2059H58.9238V3H297.655Z"
      fill="#D89BFF"
    />
    <path
      d="M270.447 23.9851L268.948 22.041L266.427 23.9851L268.948 25.9292L270.447 23.9851ZM297.655 3L299.154 4.94412L304.858 0.544775H297.655V3ZM297.911 45.1683H300.367V43.9613L299.411 43.2242L297.911 45.1683ZM297.911 46.6447L299.411 48.5888L300.367 47.8516V46.6447H297.911ZM270.447 67.8279L268.948 65.8837L266.427 67.8279L268.948 69.772L270.447 67.8279ZM296.868 88.2059V90.6611H304.071L298.367 86.2618L296.868 88.2059ZM58.9238 88.2059H56.4686V90.6611H58.9238V88.2059ZM58.9238 3V0.544775H56.4686V3H58.9238ZM271.947 25.9292L299.154 4.94412L296.155 1.05588L268.948 22.041L271.947 25.9292ZM299.411 43.2242L271.947 22.041L268.948 25.9292L296.412 47.1124L299.411 43.2242ZM300.367 46.6447V45.1683H295.456V46.6447H300.367ZM271.947 69.772L299.411 48.5888L296.412 44.7006L268.948 65.8837L271.947 69.772ZM298.367 86.2618L271.947 65.8837L268.948 69.772L295.368 90.15L298.367 86.2618ZM58.9238 90.6611H296.868V85.7507H58.9238V90.6611ZM56.4686 3V88.2059H61.3791V3H56.4686ZM297.655 0.544775H58.9238V5.45522H297.655V0.544775Z"
      fill="black"
      mask="url(#path-1-outside-1_2015_1931)"
    />
  </svg>
);
export default PinkButton;
