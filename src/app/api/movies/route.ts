import { NextResponse } from "next/server";
import kinopoiskdev from "@api/kinopoiskdev";

kinopoiskdev.auth("8HXMSYJ-27JMATK-MWFEVA9-W7DT94T");

export async function GET() {
  try {
    const response = await kinopoiskdev.movieController_findManyByQueryV1_4({
      page: "1",
      limit: "24",
      type: "cartoon",
      isSeries: "false",
      ageRating: "18",
    });

    const moviesData = response.data?.docs || [];

    console.log("Все поля фильмов:", moviesData);

    const movies = moviesData.map((item: any) => ({
      id: item.id,
      name: item.name || item.alternativeName || item.enName || "",
      description: item.description,
      shortDescription: item.shortDescription,
      year: item.year,
      poster: item.poster?.url || "",
      genres: item.genres || [],
      countries: item.countries,
      rating: item.rating,
    }));

    return NextResponse.json(movies);
  } catch (err: any) {
    console.error("Error fetching movies from Kinopoisk:", err);
    return NextResponse.json({ error: err.message || "Failed to fetch movies" }, { status: 500 });
  }
}
