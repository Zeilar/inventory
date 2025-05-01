import type { Item } from "@/features/db/schema";

export interface GetItemsResponse {
  items: Item[];
  total: number;
}
