import { useRouter } from "expo-router";
import React from "react";
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  Text,
  View,
} from "react-native";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import { CreditCard, Info } from "lucide-react-native";

import { toast } from "@/components/toast";
import { Colors } from "@/constants/theme";
import {
  AddPaymentMethodButton,
  CardFormField,
  SaveCardToggle,
} from "@/features/pet-owner/add-payment-method/components";
import { useAddPaymentMethodForm } from "@/features/pet-owner/add-payment-method/hooks/useAddPaymentMethodForm";
import {
  OtherMethodRow,
  PaymentMethodsHeader,
  SecurityBanner,
} from "@/features/pet-owner/payment-methods/components";
import { otherPaymentMethods } from "@/features/pet-owner/payment-methods/constants/paymentMethods";

export function AddPaymentMethodView() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const {
    cardNumber,
    setCardNumber,
    cardName,
    setCardName,
    expiry,
    setExpiry,
    cvv,
    setCvv,
    saveCard,
    setSaveCard,
    errors,
    saving,
    submit,
  } = useAddPaymentMethodForm({
    onSuccess: () => {
      toast.success("Đã thêm phương thức thanh toán", { position: "bottom" });
      router.back();
    },
  });

  const showCvvHint = () =>
    toast.info("CVV là mã 3 hoặc 4 chữ số ở mặt sau thẻ của bạn.", {
      position: "bottom",
    });

  return (
    <SafeAreaView className="flex-1 bg-background" edges={["top"]}>
      <View className="px-5">
        <PaymentMethodsHeader
          title="Thêm phương thức"
          onBack={() => router.back()}
        />
      </View>

      <KeyboardAvoidingView
        className="flex-1"
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView
          contentContainerClassName="px-5 pt-2"
          contentContainerStyle={{ paddingBottom: 140 }}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View className="mb-8">
            <Text className="mb-4 font-mbold text-[18px] leading-6 text-foreground">
              Thẻ tín dụng / ghi nợ
            </Text>

            <View className="gap-4 rounded-[20px] border border-border bg-card p-4 shadow-sm">
              <CardFormField
                label="Số thẻ"
                value={cardNumber}
                onChangeText={setCardNumber}
                placeholder="0000 0000 0000 0000"
                keyboardType="number-pad"
                leadingIcon={CreditCard}
                error={errors.cardNumber}
              />

              <CardFormField
                label="Tên chủ thẻ"
                value={cardName}
                onChangeText={setCardName}
                placeholder="NGUYEN VAN A"
                autoCapitalize="characters"
                error={errors.cardName}
              />

              <View className="flex-row gap-4">
                <View className="flex-1">
                  <CardFormField
                    label="Ngày hết hạn"
                    value={expiry}
                    onChangeText={setExpiry}
                    placeholder="MM/YY"
                    keyboardType="number-pad"
                    error={errors.expiry}
                  />
                </View>
                <View className="flex-1">
                  <CardFormField
                    label="CVV"
                    value={cvv}
                    onChangeText={setCvv}
                    placeholder="***"
                    keyboardType="number-pad"
                    secureTextEntry
                    error={errors.cvv}
                    trailing={
                      <Pressable
                        onPress={showCvvHint}
                        accessibilityRole="button"
                        accessibilityLabel="Thông tin CVV"
                        hitSlop={8}
                      >
                        <Info size={18} color={Colors.light.icon} />
                      </Pressable>
                    }
                  />
                </View>
              </View>

              <SaveCardToggle
                value={saveCard}
                onChange={setSaveCard}
                label="Lưu thẻ này cho lần thanh toán sau"
              />
            </View>
          </View>

          <View className="mb-8">
            <Text className="mb-4 font-mbold text-[18px] leading-6 text-foreground">
              Phương thức khác
            </Text>
            <View className="gap-3">
              {otherPaymentMethods.map((method) => (
                <OtherMethodRow
                  key={method.id}
                  method={method}
                  onPress={(selected) =>
                    toast.info(
                      `Liên kết ${selected.name} đang được phát triển`,
                      { position: "bottom" },
                    )
                  }
                />
              ))}
            </View>
          </View>

          <SecurityBanner />
        </ScrollView>
      </KeyboardAvoidingView>

      <View
        className="absolute bottom-0 left-0 right-0 border-t border-border/50 bg-background/95 px-5 pt-4"
        style={{ paddingBottom: insets.bottom > 0 ? insets.bottom + 8 : 20 }}
      >
        <AddPaymentMethodButton
          label="Thêm phương thức"
          onPress={submit}
          saving={saving}
        />
      </View>
    </SafeAreaView>
  );
}
