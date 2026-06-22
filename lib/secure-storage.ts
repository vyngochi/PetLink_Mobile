import AsyncStorage from "@react-native-async-storage/async-storage";
import * as SecureStore from "expo-secure-store";
import { Platform } from "react-native";

/**
 * Storage adapter for zustand's `persist`.
 *
 * On native we keep auth tokens in the OS keychain/keystore via expo-secure-store
 * so they are encrypted at rest. SecureStore is not available on web, so we fall
 * back to AsyncStorage (localStorage) there.
 *
 * Note: SecureStore has a ~2KB limit per value. The persisted auth state only
 * holds the token pair, which stays comfortably under that.
 */
export const secureStorage = {
  getItem: (name: string): Promise<string | null> =>
    Platform.OS === "web"
      ? AsyncStorage.getItem(name)
      : SecureStore.getItemAsync(name),
  setItem: (name: string, value: string): Promise<void> =>
    Platform.OS === "web"
      ? AsyncStorage.setItem(name, value)
      : SecureStore.setItemAsync(name, value),
  removeItem: (name: string): Promise<void> =>
    Platform.OS === "web"
      ? AsyncStorage.removeItem(name)
      : SecureStore.deleteItemAsync(name),
};
