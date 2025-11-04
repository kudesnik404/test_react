"use client";

import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/store";
import { fetchMovies } from "@/store/slices/moviesSlice";
import MovieCard from "@/components/Card";
import Filters from "@/components/Filters";
import { Row, Col, Skeleton, Typography, Pagination, Space, Select } from "antd";
import pageStyles from "./page.module.scss";
import cardStyles from "@/components/Card.module.scss";

const { Title } = Typography;

export default function ProductsPage() {
  const dispatch = useDispatch<AppDispatch>();
  const { movies, total, loading, error } = useSelector((state: RootState) => state.movies);
  const [page, setPage] = useState<number>(1);
  const [genre, setGenre] = useState<string>("all");
  const [likeFilter, setLikeFilter] = useState<string>("all");
  const moviesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    dispatch(fetchMovies({ page, genre, likeFilter }));
  }, [page, genre, likeFilter, dispatch]);

  useEffect(() => {
    if (movies.length > 0) {
      localStorage.setItem("movies", JSON.stringify(movies));
    }
  }, [movies]);

  useEffect(() => {
    if (!loading && moviesRef.current) {
      requestAnimationFrame(() => {
        moviesRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    }
  }, [movies, loading]);

  const skeletonArray = Array.from({ length: 8 });

  return (
    <main className={pageStyles.products} ref={moviesRef}>
      <Title className={pageStyles.products__title}>Список фильмов</Title>

      <Filters
        genre={genre}
        onGenreChange={setGenre}
        likeFilter={likeFilter}
        onLikeFilterChange={setLikeFilter}
      />

      {error ? (
        <p style={{ color: "red" }}>Ошибка: {error}</p>
      ) : (
        <Row gutter={[16, 16]}>
          {loading && movies.length === 0
            ? skeletonArray.map((_, idx) => (
                <Col xs={24} sm={12} md={8} lg={6} key={idx}>
                  <Skeleton.Node active className={cardStyles.card__container} />
                </Col>
              ))
            : movies.map((m) => (
                <Col xs={24} sm={12} md={8} lg={6} key={m.id}>
                  <MovieCard movie={m} />
                </Col>
              ))}
        </Row>
      )}

      <Pagination
        style={{ textAlign: "center", marginTop: 16 }}
        current={page}
        total={total}
        pageSize={16}
        showSizeChanger={false}
        onChange={(newPage) => {
          setPage(newPage);
        }}
      />
    </main>
  );
}
