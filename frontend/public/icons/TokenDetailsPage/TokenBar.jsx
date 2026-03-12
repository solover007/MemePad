/* eslint-disable react/prop-types */
const TokenBar = ({ currentRaised, hardCap, className, color, tokenStatus }) => (
  <>
    {tokenStatus === "presale" ? (
      <svg
        className={className}
        viewBox="0 0 467 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g filter="url(#filter0_d_4647_44185)">
          <rect
            x="0.333008"
            y="0.667969"
            width="461.926"
            height="18.9336"
            fill="#D9D9D9"
          />
          <rect
            x="1.98569"
            y="2.32066"
            width="458.621"
            height="15.6282"
            stroke="black"
            strokeWidth="3.30537"
          />
        </g>
        <rect
          x="1.98569"
          y="2.32066"
          width={`${currentRaised / hardCap * 100}%`}
          height="15.6282"
          fill={color}
          stroke="black"
          strokeWidth="3.30537"
        />
        <defs>
          <filter
            id="filter0_d_4647_44185"
            x="0.333008"
            y="0.667969"
            width="465.926"
            height="22.9336"
            filterUnits="userSpaceOnUse"
            colorInterpolationFilters="sRGB"
          >
            <feFlood floodOpacity="0" result="BackgroundImageFix" />
            <feColorMatrix
              in="SourceAlpha"
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
              result="hardAlpha"
            />
            <feOffset dx="4" dy="4" />
            <feComposite in2="hardAlpha" operator="out" />
            <feColorMatrix
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0"
            />
            <feBlend
              mode="normal"
              in2="BackgroundImageFix"
              result="effect1_dropShadow_4647_44185"
            />
            <feBlend
              mode="normal"
              in="SourceGraphic"
              in2="effect1_dropShadow_4647_44185"
              result="shape"
            />
          </filter>
        </defs>
      </svg>
    ) : tokenStatus === "not-started" ? (
      <svg
        className={className}
        viewBox="0 0 467 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g filter="url(#filter0_d_4589_44204)">
          <rect
            x="0.333008"
            y="0.667969"
            width="461.926"
            height="18.9336"
            fill="#666666"
          />
          <rect
            x="1.98569"
            y="2.32066"
            width="458.621"
            height="15.6282"
            stroke="black"
            strokeWidth="3.30537"
          />
        </g>
        <defs>
          <filter
            id="filter0_d_4589_44204"
            x="0.333008"
            y="0.667969"
            width="465.926"
            height="22.9336"
            filterUnits="userSpaceOnUse"
            colorInterpolationFilters="sRGB"
          >
            <feFlood floodOpacity="0" result="BackgroundImageFix" />
            <feColorMatrix
              in="SourceAlpha"
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
              result="hardAlpha"
            />
            <feOffset dx="4" dy="4" />
            <feComposite in2="hardAlpha" operator="out" />
            <feColorMatrix
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0"
            />
            <feBlend
              mode="normal"
              in2="BackgroundImageFix"
              result="effect1_dropShadow_4589_44204"
            />
            <feBlend
              mode="normal"
              in="SourceGraphic"
              in2="effect1_dropShadow_4589_44204"
              result="shape"
            />
          </filter>
        </defs>
      </svg>
    ) : tokenStatus === "launched" ? (
      <svg
        className={className}
        viewBox="0 0 457 19"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect
          x="1.98569"
          y="1.65269"
          width="452.695"
          height="15.6946"
          fill={color}
          stroke="black"
          strokeWidth="3.30537"
        />
      </svg>
    ) : tokenStatus === "finished" ? (
      <svg
        className={className}
        viewBox="0 0 467 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g filter="url(#filter0_d_4589_44279)">
          <rect
            x="0.333008"
            y="0.667969"
            width="461.926"
            height="18.9336"
            fill="#D9D9D9"
          />
          <rect
            x="1.98569"
            y="2.32066"
            width="458.621"
            height="15.6282"
            stroke="black"
            strokeWidth="3.30537"
          />
        </g>
        <rect
          x="1.98569"
          y="2.65269"
          width="445.695"
          height="15.6946"
          fill="#68FF9B"
          stroke="black"
          strokeWidth="3.30537"
        />
        <defs>
          <filter
            id="filter0_d_4589_44279"
            x="0.333008"
            y="0.667969"
            width="465.926"
            height="22.9336"
            filterUnits="userSpaceOnUse"
            colorInterpolationFilters="sRGB"
          >
            <feFlood floodOpacity="0" result="BackgroundImageFix" />
            <feColorMatrix
              in="SourceAlpha"
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
              result="hardAlpha"
            />
            <feOffset dx="4" dy="4" />
            <feComposite in2="hardAlpha" operator="out" />
            <feColorMatrix
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0"
            />
            <feBlend
              mode="normal"
              in2="BackgroundImageFix"
              result="effect1_dropShadow_4589_44279"
            />
            <feBlend
              mode="normal"
              in="SourceGraphic"
              in2="effect1_dropShadow_4589_44279"
              result="shape"
            />
          </filter>
        </defs>
      </svg>
    ) : (
      ""
    )}
  </>
);
export default TokenBar;
