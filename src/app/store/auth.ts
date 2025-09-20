import { createStore } from "zustand/vanilla";
import { createJSONStorage, persist } from "zustand/middleware";
import { useStore } from "zustand";
import { logoutEverywhere } from "@/shared/config/firebase";

export interface AuthStoreState {
  email: string;
  displayName: string;
  isLoggedIn?: boolean;
}

type AuthStoreActions = {
  setUserData: (userDataSession: AuthStoreState) => void;
  removeSessionData: () => Promise<void>;
};

type AuthStoreType = AuthStoreState & AuthStoreActions;

// Create a Zustand store for authentication state management
export const AuthStore = createStore<AuthStoreType>()(
  persist(
    (set, get) => ({
      email: "",
      displayName: "",
      isLoggedIn: false,
      setUserData: (userDataSession: AuthStoreState) =>
        set({
          displayName: userDataSession.displayName,
          email: userDataSession.email,
          isLoggedIn: true,
        }),
      removeSessionData: async () => {
        if (!get().isLoggedIn) return;
        await logoutEverywhere(get().isLoggedIn ?? false);
        set({
          displayName: "",
          email: "",
          isLoggedIn: false,
        });
        sessionStorage.removeItem("auth-storage");
      },
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);

export const useAuthStoreActions = () => {
  const setUserData = useStore(AuthStore, (state) => state.setUserData);
  const removeSessionData = useStore(
    AuthStore,
    (state) => state.removeSessionData
  );
  return {
    setUserData,
    removeSessionData,
  };
};

export const useAuthStore = () => {
  const email = useStore(AuthStore, (state) => state.email);
  const isLoggedIn = useStore(AuthStore, (state) => state.isLoggedIn);
  return { isLoggedIn, email };
};
