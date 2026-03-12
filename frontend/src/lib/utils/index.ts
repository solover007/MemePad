export async function copyTextToClipboard(text: string) {
  if (!navigator.clipboard) {
    // Fallback for older browsers
    const textArea = document?.createElement("textarea");
    textArea.value = text;
    document?.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    try {
      //@ts-ignore
      const successful = document?.("copy");
      document?.body.removeChild(textArea);
      return successful;
    } catch (err) {
      console.error("Fallback: Oops, unable to copy", err);
      document?.body.removeChild(textArea);
      return false;
    }
  }

  try {
    await navigator.clipboard.writeText(text);
    console.log("Text successfully copied to clipboard");
    return true;
  } catch (err) {
    console.error("Could not copy text: ", err);
    return false;
  }
}

export function shortenWalletAddress(address = '', chars = 4) {
  if (!address) return "";

  // const isValidAddress =
  //   typeof address === "string" && address.startsWith("0x");
  // if (!isValidAddress) return "Invalid address";

  if (address.length <= chars * 2) return address;

  return `${address.substring(0, chars + 2)}...${address.substring(
    address.length - chars,
  )}`;
}

export const secondsToTimeFormat = (unix_timestamp = 0) => {
  if (unix_timestamp == 0) return "";

  const date = new Date(unix_timestamp * 1000);
  let h: any = date.getHours();
  h = h < 10 ? "0" + h : h;
  let m: any = date.getMinutes();
  m = m < 10 ? "0" + m : m;
  let s: any = date.getSeconds();
  s = s < 10 ? "0" + s : s;

  return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}, ${h}:${m}:${s}`;
};

export function numberWithCommas(x: number) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

// Round to 3 decimals only if there are 3 or more decimals
export function getRoundedValue(result: number, decimals = 3) {
  if (isNaN(result)) {
    return "";
  }
  return String(Math.floor(result * Math.pow(10, decimals)) / Math.pow(10, decimals))
}

export const ThreeDCardEffect = () => {
  const cards = document.querySelectorAll(".card-MPAD");

  function rotateToMouse(e: any, bounds: any, $card: any) {
    const mouseX = e.clientX;
    const mouseY = e.clientY;
    const leftX = mouseX - bounds.x;
    const topY = mouseY - bounds.y;
    const center = {
      x: leftX - bounds.width / 2,
      y: topY - bounds.height / 2,
    };
    const distance = Math.sqrt(center.x ** 2 + center.y ** 2);

    $card.style.transform = `
      scale3d(1.07, 1.07, 1.07)
      rotate3d(
        ${center.y / 100},
        ${-center.x / 100},
        0,
        ${Math.log(distance) * 2}deg
      )
    `;
  }

  cards.forEach(($card: any) => {
    let bounds: any;

    function onMouseMove(e: any) {
      rotateToMouse(e, bounds, $card);
    }

    $card.addEventListener("mouseenter", () => {
      bounds = $card.getBoundingClientRect();
      document.addEventListener("mousemove", onMouseMove);
    });

    $card.addEventListener("mouseleave", () => {
      document.removeEventListener("mousemove", onMouseMove);
      $card.style.transform = "";
    });
  });

  // Cleanup function to remove event listeners
  return () => {
    cards.forEach(($card: any) => {
      $card.removeEventListener("mouseenter", () => {
        // bounds = $card.getBoundingClientRect();
        //@ts-ignore
        document.addEventListener("mousemove", onMouseMove);
      });
      $card.removeEventListener("mouseleave", () => {
        //@ts-ignore
        document.removeEventListener("mousemove", onMouseMove);
        $card.style.transform = "";
      });
    });
  };
};

export function convertDurationToSeconds(duration: string): number {
  if (!duration) {
    return 0;
  }

  const regex = /(\d+mo)?(\d+d)?(\d+h)?(\d+m)?(\d+s)?/;
  const matches = duration.match(regex);
  if (!matches) {
    throw new Error("Invalid duration format");
  }

  const months = matches[1] ? parseInt(matches[1].replace('mo', ''), 10) : 0;
  const days = matches[2] ? parseInt(matches[2].replace('d', ''), 10) : 0;
  const hours = matches[3] ? parseInt(matches[3].replace('h', ''), 10) : 0;
  const minutes = matches[4] ? parseInt(matches[4].replace('m', ''), 10) : 0;
  const seconds = matches[5] ? parseInt(matches[5].replace('s', ''), 10) : 0;

  const totalSeconds = 
    (months * 30.44 * 24 * 60 * 60) + 
    (days * 24 * 60 * 60) + 
    (hours * 60 * 60) + 
    (minutes * 60) + 
    seconds;
  return Math.round(totalSeconds);
}

export const isMetamaskBrowser = () =>
  typeof window !== "undefined"
    ? /(MetaMaskMobile)/i.test(window?.navigator?.userAgent)
    : false;

export const isApple = () => {
  return typeof window !== "undefined"
    ? [
        "iPad Simulator",
        "iPhone Simulator",
        "iPod Simulator",
        "iPad",
        "iPhone",
        "iPod",
      ].includes(window.navigator.platform) ||
        (window.navigator.userAgent.includes("Mac") && "ontouchend" in document)
    : false;
};

export const isSolflareApp = () =>
  // @ts-ignore
  typeof window !== "undefined" &&
  ("SolflareApp" in window ||
    // @ts-ignore
    ("solflare" in window && window.solflare?.isSolflare));

export const isPhantomBrowser = () =>
  typeof window !== "undefined"
    ? /(Phantom)/i.test(window?.navigator?.userAgent)
    : false;

// check if trustwallet is in window object
export const isTrustWalletBrowser = () =>
  typeof window !== "undefined" && "trustwallet" in window;

export const isMobile = () =>
  typeof window !== "undefined" &&
  /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator?.userAgent,
  );

export const getOpenTarget = (): string => {
  if (
    isMobile() &&
    (isMetamaskBrowser() || isSolflareApp())
  )
    return "_self";

  return "_blank";
};

export const formatWalletAddress = (address: string, size = 10) => {
  if (!address || address.length <= size) return address;
  return `${address.slice(0, size - 4)}...${address.slice(-4)}`;
};

export const formatNumber = (num: number) => {
  if (Number.isNaN(num)) return "0";

  return num?.toLocaleString() ?? "0";
};

export const formatLongNum = (num: number) => {
  if (num !== 0 && num < 0.0001) return "< 0.0001";

  return num?.toLocaleString(undefined, {
    maximumSignificantDigits: 5,
  });
};
