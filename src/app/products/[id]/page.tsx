// "use client";
//
// import { useEffect, useState } from "react";
// import { useParams } from "next/navigation";
// import { useDispatch, useSelector } from "react-redux";
// import { RootState, AppDispatch } from "@/store";
// import { toggleLike } from "@/store/slices/moviesSlice";
// import { Card, Typography, Spin } from "antd";
// import { FrownOutlined } from "@ant-design/icons";
// import LikeCheckbox from "@/components/LikeCheckbox";
// import styles from "./page.module.scss";
//
// const { Title, Paragraph } = Typography;
//
// export default function MoviePage() {
//   const { id } = useParams();
//   const dispatch = useDispatch<AppDispatch>();
//
//   const [movie, setMovie] = useState<any>(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//
//   const likedMovies = useSelector((state: RootState) => state.movies.movies.filter((m) => m.liked));
//
//   useEffect(() => {
//     async function fetchMovie() {
//       try {
//         const res = await fetch(`/api/movie/${id}`);
//         if (!res.ok) throw new Error("Ошибка при получении фильма");
//         const data = await res.json();
//         setMovie(data);
//       } catch (err: any) {
//         setError(err.message);
//       } finally {
//         setLoading(false);
//       }
//     }
//
//     fetchMovie();
//   }, [id]);
//
//   const handleLike = (checked: boolean) => {
//     if (!movie) return;
//     dispatch(toggleLike(movie.id));
//   };
//
//   if (loading)
//     return (
//       <div className={styles.loader}>
//         <Spin size="large" />
//       </div>
//     );
//
//   if (error)
//     return (
//       <div className={styles.error}>
//         <p>Ошибка: {error}</p>
//       </div>
//     );
//
//   if (!movie)
//     return (
//       <div className={styles.notFound}>
//         <p>Фильм не найден</p>
//       </div>
//     );
//
//   const isLiked = likedMovies.some((m) => m.id === movie.id);
//
//   return (
//     <main className={styles.movie}>
//       <div className={styles.movie__info}>
//         <Title level={2}>{movie.name || movie.alternativeName}</Title>
//         <Paragraph>{movie.description || "Описание отсутствует."}</Paragraph>
//         <p>
//           <strong>Год:</strong> {movie.year || "—"}
//         </p>
//         <p>
//           <strong>Возрастной рейтинг:</strong> {movie.ageRating || "—"}
//         </p>
//       </div>
//     </main>
//   );
// }
