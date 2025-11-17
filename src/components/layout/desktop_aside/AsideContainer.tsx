import type { ReactNode } from "react";

type AsideContainerProps = {
  children: ReactNode;
  disabled?: boolean;
};

export function AsideContainer({ children, disabled }: AsideContainerProps) {
  return (
    <div
      className={`w-full text-twitterText flex flex-col p-5 rounded-3xl border border-white/5 bg-[#0c0c13] shadow-[0_25px_45px_rgba(0,0,0,0.45)] ${
        disabled ? "hover:cursor-not-allowed" : ""
      }`}
    >
      {children}
    </div>
  );
}
