import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const output = await request.json(); 
    console.log('output', output)
    // Assuming the incoming data is in JSON format
 await sql`
      CREATE TABLE IF NOT EXISTS Pages (
        id SERIAL PRIMARY KEY,
        block JSONB NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `;
   
    // Insert the new object into the Pages table
    await sql`
      INSERT INTO Pages (block) VALUES (${JSON.stringify(output)});
    `;

    return NextResponse.json(
      { message: "Data inserted into the Pages table successfully." },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
export async function GET(request: Request) {
  try {
    const results = await sql`SELECT * FROM Pages;`;
    return NextResponse.json({ results }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
