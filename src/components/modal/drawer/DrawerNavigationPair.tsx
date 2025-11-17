import type { ReactNode } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import type { Dispatch, SetStateAction } from "react";
import { useModal } from "../../../context/ModalProvider";
import { useCurrentUser } from "../../../hooks/auth/useCurrentUser";
import { useLogout } from "../../../hooks/auth/useLogout";

type DrawerNavigationPairProps = {
  children: ReactNode;
  name: string;
  routePath?: string;
  setDrawerOpen?: Dispatch<SetStateAction<boolean>>;
  disabled?: boolean;
};

function DrawerNavigationPair({
  children,
  name,
  routePath,
  disabled,
  setDrawerOpen,
}: DrawerNavigationPairProps) {
  const { setModalType } = useModal();
  const navigate = useNavigate();
  const location = useLocation();
  const { data: currentUser } = useCurrentUser();

  const logout = useLogout();

  const onlyOnUserId = () => {
    switch (name) {
      case "Saved":
      case "Notifications":
      case "Profile":
        return true;

      default:
        return false;
    }
  };

  const canNavigateAsUser = !onlyOnUserId() || currentUser;

  const normalizedRoute =
    routePath && routePath.includes("/profile")
      ? "/profile"
      : routePath ?? "";

  const isActive =
    normalizedRoute.length > 0
      ? normalizedRoute === "/profile"
        ? location.pathname.startsWith("/profile")
        : location.pathname === normalizedRoute
      : false;

  const handleNavigation = () => {
    if (disabled) return;

    if (name == "Log Out" && canNavigateAsUser) {
      logout();
    } else if (routePath && canNavigateAsUser) {
      navigate(routePath);
    } else {
      setModalType("signup");
    }

    setTimeout(() => {
      if (setDrawerOpen) {
        setDrawerOpen(false);
      }
    }, 50);
  };

  return (
    <button
      type="button"
      onClick={handleNavigation}
      className={`w-full flex items-center gap-3 rounded-2xl px-3 py-3 text-left transition-colors ${
        isActive
          ? "bg-white/5 text-white"
          : "text-twitterTextAlt hover:bg-white/5"
      } ${disabled ? "cursor-not-allowed opacity-60" : "cursor-pointer"}`}
    >
      <div
        className={`flex h-10 w-10 items-center justify-center rounded-xl ${
          isActive ? "text-(--color-main)" : ""
        }`}
      >
        {children}
      </div>
      <p className="text-base font-semibold">{name}</p>
    </button>
  );
}

export default DrawerNavigationPair;
