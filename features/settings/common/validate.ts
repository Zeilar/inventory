import { z } from "zod";

export const MIN_ITEMS_PER_PAGE = 1;
export const MAX_ITEMS_PER_PAGE = 20;

export const settingsValuesValidator = z.object({
  itemsPerPage: z.number().min(MIN_ITEMS_PER_PAGE).max(MAX_ITEMS_PER_PAGE),
});
