import { GoogleAuthButton } from "../common/buttons/GoogleAuthButton";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import GraphBackground from "../common/GraphBackground";

const LOGO_TEXT = "BITS.SOCIAL";

function LoginPage() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const lettersRef = useRef<Array<HTMLSpanElement | null>>([]);
  const buttonRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
    if (buttonRef.current) {
      gsap.set(buttonRef.current, { opacity: 0, y: 30 });
    }

    const dots = lettersRef.current.filter((el) => el?.textContent === ".") as HTMLSpanElement[];
    const letters = lettersRef.current.filter((el) => el?.textContent !== ".") as HTMLSpanElement[];

    tl.fromTo(
      dots,
      { scale: 0, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.4 }
    )
      .fromTo(
        letters,
        {
          opacity: 0,
          x: () => gsap.utils.random(-120, 120),
          y: () => gsap.utils.random(-120, 120),
          skewX: () => gsap.utils.random(-20, 20),
        },
        {
          opacity: 1,
          x: 0,
          y: 0,
          skewX: 0,
          duration: 0.7,
          stagger: 0.04,
          ease: "power2.out",
        },
        "-=0.1"
      )
      .to(
        letters,
        {
          duration: 0.05,
          opacity: 0.6,
          repeat: 2,
          yoyo: true,
          ease: "none",
          stagger: { amount: 0.2, from: "random" },
        },
        "-=0.3"
      )
      .set(
        [...letters, ...dots],
        { opacity: 1 }
      )
      .fromTo(
        buttonRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.6 },
        "+=1"
      );

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative min-h-screen w-full bg-black text-white flex flex-col items-center justify-center px-4 select-none gap-10 overflow-hidden"
      style={{ fontFamily: "'Quantico', sans-serif" }}
    >
      <GraphBackground />
      <div className="flex items-center justify-center gap-1 text-5xl sm:text-6xl font-black tracking-[0.18em] uppercase">
        {LOGO_TEXT.split("").map((char, idx) => (
          <span
            key={`${char}-${idx}`}
            ref={(el) => {
              lettersRef.current[idx] = el;
            }}
            className={`inline-block ${
              char === "T" || char === "A"
                ? "drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]"
                : char === "."
                ? "drop-shadow-[0_0_10px_rgba(255,255,255,0.9)]"
                : ""
            }`}
            style={{
              color:
                char === "T" || char === "A"
                  ? "#ffffff"
                  : char === "."
                  ? "#ffffff"
                  : "#d8d8d8",
            }}
          >
            {char}
          </span>
        ))}
      </div>

      <div ref={buttonRef} className="w-full max-w-xs">
        <GoogleAuthButton>ENTER WITH GOOGLE</GoogleAuthButton>
      </div>
    </div>
  );
}

export default LoginPage;
