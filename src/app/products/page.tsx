"use client";

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/store";
import { fetchMovies } from "@/store/slices/moviesSlice";
import MovieCard from "@/components/Card";
import { Row, Col, Skeleton, Typography, Pagination, Space, Select } from "antd";
import pageStyles from "./page.module.scss";
import cardStyles from "@/components/Card.module.scss";

const { Title } = Typography;

export default function ProductsPage() {
  const dispatch = useDispatch<AppDispatch>();
  const { movies, loading, error } = useSelector((state: RootState) => state.movies);
  const [page, setPage] = useState<number>(1);
  const [genre, setGenre] = useState<string>("all");
  const [likeFilter, setLikeFilter] = useState<string>("all");

  useEffect(() => {
    dispatch(fetchMovies({ page, genre, likeFilter }));
  }, [dispatch, page, genre, likeFilter]);

  useEffect(() => {
    if (movies.length > 0) {
      localStorage.setItem("movies", JSON.stringify(movies));
    }
  }, [movies]);

  const skeletonArray = Array.from({ length: 8 });
  const disabledFilters = ["Мультфильмы", "Полнометражные", "18+"];

  return (
    <main className={pageStyles.products}>
      <Title className={pageStyles.products__title}>Список фильмов</Title>

      <Space wrap style={{ width: "100%" }}>
        {disabledFilters.map((item, index) => (
          <Select
            key={`фильтр-${index}`}
            defaultValue={index + 1}
            disabled
            size="large"
            options={[
              {
                value: index + 1,
                label: <span>{item}</span>,
              },
            ]}
          />
        ))}

        <Select
          key="фильтр-лайки"
          value={likeFilter}
          size="large"
          options={[
            { value: "all", label: "Все" },
            { value: "liked", label: "Избранное" },
          ]}
          style={{ width: 126 }}
          onChange={(value) => {
            setLikeFilter(value);
            setPage(1);
          }}
        />

        <Select
          key="фильтр-жанр"
          value={genre}
          size="large"
          options={[
            { value: "all", label: "Любой жанр" },
            { value: "комедия", label: "Комедия" },
            { value: "мелодрама", label: "Мелодрама" },
            { value: "драма", label: "Драма" },
            { value: "ужасы", label: "Ужасы" },
            { value: "фэнтези", label: "Фэнтези" },
            { value: "фантастика", label: "Фантастика" },
            { value: "боевик", label: "Боевик" },
          ]}
          style={{ width: 137 }}
          onChange={(value) => {
            setGenre(value);
            setPage(1);
          }}
        />
      </Space>

      {error ? (
        <p style={{ color: "red" }}>Ошибка: {error}</p>
      ) : (
        <Row gutter={[16, 16]}>
          {loading && movies.length === 0
            ? skeletonArray.map((_, idx) => (
                <Col xs={24} sm={12} md={8} lg={6} key={idx}>
                  <Skeleton active className={cardStyles.card__container} />
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
        total={320}
        pageSize={16}
        showSizeChanger={false}
        onChange={(newPage) => {
          setPage(newPage);
        }}
      />
    </main>
  );
}
