/* eslint-disable react/prop-types */
import {
  Dialog,
  DialogPanel,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import { Fragment } from "react";
import "./TokenModal.Module.css";
import closeIcon from "@/public/icons/TokenDetailsPage/Close.png";
import Image from "next/image";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
};

const TokenModal = ({
  isOpen,
  onClose,
  title,
  children,
  footer,
}: ModalProps) => {
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-[2000] token-modal"
        onClose={onClose}
      >
        <TransitionChild
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-white/50 backdrop-blur-md" />
        </TransitionChild>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <TransitionChild
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <DialogPanel className=" max-w-[1000px] transform overflow-hidden rounded-2xl bg-token-modal-bg bg-no-repeat bg-current bg-cover p-6 text-left align-middle shadow-xl  transition-all">
                <div
                  onClick={onClose}
                  className="flex justify-end hover:cursor-pointer"
                >
                  <Image
                    width={500}
                    height={500}
                    src={closeIcon}
                    className="w-6 bg-white"
                    alt="close icon"
                  />
                </div>

                {title && (
                  <h3 className="text-stroke-2-black text-center text-3xl md:text-[40px] font-broad ">
                    {title}
                  </h3>
                )}

                <div className="bg-token-modal-second-bg bg-center bg-contain bg-no-repeat w-full h-full">
                  {children}
                </div>

                {footer && <div className="mt-7">{footer}</div>}
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default TokenModal;
