"use client";

import { useEffect } from "react";
import { Card, Typography, Button } from "antd";
import Link from "next/link";
import LikeCheckbox from "./LikeCheckbox";
import type { Movie } from "@/store/slices/moviesSlice";
import { addLikedMovie, removeLikedMovie } from "@/store/slices/likedMoviesSlice";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch } from "@/store";
import styles from "./Card.module.scss";
import { FrownOutlined, CloseOutlined } from "@ant-design/icons";

const { Title, Text } = Typography;

interface MovieCardProps {
  movie: Movie;
}

export default function MovieCard({ movie }: MovieCardProps) {
  const dispatch = useDispatch<AppDispatch>();

  const likedMovies = useSelector((state: RootState) => state.likedMovies.movies);
  const isLiked = likedMovies.some((m) => m.id === movie.id);
  const handleLikeChange = (checked: boolean) => {
    if (checked) {
      dispatch(addLikedMovie({ id: movie.id, name: movie.name }));
    } else {
      dispatch(removeLikedMovie(movie.id));
    }
  };

  // синхронизация с localStorage — обновляем каждый раз, когда likedMovies изменяются
  useEffect(() => {
    localStorage.setItem("likedMovies", JSON.stringify(likedMovies));
  }, [likedMovies]);

  return (
    <Link href={`/products/${movie.id}`} className={styles.card__link}>
      <Card className={styles.card__container} hoverable>
        {movie.poster ? (
          <img className={styles.card__cover} src={movie.poster} alt={movie.name} />
        ) : (
          <div className={styles.card__cover}>
            <FrownOutlined style={{ fontSize: "50px" }} />
          </div>
        )}
        <div className={styles.card__info}>
          <Title
            level={3}
            className={styles.card__info__title}
            ellipsis={{ rows: 2, expandable: false }}
          >
            {movie.name}
          </Title>
          <Text>{movie.year ? `Год: ${movie.year}` : "Год неизвестен"}</Text>
        </div>
        <LikeCheckbox checked={isLiked} onChange={handleLikeChange} />
        <Button
          type="primary"
          shape="circle"
          icon={<CloseOutlined />}
          size="large"
          className={styles.card__close}
        />
      </Card>
    </Link>
  );
}
