import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState, useMemo } from "react";

import { paymentMethods as defaultPaymentMethods } from "@/features/pet-owner/payment-methods/constants/paymentMethods";

const PAYMENT_METHODS_KEY = "@enabled_payment_methods";

export function usePaymentMethods() {
  const [enabledIds, setEnabledIds] = useState<string[]>(
    defaultPaymentMethods.filter((m) => m.isEnabled).map((m) => m.id)
  );
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadEnabledIds();
  }, []);

  const loadEnabledIds = async () => {
    try {
      const stored = await AsyncStorage.getItem(PAYMENT_METHODS_KEY);
      if (stored) {
        setEnabledIds(JSON.parse(stored));
      }
    } catch (e) {
      console.error("Failed to load payment methods", e);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleMethod = (methodId: string) => {
    setEnabledIds((prevIds) => {
      let updatedIds;
      if (prevIds.includes(methodId)) {
        updatedIds = prevIds.filter((id) => id !== methodId);
      } else {
        updatedIds = [...prevIds, methodId];
      }
      AsyncStorage.setItem(PAYMENT_METHODS_KEY, JSON.stringify(updatedIds)).catch(
        (e) => console.error("Failed to save payment methods", e)
      );
      return updatedIds;
    });
  };

  const methods = useMemo(() => {
    return defaultPaymentMethods.map((m) => ({
      ...m,
      isEnabled: enabledIds.includes(m.id),
    }));
  }, [enabledIds]);

  return { methods, toggleMethod, isLoading };
}
