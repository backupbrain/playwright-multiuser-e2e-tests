import AsyncStorage from "@react-native-async-storage/async-storage";
import create from "zustand";

interface AuthState {
  authToken?: string;
  setAuthToken: (authToken: string) => Promise<void>;
  clearAuthToken: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  authToken: undefined,
  setAuthToken: async (authToken: string) => {
    set({ authToken });
    await AsyncStorage.setItem("authToken", authToken);
  },
  clearAuthToken: async () => {
    set({ authToken: undefined });
    await AsyncStorage.removeItem("authToken");
  },
}));
