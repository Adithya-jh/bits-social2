import type { Post } from "../../../types/Post.ts";
import type { ModalType } from "../../../types/ModalType.ts";
import { useCreatePost } from "../../../hooks/mutations/useCreatePost.tsx";
import type { FilesWithId } from "../../../types/file.ts";
import { useCurrentUser } from "../../../hooks/auth/useCurrentUser.tsx";

type UploadTweetButtonProps = {
  textInput: string;
  clearAllInput: () => void;
  parentId?: number;
  setNewPost?: (post: Post) => void;
  setToggle?: (modalType: ModalType) => void;
  filesWithId: FilesWithId;
  isPoll: boolean;
  pollChoices: string[];
  pollExpiry: number[];
};

function UploadTweetButton({
  clearAllInput,
  textInput,
  parentId,
  filesWithId,
  setToggle,
  isPoll,
  pollChoices,
  pollExpiry,
}: UploadTweetButtonProps) {
  const { data: currentUser } = useCurrentUser();

  const hasValidPollExpiry = pollExpiry.some((entry) => entry !== 0);
  const hasValidPoll = !pollChoices.some((choice) => choice == "");
  const enableButton =
    (textInput.length > 0 || (filesWithId.length > 0 && !parentId)) &&
    currentUser &&
    (!isPoll || (hasValidPollExpiry && hasValidPoll));

  const createPost = currentUser
    ? useCreatePost(currentUser.id, parentId)
    : undefined;

  const handleToastClick = () => {
    if (!enableButton) return;

    const formData = new FormData();
    formData.append("text", textInput);
    if (parentId !== undefined) {
      formData.append("parentId", parentId.toString());
    }

    if (isPoll) {
      pollChoices.forEach((choice) => {
        formData.append("pollChoices", choice);
      });
      pollExpiry.forEach((time) => {
        formData.append("pollExpiry", time.toString());
      });
    }

    filesWithId.forEach((file) => {
      formData.append("images", file);
    });

    if (!createPost) return;

    createPost.mutate(formData, {
      onSuccess: () => {
        clearAllInput();
        if (setToggle) setToggle(null);
      },
    });
  };

  return (
    <button
      type="button"
      onClick={handleToastClick}
      disabled={!enableButton}
      className={`px-6 py-2 rounded-full text-sm font-semibold transition-colors ${
        enableButton
          ? "bg-(--color-main) text-black hover:brightness-110"
          : "bg-(--color-main)/40 text-twitterTextAlt cursor-not-allowed"
      }`}
    >
      Create
    </button>
  );
}

export default UploadTweetButton;
