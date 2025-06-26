import { db } from "@/features/db";
import { itemsTable } from "@/features/db/schema";
import { gt } from "drizzle-orm";
import { NextResponse } from "next/server";

export interface ItemsTimelineResponse {
  /**
   * Should be 7 elements long.
   */
  data: number[];
  /**
   * Should be 7 elements long, every string should be in DD/MM format.
   */
  days: string[];
}

export async function GET() {
  try {
    // Get today's date and subtract 6 days to cover 7 days total
    const today = new Date();
    const startDate = new Date();
    startDate.setDate(today.getDate() - 6);

    const items = await db
      .select({ createdAt: itemsTable.createdAt })
      .from(itemsTable)
      .where(gt(itemsTable.createdAt, startDate.toISOString()));

    /**
     * We want to display how many items were added the last 7 days (including today).
     */
    const days = Array.from({ length: 7 }).map((_, i) => {
      const date = new Date();
      date.setDate(date.getDate() - (6 - i)); // 6 to 0 -- oldest to today

      // DD/MM
      return date.toLocaleDateString(process.env.NEXT_PUBLIC_LOCALE, {
        day: "2-digit",
        month: "2-digit",
      });
    });

    const data: number[] = Array(7).fill(0);
    items.forEach((element) => {
      // Parse month and day from ISO string.
      const [, month, day] = element.createdAt.split("T")[0].split(" ")[0].split("-");
      const daysIndex = days.indexOf(`${day}/${month}`); // Match DD/MM.
      if (daysIndex < 0) {
        return;
      }
      data[daysIndex] = data[daysIndex] + 1;
    });

    return NextResponse.json({ data, days } satisfies ItemsTimelineResponse);
  } catch (error) {
    console.error(error);
    return new NextResponse("Failed to fetch timeline.", { status: 500 });
  }
}
