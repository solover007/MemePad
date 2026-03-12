import type { Config } from "tailwindcss";
import { nextui } from "@nextui-org/react";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    variants: {
      filter: ["responsive", "hover", "focus"],
    },
    extend: {
      screens: {
        sm: "424px",
      },
      // Assuming these are the common sizes and colors needed
      textStrokeWidth: {
        0: "0.1px",
        1: "1px",
        2: "2px",
        3: "3px",
        4: "4px",
        5: "5px",
      },
      textStrokeColor: {
        black: "#000",
        white: "#fff",
        red: "#f00",
      },
      colors: {
        white: {
          DEFAULT: "#FFFFFF",
          off: "#FAFAF2",
        },
        teal: {
          DEFAULT: "#57F0CD",
        },
        purple: {
          DEFAULT: "#685AC9",
          one: "#8D7CEE",
          two: "#8575E2",
        },
        black: {
          DEFAULT: "#000000",
        },
        blue: {
          DEFAULT: "#4199EA",
        },
        darkblue: {
          DEFAULT: "#1E134D",
        },
        pink: {
          DEFAULT: "#D89BFF",
        },
        gray: {
          DEFAULT: "#CACACA",
        },
        bannerBG: {
          DEFAULT: "#7A64F4",
        },
      },
      fontFamily: {
        lato: ["Lato", "sans-serif"],
        bungee: ["Bungee Spice", "sans-serif"],
        peanut: ["Peanut Donuts"],
        broad: ["Broad"],
        bradley: ["Bradley Hand"],
      },
      fontWeight: {
        thin: "100",
        extralight: "200",
        light: "300",
        normal: "400",
        medium: "500",
        semibold: "600",
        bold: "700",
        extrabold: "800",
        black: "900",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "products-bg": "url('/images/sh2/Subtract.svg')",
        "mobile-bg": "url('/images/mobileVersion.svg')",
        "tablet-bg": "url('/images/tabletProductsBG.svg')",
        "btn-whitepaper-launchpad":
          "url('/icons/Launchpad/bg-whitepaper-launchpad.svg')",
        "grid-launchpad": "url('/icons/Launchpad/grid.svg')",
        "btn-view-full-list":
          "url('/icons/Launchpad/bg-btn-view-full-list.svg')",
        "page-launchpad": "url('/icons/Launchpad/bg-page.svg')",
        "launchpad-background": "url('/icons/Launchpad/LaunchpadTopBg.svg')",
        "dashboard-background": "url('/icons/Dashboard/dashboardBg.svg')",
        "dashboard-background-mobile":
          "url('/icons/Dashboard/dashboardBgMobile.svg')",
        // "launchpad-background": "url('/images/LaunchpadMVBg.png')",
        "learn-more-btn": "url('/icons/Launchpad/LearnMoreBtn.svg')",
        "submit-project-btn": "url('/icons/Launchpad/SubmitProjectBtn.svg')",
        "submit-project-btn-mobile":
          "url('/icons/Launchpad/SubmitProjectMobile.svg')",
        "learn-more-mobile": "url('/icons/Launchpad/LearnMoreMobile.svg')",
        "how-it-works": "url('/icons/Launchpad/howItWorksBg.svg')",
        "how-it-works-mobile": "url('/icons/Launchpad/HowItWorksMobile.svg')",
        "how-it-works-bottom-mobile":
          "url('/icons/Launchpad/howItWorksBottomBgMobile.svg')",
        "triangle-background": "url('/icons/Staking/stakingPageBg.svg')",
        "grid-hiw-mobile": "url('/icons/Launchpad/grid-hiw-mobile.svg')",
        memberships: "url('/icons/Memberships/bg-memberships.png')",
        "memberships-mobile":
          "url('/icons/Memberships/bg-memberships-mobile.png')",
        "membership-page": "url('/icons/Memberships/membershipPageBg.svg')",
        "grid-memberships": "url('/icons/Memberships/bg-grid-memberships.svg')",
        "cloud-farming-staking": "url('/icons/Staking/bg-cloud.svg')",
        "farming-staking-mobile":
          "url('/icons/Staking/bg-farming-staking-mobile.png')",
        "cloud-farming-staking-mobile":
          "url('/icons/Staking/bg-cloud-mobile.svg')",
        "welcome-to-passive": "url('/icons/Staking/bg-welcome-to-passive.svg')",
        ellipse: "url('/icons/Staking/bg-ellipse.svg')",
        "ellipse-black": "url('/icons/Staking/bg-ellipse-black.svg')",
        airdrop: "url('/icons/Airdrop/bg-airdrop.svg')",
        "line-airdrop": "url('/icons/Airdrop/bg-line.svg')",
        "grid-airdrop": "url('/icons/Airdrop/bg-grid.svg')",
        "content-airdrop-new": "url('/icons/Airdrop/bg-airdrop-new.svg')",
        "content-airdrop": "url('/icons/Airdrop/bg-airdrop.svg')",
        "content-airdrop-mobile": "url('/icons/Airdrop/bg-content-mobile.svg')",
        "polygon-banner": "url('/icons/HomeSectionTwo/bg-polygon-banner.svg')",
        "home-section-two":
          "url('/icons/HomeSectionTwo/bg-home-section-two.svg')",
        "token-banner": "url(/icons/TokenPage/BannerBG.svg)",
        "token-banner-mobile": "url(/icons/TokenPage/TokenPageMobile.svg)",
        "gradient-home-brief":
          "linear-gradient(to bottom, #FAFAF2, #F3F1F3, #7965E7)",
        "home-bg": "url('/icons/HomeSectionBrief/background.svg')",
        "top-banner": "url('/icons/HomeSectionBrief/top-banner-bg.svg')",
        "home-bg-section-two":
          "url('/icons/HomeSectionBrief/background-section-two.svg')",
        "home-bg-section-two-vector":
          "url('/icons/HomeSectionBrief/bg-go-to-launchpad.svg')",
        "btn-go-to-launchpad":
          "url('/icons/HomeSectionBrief/bg-go-to-launchpad.svg')",
        "gradient-home-brief-two":
          "linear-gradient(to bottom, #F1F1E8, #FDFDFD)",
        "btn-learn-more": "url('/icons/HomeSectionBrief/learn-more.svg')",
        "home-bg-section-our-product":
          "url('/icons/HomeSectionBrief/background-section-our-product.svg')",
        "home-bg-section-our-product-title":
          "url('/icons/HomeSectionBrief/our-product-title.svg')",
        "home-bg-section-our-product-title-new":
          "url('/icons/HomeSectionBrief/productTitle.svg')",
        "home-bg-section-sq":
          "url('/icons/HomeSectionBrief/background-security-quality.svg')",
        "home-bg-section-token": "url('/icons/HomeSectionBrief/bg-token.svg')",
        "gradient-token":
          "linear-gradient(180deg, #8D7AFF 39.5%, #000000 69.5%)",
        "gradient-about-one": "linear-gradient(to bottom, #FFFFFF, #F1F1E8)",
        "gradient-about-two":
          "linear-gradient(360deg, #F1F1E8 17.5%, #8C79FF 34.5%)",
        "grid-header-about": "url('/icons/AboutBrief/header-grid.svg')",
        "note-subtract-about": "url('/icons/AboutBrief/note-subtract.svg')",
        "gradient-about-three":
          "linear-gradient(180deg, #F1F1E8 15%, #A393FE 47.5%)",
        "grid-timeline": "url('/icons/AirdropBrief/timeline-grid.svg')",
        "grid-timeline-mobile":
          "url('/icons/AirdropBrief/timeline-mobile.svg')",
        "our-product-mobile":
          "linear-gradient(180deg, #A393FE 6.6%, #F2F2E9 36.83%)",
        "how-it-works-infinity": "url('/icons/Launchpad/hiw-infinity.svg')",
        "gradient-sidebar": "url('/images/dashboard-token-sidebar.png')",
        "dashboard-token-listing": "url('/images/dashboard-token-listing.png')",
        "token-modal-bg": "url('/icons/TokenDetailsPage/mainBG.png')",
        "token-modal-second-bg": "url('/icons/TokenDetailsPage/SecondBG.png')",
      },
    },
  },
  maxWidth: {
    "8xl": "90rem", // 1920px = 120rem // 90rem = 1440px
  },
  screens: {
    "3xl": "1920px",
    "4xl": "2560px",
  },
  darkMode: "class",
  plugins: [
    nextui(),
    require("@tailwindcss/typography"),
    function ({
      addUtilities,
      theme,
      e,
    }: {
      addUtilities: any;
      theme: any;
      e: any;
    }) {
      const newUtilities = {};
      Object.entries(theme("textStrokeWidth")).forEach(([key, value]) => {
        Object.entries(theme("colors")).forEach(([colorName, colorValue]) => {
          const color =
            // @ts-ignore
            typeof colorValue === "object" && colorValue?.DEFAULT
              ? // @ts-ignore
                colorValue?.DEFAULT
              : colorValue;
          const name = `.text-stroke-${key}-${e(colorName)}`; // e.g., .text-stroke-2-purple
          // @ts-ignore
          newUtilities[name] = {
            "-webkit-text-strokeWidth": value,
            "-webkit-text-stroke-color": color,
          };
        });
      });
      addUtilities(newUtilities, ["responsive", "hover"]);
      addUtilities({
        ".rotate-y-180": {
          transform: "rotateY(180deg)",
        },
        ".preserve-3d": {
          transformStyle: "preserve-3d",
        },
        ".backface-hidden": {
          backfaceVisibility: "hidden",
        },
      });
      addUtilities({
        ".scrollbar-hidden": {
          "-ms-overflow-style": "none",
          "scrollbar-width": "none",
          "&::-webkit-scrollbar": {
            display: "none",
          },
        },
      });
    },
    require("daisyui"),
  ],
};
export default config;
