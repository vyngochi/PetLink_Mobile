import { View } from "react-native";

import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { AuthBrandHeader } from "@/features/authentication/components/auth-brand-header";
import { AuthDivider } from "@/features/authentication/components/auth-divider";
import { AuthFooterLink } from "@/features/authentication/components/auth-footer-link";
import { AuthScreenContainer } from "@/features/authentication/components/auth-screen-container";
import { FormField } from "@/features/authentication/components/form-field";
import { GoogleButton } from "@/features/authentication/components/google-button";
import { REGISTER_CONTENT } from "@/features/authentication/register/constants/register.constants";
import { useRegisterForm } from "@/features/authentication/register/hooks/use-register-form";
import { Lock, Mail, ShieldCheck, User } from "@/lib/icons";

// Compact field height so the whole screen fits the viewport without scrolling.
const FIELD = "h-12";

export function RegisterView() {
  const { values, setField, error, isSubmitting, handleSubmit, goToLogin } =
    useRegisterForm();

  return (
    <AuthScreenContainer contentClassName="py-4">
      <View className="flex-1">
        <AuthBrandHeader className="mt-1" size={80} />

        {/* Form card (Level 1 surface), compacted to fit one screen */}
        <View
          className="mt-3 gap-3 rounded-2xl border border-border bg-card p-5"
          style={{
            // Soft ambient elevation (reliable on Android via elevation)
            shadowColor: "#0f172a",
            shadowOpacity: 0.08,
            shadowRadius: 16,
            shadowOffset: { width: 0, height: 8 },
            elevation: 4,
          }}
        >
          <View className="gap-1">
            <Text className="text-xl font-bold text-foreground">
              {REGISTER_CONTENT.title}
            </Text>
            <Text className="text-sm text-muted-foreground">
              {REGISTER_CONTENT.subtitle}
            </Text>
          </View>

          <View className="gap-3">
            <FormField
              label={REGISTER_CONTENT.fullName.label}
              placeholder={REGISTER_CONTENT.fullName.placeholder}
              value={values.fullName}
              onChangeText={(text) => setField("fullName", text)}
              icon={User}
              fieldClassName={FIELD}
              autoCapitalize="words"
              autoComplete="name"
              textContentType="name"
            />
            <FormField
              label={REGISTER_CONTENT.email.label}
              placeholder={REGISTER_CONTENT.email.placeholder}
              value={values.email}
              onChangeText={(text) => setField("email", text)}
              icon={Mail}
              fieldClassName={FIELD}
              keyboardType="email-address"
              autoCapitalize="none"
              autoComplete="email"
              textContentType="emailAddress"
            />
            <FormField
              label={REGISTER_CONTENT.password.label}
              placeholder={REGISTER_CONTENT.password.placeholder}
              value={values.password}
              onChangeText={(text) => setField("password", text)}
              icon={Lock}
              fieldClassName={FIELD}
              password
              autoCapitalize="none"
              autoComplete="password-new"
              textContentType="newPassword"
            />
            <FormField
              label={REGISTER_CONTENT.confirmPassword.label}
              placeholder={REGISTER_CONTENT.confirmPassword.placeholder}
              value={values.confirmPassword}
              onChangeText={(text) => setField("confirmPassword", text)}
              icon={ShieldCheck}
              fieldClassName={FIELD}
              password
              autoCapitalize="none"
              autoComplete="password-new"
              textContentType="newPassword"
            />

            {error ? (
              <Text className="text-xs font-bold text-destructive">{error}</Text>
            ) : null}

            <Button
              className="mt-1 h-12"
              loading={isSubmitting}
              onPress={handleSubmit}
            >
              {REGISTER_CONTENT.submit}
            </Button>
          </View>

          <View className="gap-3">
            <AuthDivider text={REGISTER_CONTENT.divider} />
            <GoogleButton label={REGISTER_CONTENT.google} className="h-12" />
          </View>
        </View>

        <AuthFooterLink
          className="mt-auto pt-3"
          prompt={REGISTER_CONTENT.footer.prompt}
          action={REGISTER_CONTENT.footer.action}
          onPress={goToLogin}
        />
      </View>
    </AuthScreenContainer>
  );
}
