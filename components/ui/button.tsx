import { cva, type VariantProps } from "class-variance-authority";
import {
  ActivityIndicator,
  Pressable,
  type PressableProps,
} from "react-native";

import { Text } from "@/components/ui/text";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "flex-row items-center justify-center gap-2 rounded-full active:scale-[0.98]",
  {
    variants: {
      variant: {
        default: "bg-primary",
        outline: "border border-input bg-card",
      },
      size: {
        default: "h-14 px-6",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

const buttonTextVariants = cva("text-base font-bold", {
  variants: {
    variant: {
      default: "text-primary-foreground",
      outline: "text-foreground",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

export interface ButtonProps
  extends Readonly<Omit<PressableProps, "children">>,
    VariantProps<typeof buttonVariants> {
  readonly children: React.ReactNode;
  readonly loading?: boolean;
  readonly className?: string;
  readonly textClassName?: string;
}

/**
 * System-level Button (RN Reusables style). Auto-wraps string children in a
 * themed Text; shows a spinner while `loading`.
 */
export function Button({
  variant,
  size,
  loading = false,
  disabled,
  className,
  textClassName,
  children,
  ...props
}: ButtonProps) {
  const isDisabled = disabled || loading;
  return (
    <Pressable
      accessibilityRole="button"
      disabled={isDisabled}
      className={cn(
        buttonVariants({ variant, size }),
        isDisabled && "opacity-60",
        className,
      )}
      {...props}
    >
      {loading ? (
        <ActivityIndicator color={variant === "outline" ? undefined : "white"} />
      ) : typeof children === "string" ? (
        <Text className={cn(buttonTextVariants({ variant }), textClassName)}>
          {children}
        </Text>
      ) : (
        children
      )}
    </Pressable>
  );
}

export { buttonTextVariants, buttonVariants };
