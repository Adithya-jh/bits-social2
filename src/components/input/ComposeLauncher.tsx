import { useModal } from "../../context/ModalProvider";
import { useCurrentUser } from "../../hooks/auth/useCurrentUser";
import ProfilePic from "../user/ProfilePic";

function ComposeLauncher() {
  const { data: currentUser } = useCurrentUser();
  const { setModalType } = useModal();

  if (!currentUser) return null;

  return (
    <div
      className="w-full px-4 py-3 bg-[#181820] border border-twitterBorder/40 rounded-3xl shadow-[0_15px_35px_rgba(0,0,0,0.35)] hover:border-twitterBorder/60 transition cursor-text"
      onClick={() => setModalType("posting")}
    >
      <div className="flex items-center gap-3">
        <div className="h-12 w-12">
          <ProfilePic userId={currentUser.id} />
        </div>
        <p className="text-lg text-twitterTextAlt">What's on your mind?</p>
      </div>
    </div>
  );
}

export default ComposeLauncher;
