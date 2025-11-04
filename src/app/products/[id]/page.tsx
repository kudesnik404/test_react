import { notFound } from "next/navigation";
import type { Metadata } from "next";

type Movie = {
  id: string;
  name: string;
  description?: string;
  year?: string;
  poster?: string;
};

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  // можно сделать fetch для title, но для простоты возвращаем статическое
  return { title: `Product ${params.id}` };
}

export default async function ProductPage({ params }: { params: { id: string } }) {
  const { id } = params;
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL ?? ""}/api/movies`, {
    cache: "no-store",
  }).catch(() => null);

  if (!res || !res.ok) {
    // при проблеме с API можно показать сообщение или 500
    return <main style={{ padding: 24 }}>Ошибка загрузки данных.</main>;
  }

  const movies: Movie[] = await res.json();
  const movie = movies.find((m) => String(m.id) === String(id));

  if (!movie) {
    // возвращает 404-страницу Next
    notFound();
  }

  return (
    <main style={{ padding: 24 }}>
      <h1>
        {movie.name} {movie.year ? `(${movie.year})` : null}
      </h1>
      {movie.poster && (
        <img src={movie.poster} alt={movie.name} style={{ width: 320, borderRadius: 8 }} />
      )}
      <p style={{ marginTop: 12 }}>{movie.description}</p>
    </main>
  );
}
