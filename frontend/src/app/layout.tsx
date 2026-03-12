import type { Metadata } from "next";
import "./globals.css";
import Providers from "./Providers";
import Script from "next/script";
import { TWITTER_USERNAME } from "@/lib/utils/constants";

const ogImage = {
  url: "/themes/memepad/og_image.jpg",
  width: 1200,
  height: 628,
  alt: "MemePad",
};
const description = "MEMEPad. The RUG Proof Launchpad for Meme Tokens";

export const metadata: Metadata = {
  title: "Memepad",
  description: description,
  metadataBase: new URL("https://memepad.ai"),

  openGraph: {
    images: ogImage ?? undefined,
    description: description,
  },

  twitter: {
    card: "summary_large_image",
    creator: "@" + TWITTER_USERNAME,
    title: TWITTER_USERNAME,
    description: description,
    images: ogImage ?? undefined,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="light">
      <head>
        <meta charSet="UTF-8" />
        <link rel="icon" href="/favicon-big.png" type="image/png" />
        <Script id="google-analytics">
          {`
	  if (window.location.host === "memepad.ai") {
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
 
            gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID}');
	  }
        `}
        </Script>
      </head>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
