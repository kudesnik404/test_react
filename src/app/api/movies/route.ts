import { NextResponse } from "next/server";
import kinopoiskdev from "@api/kinopoiskdev";

kinopoiskdev.auth("8HXMSYJ-27JMATK-MWFEVA9-W7DT94T");

export async function GET() {
  try {
    const response = await kinopoiskdev.movieController_findManyByQueryV1_4({
      page: "1",
      limit: "25",
      type: "cartoon",
      isSeries: "false",
      ageRating: "18",
    });

    // Фильмы лежат в response.data.docs
    const moviesData = response.data?.docs || [];

    const movies = moviesData.map((item: any) => ({
      id: item.id,
      name: item.name,
      description: item.description,
      year: item.year,
      poster: item.poster?.url || "",
    }));

    return NextResponse.json(movies);
  } catch (err: any) {
    console.error("Error fetching movies from Kinopoisk:", err);
    return NextResponse.json({ error: err.message || "Failed to fetch movies" }, { status: 500 });
  }
}
