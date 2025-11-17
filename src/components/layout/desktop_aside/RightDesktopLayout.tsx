import { useNavigate } from "react-router-dom";
import { useTopFiveUsers } from "../../../hooks/queries/useTopFiveUsers.tsx";
import { TermsAndConditions } from "../../entry/TermsAndConditions";
import { UseTempAccountButton } from "../../common/buttons/UseTempAccountButton.tsx";
import { GoogleAuthButton } from "../../common/buttons/GoogleAuthButton.tsx";
import { HorizontalStripedText } from "../../common/HorizontalStripedText";
import { UserSearchResult } from "../../pages/UserSearchResult";
import { AsideContainer } from "./AsideContainer";
import { useCurrentUser } from "../../../hooks/auth/useCurrentUser.tsx";

const upNext = [
  {
    title: "Uncharted Territory",
    byline: "Ethan teaches you music",
    meta: "11m read • 12 likes • 1 comment",
  },
  {
    title: "Road to Buenos Aires",
    byline: "Dev Station",
    meta: "1m read • 1 like",
  },
  {
    title: "Little rooms",
    byline: "Austin Kleon",
    meta: "3m read • 145 likes • 5 comments",
  },
];

const trending = [
  {
    title: "Advent readings",
    description: "Spark hopeful start as Bowler posts",
  },
  {
    title: "Starbucks workers strike",
    description: "Walkouts across the country",
  },
  {
    title: "Shutdown ends after 43 days",
    description: "Trump signs funding bill",
  },
];

export function RightDesktopLayout() {
  const { data: currentUser } = useCurrentUser();
  const { data: topUsers } = useTopFiveUsers();
  const navigate = useNavigate();

  return (
    <aside className="hidden xl:flex w-80 2xl:w-96 sticky top-0 h-screen py-6">
      <div className="flex flex-col gap-5 h-full w-full overflow-y-auto scrollbar-blue pr-2 bg-[#08080d] border border-twitterBorder/40 rounded-3xl px-3 py-4 shadow-[0_20px_35px_rgba(0,0,0,0.35)]">
        <div className="rounded-3xl bg-[#0f0f16] border border-twitterBorder/40 px-4 py-3 shadow-sm">
          <div className="relative">
            <input
              type="text"
              placeholder="Search"
              className="w-full bg-[#12121a] text-sm text-twitterText rounded-2xl py-3 pl-4 pr-10 border border-transparent focus:border-(--color-main) focus:outline-none placeholder:text-twitterTextAlt"
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-twitterTextAlt text-sm">
              ⌘K
            </span>
          </div>
        </div>

        {!currentUser && (
          <AsideContainer>
            <p className="text-xl font-bold">New to Bits?</p>
            <p className="text-twitterTextAlt text-sm">
              Sign up now to create and save your favorite posts.
            </p>

            <div className="w-full flex flex-col gap-4 pt-4">
              <GoogleAuthButton>Sign up with Google</GoogleAuthButton>
              <HorizontalStripedText>OR</HorizontalStripedText>
              <UseTempAccountButton />
              <TermsAndConditions />
            </div>
          </AsideContainer>
        )}

        {currentUser && (
          <>
            <div className="bg-[#0f0f16] border border-twitterBorder/40 rounded-2xl p-4 shadow-sm flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <p className="text-lg font-semibold">Up next</p>
                <button
                  type="button"
                  className="text-sm text-(--color-main)"
                  onClick={() => navigate("/explore")}
                >
                  See all
                </button>
              </div>
              <div className="flex flex-col gap-3">
                {upNext.map((item) => (
                  <div
                    key={item.title}
                    className="rounded-2xl border border-white/5 bg-[#111118] p-3"
                  >
                    <p className="text-twitterTextAlt text-xs">{item.byline}</p>
                    <p className="font-semibold text-sm mt-1">{item.title}</p>
                    <p className="text-twitterTextAlt text-xs mt-1">
                      {item.meta}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <AsideContainer>
              <p className="text-xl font-semibold">You might like</p>
              <div className="w-full flex flex-col pt-4 gap-3">
                {topUsers?.map((id) => (
                  <UserSearchResult key={id} userId={id} />
                ))}
              </div>
              <p
                className="text-(--color-main) text-sm mt-3 hover:cursor-pointer"
                onClick={() => navigate("/explore")}
              >
                Show more
              </p>
            </AsideContainer>

            <div className="bg-[#0f0f16] border border-twitterBorder/40 rounded-2xl p-4 shadow-sm flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <p className="text-lg font-semibold">Trending</p>
                <button
                  type="button"
                  className="text-sm text-(--color-main)"
                >
                  See all
                </button>
              </div>
              <div className="flex flex-col gap-3">
                {trending.map((item) => (
                  <div
                    key={item.title}
                    className="rounded-2xl border border-white/5 bg-[#111118] p-3"
                  >
                    <p className="text-sm font-semibold">{item.title}</p>
                    <p className="text-xs text-twitterTextAlt mt-1">
                      {item.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </aside>
  );
}
