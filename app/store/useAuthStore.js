import { create } from "zustand";

export const useAuthStore = create((set) => ({
  error: null,
  isLoading: false,
  verifyEmail: async (verificationCode) => {
    set({ isLoading: true });
    try {
      const res = await fetch("/api/verify-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ verificationCode }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.errorMessage || "Verification failed");

      set({ error: null, isLoading: false });
    } catch (error) {
      set({ error: error.message, isLoading: false });
    }
  },
}));
