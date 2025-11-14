"use client";

import { useEffect } from "react";
import { Card, Typography, Button } from "antd";
import Link from "next/link";
import LikeCheckbox from "./LikeCheckbox";
import type { Movie } from "@/store/slices/productsSlice";
import { removeProduct, toggleFavorite } from "@/store/slices/productsSlice";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "@/store";
import styles from "./Card.module.scss";
import { FrownOutlined, CloseOutlined } from "@ant-design/icons";

const { Title, Text } = Typography;

interface MovieCardProps {
  movie: Movie;
}

export default function MovieCard({ movie }: MovieCardProps) {
  const dispatch = useDispatch<AppDispatch>();

  const isLiked = movie.favourite ?? false;

  const handleLikeChange = (checked: boolean) => {
    dispatch(toggleFavorite({ id: movie.id, value: checked }));
  };

  const handleCardDelete = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    dispatch(removeProduct(movie.id));
  };

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
          onClick={handleCardDelete}
        />
      </Card>
    </Link>
  );
}
