/**
 * Auth UI palette for inline styles (icon tints, focus borders, shadows) that
 * cannot be expressed as Tailwind classes. Single source of truth for these hex
 * values across the auth components — keep in sync with the design tokens in
 * `global.css` / `tailwind.config.js`.
 */
export const authColors = {
  /** Idle icon / placeholder text. */
  outline: "#6f7a6b",
  /** Idle input border. */
  border: "#becab9",
  /** Focus ring / brand accent (matches the app tint in constants/theme.ts). */
  primary: "#006e1c",
  /** Inline validation error. */
  error: "#ba1a1a",
  /** Registration card drop shadow. */
  cardShadow: "#0b1c30",
  /** Content rendered on top of the primary colour (button label / spinner). */
  onPrimary: "#ffffff",
} as const;
