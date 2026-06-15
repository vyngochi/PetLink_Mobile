import { cssInterop } from "nativewind";
import {
  Eye,
  EyeOff,
  Lock,
  Mail,
  ShieldCheck,
  User,
} from "lucide-react-native";

/**
 * Enables Tailwind `className` (e.g. `text-muted-foreground`) on lucide icons
 * by mapping the resolved style color onto the icon's `color` prop.
 * Keeps icon colors theme-driven instead of hardcoded hex values.
 */
const ICONS = [Eye, EyeOff, Lock, Mail, ShieldCheck, User];
for (const icon of ICONS) {
  cssInterop(icon, {
    className: {
      target: "style",
      nativeStyleToProp: { color: true, opacity: true },
    },
  });
}

export { Eye, EyeOff, Lock, Mail, ShieldCheck, User };
