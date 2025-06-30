import { buildAppUrl } from "@/common";
import { cookies } from "next/headers";

export async function apiFetch(
  path: string,
  method?: string | null,
  body?: object | null,
  next?: NextFetchRequestConfig
) {
  return fetch(buildAppUrl(path), {
    method: method ?? "GET",
    body: body ? JSON.stringify(body) : undefined,
    credentials: "include",
    headers: {
      cookie: `${await cookies()}`,
    },
    next,
  });
}
