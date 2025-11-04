import Link from "next/link";

export default function HomePage() {
  return (
    <main style={{ padding: "40px", textAlign: "center" }}>
      <h1>Добро пожаловать в мой проект 🎬</h1>
      <p style={{ marginTop: "20px" }}>
        Перейдите к списку фильмов (products), чтобы посмотреть контент.
      </p>

      <Link
        href="/products"
        style={{
          display: "inline-block",
          marginTop: "30px",
          padding: "10px 20px",
          backgroundColor: "#1677ff",
          color: "#fff",
          borderRadius: "6px",
          textDecoration: "none",
          fontWeight: 500,
        }}
      >
        Перейти к продуктам →
      </Link>
    </main>
  );
}
