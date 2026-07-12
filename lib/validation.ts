import { z } from "zod";

export type FieldErrors<T> = Partial<Record<keyof T, string>>;

type ValidateResult<S extends z.ZodType> =
  | { success: true; data: z.infer<S> }
  | { success: false; errors: FieldErrors<z.infer<S>> };

export function validate<S extends z.ZodType>(
  schema: S,
  value: unknown,
): ValidateResult<S> {
  const result = schema.safeParse(value);
  if (result.success) {
    return { success: true, data: result.data };
  }

  const fieldErrors = z.flattenError(result.error).fieldErrors as Record<
    string,
    string[] | undefined
  >;
  const errors: Record<string, string> = {};
  for (const key in fieldErrors) {
    const messages = fieldErrors[key];
    if (messages?.length) errors[key] = messages[0];
  }

  return { success: false, errors: errors as FieldErrors<z.infer<S>> };
}
