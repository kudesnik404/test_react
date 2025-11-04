"use client";

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/store";
import { fetchMovies } from "@/store/slices/moviesSlice";
import MovieCard from "@/components/Card";
import { Row, Col, Skeleton } from "antd";
import { Typography } from "antd";
import pageStyles from "./page.module.scss";
import cardStyles from "@/components/Card.module.scss";

const { Title } = Typography;

export default function ProductsPage() {
  const dispatch = useDispatch<AppDispatch>();
  const { movies, loading, error } = useSelector((state: RootState) => state.movies);

  useEffect(() => {
    if (!movies || movies.length === 0) {
      dispatch(fetchMovies());
    }
  }, [dispatch, movies]);

  const skeletonArray = Array.from({ length: 8 });

  return (
    <main className={pageStyles.products}>
      <Title className={pageStyles.products__title}>Список фильмов</Title>

      {error ? (
        <p style={{ color: "red" }}>Ошибка: {error}</p>
      ) : loading || movies.length > 0 ? (
        <Row gutter={[16, 16]}>
          {movies.length > 0
            ? movies.map((m) => (
                <Col xs={24} sm={12} md={8} lg={6} key={m.id}>
                  <MovieCard movie={m} />
                </Col>
              ))
            : skeletonArray.map((_, idx) => (
                <Col xs={24} sm={12} md={8} lg={6} key={idx}>
                  <Skeleton.Node active className={cardStyles.card__container} />
                </Col>
              ))}
        </Row>
      ) : (
        <p>Фильмы не найдены.</p>
      )}
    </main>
  );
}
