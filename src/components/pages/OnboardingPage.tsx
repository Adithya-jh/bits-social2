import { useState, useRef } from "react";
import { useCurrentUser } from "../../hooks/auth/useCurrentUser";
import { API_URL } from "../../constants/env";

const campuses = ["PILANI", "GOA", "HYDERABAD", "DUBAI"] as const;

function OnboardingPage({ onComplete }: { onComplete: () => void }) {
  const { data: currentUser } = useCurrentUser();
  const [username, setUsername] = useState(currentUser?.username ?? "");
  const [campus, setCampus] = useState<string>((currentUser as any)?.campus ?? "");
  const [error, setError] = useState<string>("");
  const bannerInputRef = useRef<HTMLInputElement | null>(null);
  const [bannerPreview, setBannerPreview] = useState<string>(
    currentUser?.bannerImageUrl ?? ""
  );

  const handleSubmit = async () => {
    setError("");
    const token = localStorage.getItem("jwt");
    if (!token) return;
    if (!username || !campus) {
      setError("Username and campus are required");
      return;
    }
    try {
      const form = new FormData();
      form.append("username", username);
      form.append("campus", campus);
      if (bannerInputRef.current?.files?.[0]) {
        form.append("banner", bannerInputRef.current.files[0]);
      }

      const res = await fetch(`${API_URL}/api/auth/onboard`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: form,
      });

      if (!res.ok) {
        const msg = await res.text();
        throw new Error(msg);
      }

      onComplete();
    } catch (err: any) {
      setError(err.message ?? "Failed to save");
    }
  };

  return (
    <div className="min-h-screen w-full bg-(--background-main) flex items-center justify-center px-4">
      <div className="w-full max-w-xl rounded-3xl border border-twitterBorder/40 bg-[#0f0f16] shadow-[0_25px_45px_rgba(0,0,0,0.5)] p-8 flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <p className="text-2xl font-bold text-twitterText">
            Complete your profile
          </p>
          <p className="text-twitterTextAlt text-sm">
            Choose a username, campus, and optional banner image.
          </p>
        </div>

        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <label className="text-sm text-twitterTextAlt">Username</label>
            <input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full rounded-xl border border-twitterBorder/40 bg-[#12121a] text-twitterText px-3 py-2 focus:outline-none focus:border-(--color-main)"
              placeholder="Enter a unique username"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm text-twitterTextAlt">Campus</label>
            <select
              value={campus}
              onChange={(e) => setCampus(e.target.value)}
              className="w-full rounded-xl border border-twitterBorder/40 bg-[#12121a] text-twitterText px-3 py-2 focus:outline-none focus:border-(--color-main)"
            >
              <option value="">Select campus</option>
              {campuses.map((c) => (
                <option key={c} value={c}>
                  {c.charAt(0) + c.slice(1).toLowerCase()}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm text-twitterTextAlt">
              Banner (optional)
            </label>
            <input
              ref={bannerInputRef}
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  setBannerPreview(URL.createObjectURL(file));
                }
              }}
              className="text-sm text-twitterTextAlt"
            />
            {bannerPreview && (
              <img
                src={bannerPreview}
                alt="banner preview"
                className="rounded-xl border border-twitterBorder/30 max-h-40 object-cover"
              />
            )}
          </div>
        </div>

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <button
          type="button"
          onClick={handleSubmit}
          className="rounded-full bg-(--color-main) text-black font-semibold py-3 w-full hover:brightness-110 transition"
        >
          Continue
        </button>
      </div>
    </div>
  );
}

export default OnboardingPage;
