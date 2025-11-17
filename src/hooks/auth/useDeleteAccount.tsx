import { useMutation } from "@tanstack/react-query";
import { API_URL } from "../../constants/env";

export const useDeleteAccount = () =>
  useMutation({
    mutationFn: async (): Promise<void> => {
      const token = localStorage.getItem("jwt");
      const res = await fetch(`${API_URL}/api/auth/delete-account`, {
        method: "POST",
        headers: {
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
      });
      if (!res.ok) {
        const msg = await res.text();
        throw new Error(msg);
      }
    },
  });
