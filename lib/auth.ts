import { useRouter } from "expo-router";

const router = useRouter();

export const withAuth =
  (action: (...args: any[]) => void) =>
  (...args: any[]) => {
    const isLoggedIn = true;
    if (!isLoggedIn) {
      router.push({ pathname: "/(auth)/login" });
      return;
    }

    return action(...args);
  };
