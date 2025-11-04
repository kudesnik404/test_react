import { NextResponse } from "next/server";
import kinopoiskdev from "@api/kinopoiskdev";

kinopoiskdev.auth("8HXMSYJ-27JMATK-MWFEVA9-W7DT94T");

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const page = url.searchParams.get("page") ?? "1";

    const response = await kinopoiskdev.movieController_findManyByQueryV1_4({
      page,
      limit: "16",
      type: "cartoon",
      isSeries: "false",
      ageRating: "18",
    });

    const moviesData = response.data?.docs || [];

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
    console.error("Ошибка получения списка фильмов:", err);
    return NextResponse.json(
      { error: err?.message || "Не получилось запросить фильмы" },
      { status: 500 }
    );
  }
}
