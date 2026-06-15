import { View } from "react-native";

import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { AuthBrandHeader } from "@/features/authentication/components/auth-brand-header";
import { AuthDivider } from "@/features/authentication/components/auth-divider";
import { AuthFooterLink } from "@/features/authentication/components/auth-footer-link";
import { AuthScreenContainer } from "@/features/authentication/components/auth-screen-container";
import { FormField } from "@/features/authentication/components/form-field";
import { GoogleButton } from "@/features/authentication/components/google-button";
import { LOGIN_CONTENT } from "@/features/authentication/login/constants/login.constants";
import { useLoginForm } from "@/features/authentication/login/hooks/use-login-form";

export function LoginView() {
  const { values, setField, isSubmitting, handleSubmit, goToRegister } =
    useLoginForm();

  return (
    <AuthScreenContainer>
      <View className="flex-1">
        <AuthBrandHeader className="mt-2" />

        {/* 32px from the logo, 24px between each block */}
        <View className="mt-8 gap-6">
          <View className="items-center gap-2">
            <Text className="text-center text-3xl font-bold tracking-tight text-foreground">
              {LOGIN_CONTENT.title}
            </Text>
            <Text className="text-center text-sm text-muted-foreground">
              {LOGIN_CONTENT.subtitle}
            </Text>
          </View>

          <View className="gap-4">
            <FormField
              label={LOGIN_CONTENT.email.label}
              placeholder={LOGIN_CONTENT.email.placeholder}
              value={values.email}
              onChangeText={(text) => setField("email", text)}
              keyboardType="email-address"
              autoCapitalize="none"
              autoComplete="email"
              textContentType="emailAddress"
              fieldClassName="bg-card"
            />
            <FormField
              label={LOGIN_CONTENT.password.label}
              placeholder={LOGIN_CONTENT.password.placeholder}
              value={values.password}
              onChangeText={(text) => setField("password", text)}
              password
              autoCapitalize="none"
              autoComplete="password"
              textContentType="password"
              rightLabel={{ text: LOGIN_CONTENT.password.forgot }}
              fieldClassName="bg-card"
            />
            <Button className="mt-2" loading={isSubmitting} onPress={handleSubmit}>
              {LOGIN_CONTENT.submit}
            </Button>
          </View>

          <View className="gap-4">
            <AuthDivider text={LOGIN_CONTENT.divider} />
            <GoogleButton label={LOGIN_CONTENT.google} />
          </View>
        </View>

        <AuthFooterLink
          className="mt-auto pt-8"
          prompt={LOGIN_CONTENT.footer.prompt}
          action={LOGIN_CONTENT.footer.action}
          onPress={goToRegister}
        />
      </View>
    </AuthScreenContainer>
  );
}
