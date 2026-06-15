/**
 * Static copy for the Register screen (source: Stitch "Register - PetLink").
 */
export const REGISTER_CONTENT = {
  title: "Create Account",
  subtitle: "Join PetLink to manage your pet's health and schedule.",
  fullName: {
    label: "Full Name",
    placeholder: "John Doe",
  },
  email: {
    label: "Email Address",
    placeholder: "example@email.com",
  },
  password: {
    label: "Password",
    placeholder: "••••••••",
  },
  confirmPassword: {
    label: "Confirm Password",
    placeholder: "••••••••",
    mismatch: "Passwords do not match.",
  },
  submit: "Register",
  divider: "or continue with",
  google: "Continue with Google",
  footer: {
    prompt: "Already have an account?",
    action: "Log In",
  },
} as const;
