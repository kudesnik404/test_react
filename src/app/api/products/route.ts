import { NextResponse } from "next/server";
import kinopoiskdev from "@api/kinopoiskdev";

kinopoiskdev.auth("6HS182R-X634REH-GXKRP4A-83V60V8");

export async function GET(request: Request) {
  try {
    const params: Record<string, any> = {
      page: "1",
      limit: "80",
      notNullFields: "ageRating",
      sortField: "rating.kp",
      sortType: "1",
      lists: "top250",
    };

    const response = await kinopoiskdev.movieController_findManyByQueryV1_4(params);
    const moviesData = response.data?.docs || [];
    const movies = moviesData.map((item: any) => ({
      id: item.id,
      name: item.name || item.alternativeName || item.enName || "",
      description: item.description,
      year: item.year,
      poster: item.poster?.url || "",
      genres: item.genres || [],
    }));

    const total = response.data?.total || 0;

    return NextResponse.json({ products: movies, total });
  } catch (err: any) {
    console.error("Ошибка получения списка фильмов:", err);
    return NextResponse.json(
      { error: err?.message || "Не получилось запросить фильмы" },
      { status: 500 }
    );
  }
}
