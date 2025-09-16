import { Dialog, DialogTitle, Transition, TransitionChild } from "@headlessui/react";
import { XCircleIcon } from "@heroicons/react/outline";
import { Fragment } from "react";
import { useTheme } from "../../lib/theme";

type Props = {
  title: string;
  children: React.ReactNode;
  isOpen: boolean;
  handleClose: () => void;
  // guesses: string[][]
  // handleShare: () => void
};

export const BaseModal = ({ title, children, isOpen, handleClose }: Props) => {
  const { theme } = useTheme();

  return (
    <Transition show={isOpen} as={Fragment}>
      <Dialog as="div" className="fixed z-10 inset-0 overflow-y-auto" onClose={handleClose}>
        <div
          data-theme={theme}
          className="flex items-center justify-center min-h-screen py-10 px-4 text-center sm:block sm:p-0 text-writing"
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
            <div
              onClick={() => handleClose()}
              className="fixed bg-background/50 inset-0 backdrop-blur-xs transition-opacity"
            />
          </TransitionChild>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
            &#8203;
          </span>
          <TransitionChild
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div className="bg-background inline-block relative rounded-lg pt-2 pb-4 text-left overflow-hidden shadow-xl transform transition-all w-full sm:my-8 sm:align-middle sm:max-w-sm border-1 border-neutral">
              <div className="text-center">
                <DialogTitle as="h3" className="text-lg leading-6 font-medium border-b-1 flex pb-2 border-neutral">
                  <p className="flex-grow">{title}</p>
                  <XCircleIcon className="absolute right-2 h-6 w-6 cursor-pointer" onClick={() => handleClose()} />
                </DialogTitle>
                <div className="dark:text-white mt-2 px-4">{children}</div>
              </div>
            </div>
          </TransitionChild>
        </div>
      </Dialog>
    </Transition>
  );
};
