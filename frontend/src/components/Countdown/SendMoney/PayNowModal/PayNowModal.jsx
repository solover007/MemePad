/* eslint-disable react/prop-types */
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import confetti from 'canvas-confetti';

// import logo
import logo from "@/public/images/solana-logo-round-black.png";
import { useCallback } from "react";

import { toast } from "react-toastify";

import {
  Connection,
  LAMPORTS_PER_SOL,
  PublicKey,
  SystemProgram,
  Transaction,
} from "@solana/web3.js";
import { useWallet } from "@solana/wallet-adapter-react";
import { WalletNotConnectedError } from "@solana/wallet-adapter-base";
import { PRE_SALE_ADDRESS } from "@/lib/utils/constants";
import SolAmount from "./SolAmount";

let theWallet = PRE_SALE_ADDRESS;

const RPC_URL = process.env.NEXT_PUBLIC_RPC_URL;
const connection = new Connection(RPC_URL);

const PayNowModal = ({ isModalOpen, setIsModalOpen }) => {
  const [customAmount, setCustomAmount] = useState(false);
  const [solSelected, setSolSelected] = useState(1);
  const { publicKey, sendTransaction } = useWallet();

  const onClick = useCallback(async () => {
    if (!publicKey) {
      toast.error("Connect your wallet");
      throw new WalletNotConnectedError();
    } else if (solSelected === 0) {
      return toast.error("Select an amount");
    }

    let lamportsI = LAMPORTS_PER_SOL * solSelected;

    const recentBlockhash = await connection.getLatestBlockhash();
    const transaction = new Transaction().add(
      SystemProgram.transfer({
        fromPubkey: publicKey,
        toPubkey: new PublicKey(theWallet),
        lamports: lamportsI,
      }),
    );
    transaction.recentsBlockhash = recentBlockhash.blockhash;
    transaction.feePayer = publicKey;

    const signature = await sendTransaction(transaction, connection);

    toast.success("Sending tx, hang on a sec...");
    toast.success("Thank you for your trust!");

    const res = await connection.confirmTransaction(signature, "processed");
    console.log(res);
    if (!res?.value?.err) {
      toast.success("APED IN!");
      confetti();
      setCustomAmount(false);
    }
  }, [publicKey, sendTransaction, connection, solSelected]);

  // handle sol amount
  const handleSolAmount = (amount) => {
    setSolSelected(Number(amount));
  };

  // handle custom sol amount
  const handleCustomSol = () => {
    setCustomAmount(true);
  };

  // modal close
  function closeModal() {
    setIsModalOpen(false);
  }

  return (
    <>
      <Transition appear show={isModalOpen} as={Fragment}>
        <Dialog as="div" className="relative z-[2000]" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <div onClick={closeModal} className="flex justify-end">
                    <p className=" bg-pink btn btn-sm text-white mb-5 font-bold">
                      X
                    </p>
                  </div>

                  <h3 className="text-stroke-2-black text-center text-3xl md:text-[40px] font-broad ">
                    CHOOSe AMoUNT
                  </h3>

                  {/* sol amounts */}
                  <div className="flex items-center justify-center gap-2 mt-7">
                    <SolAmount
                      solSelected={solSelected}
                      handleSolAmount={handleSolAmount}
                      amount={0.5}
                    />
                    <SolAmount
                      solSelected={solSelected}
                      handleSolAmount={handleSolAmount}
                      amount={1}
                    />
                    <SolAmount
                      solSelected={solSelected}
                      handleSolAmount={handleSolAmount}
                      amount={3}
                    />
                  </div>

                  {/* custom sol amount */}

                  {customAmount ? (
                    <div className="relative">
                      <input
                        onChange={(e) => setSolSelected(Number(e.target.value))}
                        className="mt-5 h-[70px] input input-bordered w-full text-center bg-pink text-black placeholder-[#B776E1] font-extrabold"
                        placeholder="Your amount"
                        type="number"
                        name="sol amount"
                        id="sol-amount"
                      />
                    </div>
                  ) : (
                    <button
                      onClick={handleCustomSol}
                      className="mt-5 border-2 w-full flex items-center justify-center gap-2 bg-pink h-14 md:h-[70px] rounded-md"
                    >
                      <img
                        className="w-[18px] h-[18px]"
                        src={logo}
                        alt="solana pay now modal logo"
                      />
                      <p className="text-[15px] md:text-[18px] text-black font-extrabold ">
                        Custom
                      </p>
                    </button>
                  )}

                  {/* proceed */}
                  <button
                    onClick={onClick}
                    className="btn md:btn-lg mt-7 md:mt-10 border border-black text-black w-full font-extrabold hover:bg-teal"
                  >
                    Proceed
                  </button>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default PayNowModal;
