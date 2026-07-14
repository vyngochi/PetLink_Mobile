export const USER_ROLES = {
  CUSTOMER: "CUSTOMER",
  ADMIN: "ADMIN",
  PROVIDER: "PROVIDER",
} as const;

export type UserRole = (typeof USER_ROLES)[keyof typeof USER_ROLES];

const MOBILE_BLOCKED_ROLES: string[] = [USER_ROLES.ADMIN, USER_ROLES.PROVIDER];

export const isMobileBlockedRole = (role: string | null | undefined) =>
  MOBILE_BLOCKED_ROLES.includes((role ?? "").trim().toUpperCase());
