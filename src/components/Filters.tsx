"use client";

import React, { forwardRef } from "react";
import { Select, Space, Input } from "antd";

interface FiltersProps {
  genre: string;
  onGenreChange: (value: string) => void;
  likeFilter: string;
  onLikeFilterChange: (value: string) => void;
}

const Filters = forwardRef<HTMLDivElement, FiltersProps>(
  ({ genre, onGenreChange, likeFilter, onLikeFilterChange }, ref) => {
    return (
      <Space wrap ref={ref}>
        <Select
          key="filter-like"
          value={likeFilter}
          size="large"
          options={[
            { value: "all", label: <span>Все</span> },
            { value: "liked", label: <span>Избранное</span> },
          ]}
          style={{ width: 128 }}
          onChange={onLikeFilterChange}
        />

        <Select
          key="filter-genre"
          value={genre}
          size="large"
          options={[
            { value: "all", label: <span>Любой жанр</span> },
            { value: "комедия", label: <span>Комедия</span> },
            { value: "мелодрама", label: <span>Мелодрама</span> },
            { value: "драма", label: <span>Драма</span> },
            { value: "ужасы", label: <span>Ужасы</span> },
            { value: "фэнтези", label: <span>Фэнтези</span> },
          ]}
          style={{ width: 140 }}
          onChange={onGenreChange}
        />

        <Input placeholder="Поиск по названию" size="large" />
      </Space>
    );
  }
);

export default Filters;
