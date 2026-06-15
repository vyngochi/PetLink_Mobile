/**
 * Static copy for the Login screen (source: Stitch "Login" / Welcome Back).
 * Keeping text here keeps the view free of hardcoded strings.
 */
export const LOGIN_CONTENT = {
  title: "Welcome Back!",
  subtitle: "Log in to manage your pet's health and schedule.",
  email: {
    label: "Email Address",
    placeholder: "hello@petlink.com",
  },
  password: {
    label: "Password",
    placeholder: "••••••••",
    forgot: "Forgot Password?",
  },
  submit: "Log In",
  divider: "or continue with",
  google: "Google",
  footer: {
    prompt: "Don't have an account?",
    action: "Register",
  },
} as const;
