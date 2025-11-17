import { useUser } from "../../hooks/queries/useUser.tsx";

type BannerComponentProps = {
  userId?: number;
};

function BannerComponent({ userId }: BannerComponentProps) {
  const { data: user } = useUser(userId);

  if (!userId) {
    return (
      <div className="w-full h-full rounded-full bg-red-600 animate-pulse"></div>
    );
  }

  return (
    <>
      {user ? (
        user.bannerImageUrl ? (
          <img
            className="object-cover h-full w-full rounded-xl"
            src={user.bannerImageUrl}
            alt="Profile banner"
          />
        ) : (
          <div className="h-full w-full rounded-xl bg-gradient-to-r from-[#12121a] via-[#181824] to-[#12121a]" />
        )
      ) : (
        <div className="h-full w-full bg-gray-600 animate-pulse rounded-xl"></div>
      )}
    </>
  );
}

export default BannerComponent;
