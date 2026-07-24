import { serverEnv } from "@/config/env.server";
import "server-only";

export interface ApiRequestOptions extends Omit<RequestInit, "body"> {
  body?: unknown;
}

export class UpstreamApiError extends Error {
  constructor(
    public readonly status: number,
    public readonly payload: unknown,
  ) {
    super(`Upstream API request failed with status ${status}`);
    this.name = "UpstreamApiError";
  }
}

function getApiUrl(path: string) {
  const API_BASE_URL = serverEnv.API_BASE_URL;
  const baseUrl = API_BASE_URL.replace(/\/+$/, "");
  const normalizedPath = path.replace(/^\/+/, "");

  return `${baseUrl}/${normalizedPath}`;
}

async function readResponsePayload(response: Response): Promise<unknown> {
  if (response.status === 204) {
    return null;
  }

  const text = await response.text();

  if (!text) {
    return null;
  }

  try {
    return JSON.parse(text) as unknown;
  } catch {
    return text;
  }
}

export async function apiRequest<T>(path: string, options: ApiRequestOptions = {}): Promise<T> {
  const { body, ...requestOptions } = options;
  const headers = new Headers(options.headers);

  headers.set("Accept", "application/json");

  if (body !== undefined) {
    headers.set("Content-Type", "application/json");
  }

  let response: Response;

  try {
    response = await fetch(getApiUrl(path), {
      ...requestOptions,
      body: body === undefined ? undefined : JSON.stringify(body),
      cache: "no-store",
      headers,
    });
  } catch {
    throw new UpstreamApiError(502, null);
  }

  const payload = await readResponsePayload(response);

  if (!response.ok) {
    throw new UpstreamApiError(response.status, payload);
  }

  return payload as T;
}
