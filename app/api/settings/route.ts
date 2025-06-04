import { db } from "@/features/db";
import { settingsTable } from "@/features/db/schema";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const settings = (await db.select().from(settingsTable)).at(0);
    if (!settings) {
      throw new Error("Settings not found.");
    }
    return NextResponse.json(settings.value);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to fetch settings." }, { status: 500 });
  }
}
