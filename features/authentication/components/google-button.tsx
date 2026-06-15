import { Ionicons } from "@expo/vector-icons";

import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";

export interface GoogleButtonProps {
  readonly label: string;
  readonly onPress?: () => void;
  readonly className?: string;
}

// Google brand color for the "G" glyph — fixed brand asset, not theme-driven.
const GOOGLE_BLUE = "#4285F4";

/** Outline social-auth button for "Continue with Google". */
export function GoogleButton({ label, onPress, className }: GoogleButtonProps) {
  return (
    <Button variant="outline" onPress={onPress} className={className}>
      <Ionicons name="logo-google" size={20} color={GOOGLE_BLUE} />
      <Text className="text-base font-bold text-foreground">{label}</Text>
    </Button>
  );
}
