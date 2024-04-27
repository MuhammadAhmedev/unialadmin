import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";
export const dynamic = "force-dynamic"
export const revalidate = 10
export async function GET(req: any) {
  try {
    const componentName = req.nextUrl.searchParams.get("componentName");
   
    console.log("componentName", componentName);

    const results = await sql`
      SELECT * FROM Pages
      WHERE block->> 'componentName' = ${componentName}
      ORDER BY id ASC;
    `;

    return NextResponse.json({ results }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
