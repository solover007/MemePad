import { createContext, useContext, useEffect, useState } from "react";
// import { useSearchParams } from "next/navigation";
import { WalletIcon } from "@solana/wallet-adapter-react-ui";
import { encode } from "bs58";
import { useWallet as useSolanaWallet } from "@solana/wallet-adapter-react";
import {
  IUser,
  IValidateLoginFlowRequest,
  newLoginFlow,
  useUser,
  useUser as useUserApi,
  validateLoginFlow,
} from "@/lib/api";
import { isMobile, isPhantomBrowser, isSolflareApp } from "@/lib/utils";
import Modal from "@/components/ui/Modal";
import { toast } from "react-toastify";
import { WalletError } from "@solana/wallet-adapter-base";
import "./ConnectWallet.Module.css";

type SignFunction = (data: any) => Promise<Uint8Array>;

interface AuthContextProps {
  login: () => void;
  logout: () => void;
  fetchUser: () => Promise<void>;
  isLoggedIn: boolean;
  user?: IUser;
}

const AuthContext = createContext<AuthContextProps>({} as AuthContextProps);

const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  // const query = useSearchParams();
  const {
    publicKey,
    signMessage: signSolMessage,
    connect,
    disconnect,
    connected,
    wallet,
    wallets,
    select,
  } = useSolanaWallet();
  const { data: _user, refresh: refreshUser } = useUserApi();
  const { data: user, refresh } = useUser();

  const [loginClick, setLoginClick] = useState(false);
  const [solanaModalOpen, setSolanaModalOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    if (user) {
      connect();
    }
  }, [user]);

  useEffect(() => {
    const processSolanaLogin = async () => {
      if (connected && user?.wallet == publicKey?.toString()) return;

      if (isMobile()) handleMobileLogin();
      else await handleDesktopLogin();

      setLoginClick(connected && user?.wallet == publicKey?.toString());
    };

    if (loginClick) processSolanaLogin();
  }, [loginClick, connected, publicKey, signSolMessage]);

  const logout = (noRefresh: boolean = false) => {
    disconnect();
    if (!noRefresh) window.location.href = "/";
  };

  useEffect(() => {
    setIsLoggedIn(connected && user?.wallet == publicKey?.toString());
  }, [connected, user?.wallet, publicKey]);

  const login = () => {
    setSolanaModalOpen(true);
  };

  const fetchUser = async () => refreshUser();

  const handleMobileLogin = async () => {
    const { origin, search } = window.location;
    const fullUrl = encodeURIComponent(origin + search);
    const walletName = wallet?.adapter.name;

    if (walletName === "Phantom" && !isPhantomBrowser()) {
      window.open(`https://phantom.app/ul/browse/${fullUrl}`);
      return;
    } else if (walletName === "Solflare" && !isSolflareApp()) {
      window.open(
        `https://solflare.com/ul/browse/?url=${fullUrl}&ref=${origin}`,
      );
      return;
    }

    await handleDesktopLogin();
  };

  const handleDesktopLogin = async () => {
    if (!connected) await connect();

    // const referral_code = query.get("ref") || localStorage.getItem("ref") || "";

    let referral_code = "";
    if (typeof window !== "undefined") {
      const urlParams = new URLSearchParams(window.location.search);
      referral_code = urlParams.get("ref") || localStorage.getItem("ref") || "";
    }

    if (!signSolMessage) {
      // Usually resolves itself, so no need to alert user
      return;
    }

    await signAndProceed(referral_code);
    await refresh();
  };

  const signAndProceed = async (referral_code: string) => {
    try {
      if (!publicKey || !signSolMessage) {
        toast("Please connect your wallet", { type: "error" });
        return;
      }

      const { challenge } = await newLoginFlow({
        wallet: publicKey.toString(),
        referral: referral_code,
      });
      console.log("Challenge: ", challenge);

      const challengeArray = new TextEncoder().encode(challenge);

      const signature = await signSolMessage(challengeArray);
      if (signature) {
        const loginDetails: IValidateLoginFlowRequest = {
          wallet: publicKey.toString(),
          signature: encode(signature),
          challenge,
        };

        const validated = await validateLoginFlow(loginDetails);
        if (validated.success) {
          toast("Login successful", { type: "success" });
        } else {
          toast("Login failed: " + validated?.error, { type: "error" });
        }
      }
    } catch (e: any) {
      handleLoginError(e);
    }
  };

  const handleLoginError = (e: WalletError | any) => {
    const errorMessage = e?.message?.toLowerCase();

    if (errorMessage?.includes("rejected the request")) {
      toast("No tokens for you then...", { type: "error" });
    } else if (errorMessage?.includes("invalid account")) {
      toast(
        "It looks like you switched accounts in your wallet. Please refresh the page and try again.",
        { type: "error" },
      );
    } else {
      console.error("Failed to sign login request:", errorMessage);
      toast(
        "Try refreshing, an error occurred while signing message: " +
          errorMessage,
        {
          type: "error",
        },
      );
    }
  };

  return (
    <AuthContext.Provider
      value={{
        login,
        logout,
        fetchUser,
        isLoggedIn,
        user,
      }}
    >
      <Modal isOpen={solanaModalOpen} onClose={() => setSolanaModalOpen(false)}>
        <h2 className="text-center -mt-5 font-bold font-broad text-2xl text-black">
          SeLECT WaLLeT
        </h2>
        <div className="flex flex-col font-broad mt-6 max-w-sm w-full mx-auto gap-4">
          {wallets.map((wallet) => (
            <button
              key={wallet.adapter.name}
              className="connect-wallet-modal bg-white w-full rounded-lg flex items-center justify-between p-4 duration-150"
              onClick={() => {
                // disconnect();
                select(wallet.adapter.name);
                setLoginClick(true);
                setSolanaModalOpen(false);
              }}
            >
              <p className="wallet-name text-lg font-medium text-black duration-150 uppercase">
                {wallet.adapter.name}
              </p>
              <WalletIcon
                wallet={wallet}
                className="w-8 wallet-icon duration-150"
              />
            </button>
          ))}
        </div>
      </Modal>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error("useUser must be used within a AuthProvider");
  }

  return context;
};

export { AuthProvider, useAuth };
