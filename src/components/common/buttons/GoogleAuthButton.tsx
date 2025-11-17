import type { ReactNode } from "react";
import { FaGoogle } from "react-icons/fa6";
import { useGoogleAuthEntry } from "../../../hooks/auth/useGoogleAuthEntry.tsx";
import type { ModalType } from "../../../types/ModalType.ts";

type GoogleSignInButtonProps = {
  children: ReactNode;
  setToggle?: (type: ModalType) => void;
};

export function GoogleAuthButton({
  children,
  setToggle,
}: GoogleSignInButtonProps) {
  const login = useGoogleAuthEntry();

  const handleLogin = () => {
    login();
    if (setToggle) {
      setToggle(null);
    }
  };

  return (
    <button
      type="button"
      onClick={() => handleLogin()}
      className="group relative w-full hover:cursor-pointer flex items-center gap-2 justify-center h-12 px-6 font-normal tracking-[0.08em] transition text-white bg-transparent border-none outline-none"
    >
      <FaGoogle />
      <span className="relative">
        {children}
        <span className="absolute left-0 -bottom-1 h-[2px] w-0 bg-white transition-all duration-300 origin-left group-hover:w-full"></span>
      </span>
    </button>
  );
}
