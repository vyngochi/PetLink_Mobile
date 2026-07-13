import axios, { type AxiosResponse } from "axios";

export function unwrapData<T>(res: AxiosResponse): T {
  const body = res.data;
  if (body && typeof body === "object" && "data" in body) {
    return (body as { data: T }).data;
  }
  return body as T;
}

export type ApiErrorMessageOptions = {
  fallback: string;
  network?: string;
  byStatus?: Record<number, string>;
  byMessage?: Record<string, string>;
};

function extractServerMessage(data: unknown): string | undefined {
  if (typeof data === "string" && data.trim()) return data;

  const envelope = data as { message?: unknown; error?: unknown } | undefined;
  const candidate = envelope?.message ?? envelope?.error;

  if (typeof candidate === "string" && candidate.trim()) return candidate;
  if (Array.isArray(candidate)) {
    const first = candidate.find((m) => typeof m === "string" && m.trim());
    if (first) return first as string;
  }
  return undefined;
}

export function getApiErrorMessage(
  error: unknown,
  options: string | ApiErrorMessageOptions,
): string {
  const config: ApiErrorMessageOptions =
    typeof options === "string" ? { fallback: options } : options;

  if (axios.isAxiosError(error)) {
    if (!error.response) {
      return config.network ?? config.fallback;
    }

    const serverMessage = extractServerMessage(error.response.data);

    const byMessage = serverMessage
      ? config.byMessage?.[serverMessage.trim()]
      : undefined;
    if (byMessage) return byMessage;

    const byStatus = config.byStatus?.[error.response.status];
    if (byStatus) return byStatus;

    if (serverMessage) return serverMessage;
  }
  return config.fallback;
}
