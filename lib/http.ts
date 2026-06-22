import axios, { type AxiosResponse } from "axios";

export function unwrapData<T>(res: AxiosResponse): T {
  const body = res.data;
  if (body && typeof body === "object" && "data" in body) {
    return (body as { data: T }).data;
  }
  return body as T;
}

export function getApiErrorMessage(error: unknown, fallback: string): string {
  if (axios.isAxiosError(error)) {
    const data = error.response?.data;
    if (typeof data === "string" && data.trim()) return data;

    const envelope = data as
      | { message?: unknown; error?: unknown }
      | undefined;
    const candidate = envelope?.message ?? envelope?.error;

    if (typeof candidate === "string" && candidate.trim()) return candidate;
    if (Array.isArray(candidate)) {
      const first = candidate.find(
        (m) => typeof m === "string" && m.trim(),
      );
      if (first) return first as string;
    }
  }
  return fallback;
}
