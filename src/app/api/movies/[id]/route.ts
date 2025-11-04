import { NextResponse } from "next/server";
import kinopoiskdev from "@api/kinopoiskdev";

kinopoiskdev.auth("8HXMSYJ-27JMATK-MWFEVA9-W7DT94T");

export async function GET(req: Request, { params }: { params: { id: string } }) {
  try {
    const { id } = params;
    const response = await fetch(`https://api.kinopoisk.dev/v1.4/movie/${id}`, {
      headers: {
        "X-API-KEY": "8HXMSYJ-27JMATK-MWFEVA9-W7DT94T",
      },
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: `Failed to fetch movie ${id}` },
        { status: response.status }
      );
    }

    const movie = await response.json();
    return NextResponse.json(movie);
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Failed to fetch movie" }, { status: 500 });
  }
}
