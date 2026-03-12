
import JoinNowButton from "../../Shared/JoinNowButton";

const WhyMemePadMobile = () => {
  return (
    <div className="pt-10 pb-14 relative">
      {/* text section */}
      <div className="z-50 relative text-white space-y-4 mb-10 lg:text-start lg:w-[500px]">
        <h1 className="text-[45px] text-center font-extrabold font-lato text-stroke-1-white">
          WHY{" "}
          <span className="text-[#A393FE] font-broad font-extrabold text-stroke-3-purple">
            MeME PAD
          </span>
        </h1>
        <p className="text-base pb-8">
          <span className="font-extrabold">MEMEPAD</span> is setting{" "}
          <span className="font-extrabold">a new standard</span> for future
          memecoins entering the ecosystem. It stands as a beacon,{" "}
          <span className="font-extrabold">safeguarding investors</span> from
          the pitfalls of rugpulls, scams, and inactive teams that have plagued
          the crypto world.
        </p>
      </div>
      {/* timer */}
     
      {/* Join now button */}
      <div className="flex justify-start mt-0 ml-28 md:ml-[265px]">
        <JoinNowButton text="JoIN" design="two" color="#00FFC4" />
      </div>
      {/* waves svg */}
      <svg
        width="410"
        height="558"
        className="absolute -bottom-[5%] -left-[5%]"
        viewBox="0 0 410 558"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g opacity="0.56">
          <g clipPath="url(#clip0_2517_6053)">
            <path
              opacity="0.54"
              d="M20.0944 740.575L-5.26439 646.747C-13.7899 615.203 -41.4447 592.586 -74.0401 590.5V590.5C-90.2016 589.465 -105.616 583.312 -118.051 572.93L-147.638 548.227C-158.979 538.759 -172.739 532.652 -187.365 530.596L-194.251 529.628C-214.022 526.85 -231.418 515.123 -241.417 497.834V497.834"
              stroke="#B200C2"
              strokeWidth="6.28667"
            />
            <path
              opacity="0.54"
              d="M48.177 712.62L22.6989 619.092C14.111 587.567 -13.5333 564.968 -46.1232 562.83V562.83C-62.273 561.771 -77.6721 555.615 -90.106 545.248L-119.727 520.55C-131.07 511.093 -144.821 504.985 -159.438 502.909L-166.332 501.931C-186.088 499.126 -203.469 487.414 -213.492 470.151V470.151"
              stroke="#B200C2"
              strokeWidth="9.43001"
            />
            <path
              opacity="0.54"
              d="M82.1179 688.542L56.759 594.714C48.2336 563.17 20.5788 540.552 -12.0167 538.466V538.466C-28.1782 537.432 -43.5924 531.278 -56.0272 520.897L-85.6149 496.194C-96.9553 486.726 -110.716 480.619 -125.342 478.563L-132.228 477.595C-151.999 474.816 -169.394 463.09 -179.393 445.801V445.801"
              stroke="#B200C2"
              strokeWidth="12.5733"
            />
            <path
              opacity="0.5"
              d="M121.68 667.219L96.3215 573.392C87.7961 541.847 60.1413 519.23 27.5458 517.144V517.144C11.3843 516.11 -4.0299 509.956 -16.4647 499.574L-46.0524 474.871C-57.3928 465.403 -71.1533 459.296 -85.7792 457.241L-92.6654 456.273C-112.437 453.494 -129.832 441.768 -139.831 424.478V424.478"
              stroke="#B200C2"
              strokeWidth="15.7167"
            />
            <path
              opacity="0.54"
              d="M156.746 643.298L129.38 542.043C120.18 508.001 90.3355 483.593 55.1597 481.342V481.342C37.7188 480.226 21.0843 473.585 7.66512 462.381L-24.265 435.723C-36.503 425.505 -51.353 418.915 -67.1366 416.697L-74.568 415.652C-95.9043 412.653 -114.677 399.999 -125.467 381.34V381.34"
              stroke="#B200C2"
              strokeWidth="18.86"
            />
            <path
              opacity="0.54"
              d="M210.282 620.985L182.915 519.73C173.715 485.689 143.871 461.281 108.695 459.03V459.03C91.2539 457.913 74.6194 451.273 61.2003 440.069L29.2702 413.41C17.0321 403.193 2.18218 396.602 -13.6015 394.384L-21.0328 393.34C-42.3691 390.341 -61.1414 377.686 -71.9321 359.028V359.028"
              stroke="#B200C2"
              strokeWidth="22.0034"
            />
            <path
              opacity="0.54"
              d="M241.627 577.378L214.261 476.123C205.06 442.081 175.216 417.673 140.041 415.422V415.422C122.6 414.306 105.965 407.665 92.546 396.462L60.6159 369.803C48.3778 359.585 33.5279 352.995 17.7442 350.777L10.3129 349.732C-11.0234 346.733 -29.7957 334.079 -40.5864 315.421V315.421"
              stroke="#B200C2"
              strokeWidth="28.29"
            />
          </g>
        </g>
        <defs>
          <clipPath id="clip0_2517_6053">
            <rect y="0.320312" width="410" height="557" rx="20" fill="white" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
};
export default WhyMemePadMobile;
