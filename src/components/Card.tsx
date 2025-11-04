"use client";

import { Card } from "antd";
import Link from "next/link";
import LikeCheckbox from "./LikeCheckbox";
import type { Movie } from "@/store/slices/moviesSlice";
import { useDispatch } from "react-redux";
import { toggleLike } from "@/store/slices/moviesSlice";
import type { AppDispatch } from "@/store";
import styles from "./Card.module.scss";
import { FrownOutlined } from "@ant-design/icons";

interface MovieCardProps {
  movie: Movie;
}

export default function MovieCard({ movie }: MovieCardProps) {
  const dispatch = useDispatch<AppDispatch>();

  const handleLikeChange = (checked: boolean) => {
    dispatch(toggleLike(movie.id));
  };

  return (
    <Link href={`/products/${movie.id}`} className={styles.card__link}>
      <Card className={styles.card__container} hoverable loading={false}>
        {movie.poster ? (
          <img className={styles.card__cover} src={movie.poster} alt={movie.name} />
        ) : (
          <div className={styles.card__cover}>
            <FrownOutlined style={{ fontSize: "50px" }} />
          </div>
        )}
        <div className={styles.card__info}>
          <h3>{movie.name}</h3>
          <p>{movie.year ? `Год: ${movie.year}` : "Год неизвестен"}</p>
        </div>
        <LikeCheckbox checked={!!movie.liked} onChange={handleLikeChange} />
      </Card>
    </Link>
  );
}
