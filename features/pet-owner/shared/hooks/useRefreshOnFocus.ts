import { useFocusEffect } from "expo-router";
import { useCallback, useRef } from "react";

export const useRefreshOnFocus = (refetch: () => Promise<unknown>) => {
  const firstTimeRef = useRef(true);

  useFocusEffect(
    useCallback(() => {
      if (firstTimeRef.current) {
        firstTimeRef.current = false;
        return;
      }
      refetch();
    }, [refetch]),
  );
};
