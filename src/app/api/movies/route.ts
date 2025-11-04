import { NextResponse } from "next/server";
import kinopoiskdev from "@api/kinopoiskdev";

kinopoiskdev.auth("6HS182R-X634REH-GXKRP4A-83V60V8");

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const page = url.searchParams.get("page") ?? "1";
    const genre = url.searchParams.get("genres.name");

    const params: Record<string, any> = {
      page,
      limit: "16",
      type: "cartoon",
      isSeries: false,
      ageRating: "18",
    };

    if (genre && genre !== "all") {
      params["genres.name"] = genre;
    }

    const response = await kinopoiskdev.movieController_findManyByQueryV1_4(params);
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

    const total = response.data?.total || 0;

    return NextResponse.json({ movies, total });
  } catch (err: any) {
    console.error("Ошибка получения списка фильмов:", err);
    return NextResponse.json(
      { error: err?.message || "Не получилось запросить фильмы" },
      { status: 500 }
    );
  }
}
