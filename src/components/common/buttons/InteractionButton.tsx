import { useMemo, type MouseEvent } from "react";
import { HeroIcon, type IconName } from "../icons/HeroIcon.tsx";
import { InteractionCounter } from "../InteractionCounter.tsx";
import { useModal } from "../../../context/ModalProvider.tsx";
import { useCurrentUser } from "../../../hooks/auth/useCurrentUser.tsx";

type InteractionButtonProps = {
  numberList: number[];
  buttonColor: "twitterGreen" | "twitterRed" | "twitterBlue" | "notAColor";
  mutationFunction: () => void;
  iconName: IconName;
};

const COLOR_CLASS_MAP: Record<
  Exclude<InteractionButtonProps["buttonColor"], "notAColor">,
  { text: string; hover: string }
> = {
  twitterGreen: {
    text: "text-twitterGreen",
    hover: "hover:bg-twitterGreen/10",
  },
  twitterRed: {
    text: "text-twitterRed",
    hover: "hover:bg-twitterRed/10",
  },
  twitterBlue: {
    text: "text-twitterBlue",
    hover: "hover:bg-twitterBlue/10",
  },
};

function InteractionButton({
  numberList,
  buttonColor,
  mutationFunction,
  iconName,
}: InteractionButtonProps) {
  const { data: currentUser } = useCurrentUser();
  const { setModalType } = useModal();
  const hasToken =
    typeof window !== "undefined" && !!localStorage.getItem("jwt");

  const canInteract = !!currentUser || hasToken;

  const isMarked = useMemo(() => {
    if (!currentUser) return false;
    if (buttonColor === "notAColor") return false;
    return numberList.includes(currentUser.id);
  }, [buttonColor, currentUser, numberList]);

  const count = numberList.length;

  const handleMutation = (e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    if (canInteract) {
      mutationFunction();
    } else {
      setModalType("signup");
    }
  };

  const colorClasses =
    buttonColor !== "notAColor"
      ? COLOR_CLASS_MAP[buttonColor]
      : { text: "", hover: "hover:bg-twitterBlue/10" };

  return (
    <div className="min-w-0 flex-1 basis-[45%] sm:basis-auto">
      <div
        className={`flex items-center gap-1 sm:gap-2 text-xs sm:text-sm font-medium ${
          isMarked ? colorClasses.text : "text-twitterTextAlt"
        }`}
      >
        <div
          className={`group p-1.5 sm:p-2 rounded-full transition ${colorClasses.hover}`}
          onClick={(e) => handleMutation(e)}
        >
          <HeroIcon
            iconName={iconName}
            solid={isMarked}
            className="h-5 w-5 sm:h-6 sm:w-6"
          />
        </div>
        <div className="min-w-0">
          <InteractionCounter count={count} />
        </div>
      </div>
    </div>
  );
}

export default InteractionButton;
