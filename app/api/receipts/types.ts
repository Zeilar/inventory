import type { Receipts } from "@/features/db/schema";

export interface GetReceiptsResponse {
  receipts: Receipts;
  total: number;
}
