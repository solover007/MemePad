/* eslint-disable react/prop-types */
import Solana from "../../Solana/Solana";
import { useWallet } from "@solana/wallet-adapter-react";

const PayNowButton = ({ text, font, design, setIsModalOpen }) => {
  const { publicKey } = useWallet();

  return (
    <div className="flex justify-between items-center h-full">
      {publicKey ? (
        <button
          className="relative mt-12 md:mt-0 hover:scale-105 duration-200"
          onClick={() => setIsModalOpen(true)}
        >
          {
            design === "one" && <svg
            className="absolute w-32 md:w-[161px] -top-8"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 247 98"
            fill="none"
          >
            <g filter="url(#filter0_d_2348_2645)">
              <mask
                id="path-1-outside-1_2348_2645"
                maskUnits="userSpaceOnUse"
                x="0"
                y="0"
                width="247"
                height="86"
                fill="black"
              >
                <rect fill="white" width="247" height="86" />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M239.138 3L214.524 21.9851L241.988 43.168V44.645L214.524 65.8279L236.788 83H3V3H239.138Z"
                />
              </mask>
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M239.138 3L214.524 21.9851L241.988 43.168V44.645L214.524 65.8279L236.788 83H3V3H239.138Z"
                fill="#F7E05C"
              />
              <path
                d="M214.524 21.9851L213.024 20.041L210.504 21.9851L213.024 23.9292L214.524 21.9851ZM239.138 3L240.638 4.94412L246.341 0.544775H239.138V3ZM241.988 43.168H244.443V41.961L243.487 41.2239L241.988 43.168ZM241.988 44.645L243.487 46.5891L244.443 45.8519V44.645H241.988ZM214.524 65.8279L213.024 63.8837L210.504 65.8279L213.024 67.772L214.524 65.8279ZM236.788 83V85.4552H243.991L238.287 81.0559L236.788 83ZM3 83H0.544775V85.4552H3V83ZM3 3V0.544775H0.544775V3H3ZM216.023 23.9292L240.638 4.94412L237.639 1.05588L213.024 20.041L216.023 23.9292ZM243.487 41.2239L216.023 20.041L213.024 23.9292L240.488 45.1121L243.487 41.2239ZM244.443 44.645V43.168H239.532V44.645H244.443ZM216.023 67.772L243.487 46.5891L240.488 42.7008L213.024 63.8837L216.023 67.772ZM238.287 81.0559L216.023 63.8837L213.024 67.772L235.288 84.9441L238.287 81.0559ZM3 85.4552H236.788V80.5448H3V85.4552ZM0.544775 3V83H5.45522V3H0.544775ZM239.138 0.544775H3V5.45522H239.138V0.544775Z"
                fill="black"
                mask="url(#path-1-outside-1_2348_2645)"
              />
            </g>
            <defs>
              <filter
                id="filter0_d_2348_2645"
                x="0.544922"
                y="0.544769"
                width="245.797"
                height="96.9104"
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
                <feOffset dy="12" />
                <feComposite in2="hardAlpha" operator="out" />
                <feColorMatrix
                  type="matrix"
                  values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0"
                />
                <feBlend
                  mode="normal"
                  in2="BackgroundImageFix"
                  result="effect1_dropShadow_2348_2645"
                />
                <feBlend
                  mode="normal"
                  in="SourceGraphic"
                  in2="effect1_dropShadow_2348_2645"
                  result="shape"
                />
              </filter>
            </defs>
          </svg>
          }

          {
            design==="two" &&   <svg
            className="absolute w-32 md:w-[161px] -top-8"
            viewBox="0 0 248 98"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g filter="url(#filter0_d_2505_5648)">
              <mask
                id="path-1-outside-1_2505_5648"
                maskUnits="userSpaceOnUse"
                x="0"
                y="0"
                width="248"
                height="86"
                fill="black"
              >
                <rect fill="white" width="248" height="86" />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M31.9157 21.9846L4 43.5161V44.296L31.9157 65.8274L9.65127 83H237.788L215.524 65.8279L242.988 44.645V43.168L215.524 21.9851L240.138 3H7.30193L31.9157 21.9846Z"
                />
              </mask>
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M31.9157 21.9846L4 43.5161V44.296L31.9157 65.8274L9.65127 83H237.788L215.524 65.8279L242.988 44.645V43.168L215.524 21.9851L240.138 3H7.30193L31.9157 21.9846Z"
                fill="#F7E05C"
              />
              <path
                d="M4 43.5161L2.50049 41.5719L1.54478 42.3091V43.5161H4ZM31.9157 21.9846L33.4152 23.9288L35.9357 21.9846L33.4152 20.0405L31.9157 21.9846ZM4 44.296H1.54478V45.5029L2.50049 46.2401L4 44.296ZM31.9157 65.8274L33.4152 67.7715L35.9357 65.8274L33.4152 63.8833L31.9157 65.8274ZM9.65127 83L8.15176 81.0559L2.44798 85.4552H9.65127V83ZM237.788 83V85.4552H244.991L239.287 81.0559L237.788 83ZM215.524 65.8279L214.024 63.8837L211.504 65.8279L214.024 67.772L215.524 65.8279ZM242.988 44.645L244.487 46.5891L245.443 45.8519V44.645H242.988ZM242.988 43.168H245.443V41.961L244.487 41.2239L242.988 43.168ZM215.524 21.9851L214.024 20.041L211.504 21.9851L214.024 23.9292L215.524 21.9851ZM240.138 3L241.638 4.94412L247.341 0.544775H240.138V3ZM7.30193 3V0.544775H0.0986433L5.80242 4.94412L7.30193 3ZM5.49951 45.4602L33.4152 23.9288L30.4161 20.0405L2.50049 41.5719L5.49951 45.4602ZM6.45522 44.296V43.5161H1.54478V44.296H6.45522ZM2.50049 46.2401L30.4162 67.7715L33.4152 63.8833L5.49951 42.3519L2.50049 46.2401ZM30.4162 63.8833L8.15176 81.0559L11.1508 84.9441L33.4152 67.7715L30.4162 63.8833ZM237.788 80.5448H9.65127V85.4552H237.788V80.5448ZM214.024 67.772L236.288 84.9441L239.287 81.0559L217.023 63.8837L214.024 67.772ZM241.488 42.7008L214.024 63.8837L217.023 67.772L244.487 46.5891L241.488 42.7008ZM240.532 43.168V44.645H245.443V43.168H240.532ZM214.024 23.9292L241.488 45.1121L244.487 41.2239L217.023 20.041L214.024 23.9292ZM238.639 1.05588L214.024 20.041L217.023 23.9292L241.638 4.94412L238.639 1.05588ZM7.30193 5.45522H240.138V0.544775H7.30193V5.45522ZM33.4152 20.0405L8.80144 1.05588L5.80242 4.94412L30.4161 23.9288L33.4152 20.0405Z"
                fill="black"
                mask="url(#path-1-outside-1_2505_5648)"
              />
            </g>
            <defs>
              <filter
                id="filter0_d_2505_5648"
                x="0.0986328"
                y="0.544922"
                width="247.243"
                height="96.9102"
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
                <feOffset dy="12" />
                <feComposite in2="hardAlpha" operator="out" />
                <feColorMatrix
                  type="matrix"
                  values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0"
                />
                <feBlend
                  mode="normal"
                  in2="BackgroundImageFix"
                  result="effect1_dropShadow_2505_5648"
                />
                <feBlend
                  mode="normal"
                  in="SourceGraphic"
                  in2="effect1_dropShadow_2505_5648"
                  result="shape"
                />
              </filter>
            </defs>
          </svg>
          }
          <p
            className={`font-${font} ${design === "one" ? "md:left-2" : "md:left-6"} ml-2 md:ml-0 absolute text-black text-stroke-1-black -top-5 md:-top-4  font-bold md:text-[19px] whitespace-nowrap text-left z-50`}
          >
            {text}
          </p>
        </button>
      ) : (
        <Solana font={font} text={text} design={design} />
      )}
    </div>
  );
};
export default PayNowButton;
