"use client";

import React from "react";
import { Select, Space } from "antd";

interface FiltersProps {
  genre: string;
  onGenreChange: (value: string) => void;
  likeFilter: string;
  onLikeFilterChange: (value: string) => void;
}

const disabledFilters = ["Мультфильмы", "Полнометражные", "18+"];

const Filters: React.FC<FiltersProps> = ({
  genre,
  onGenreChange,
  likeFilter,
  onLikeFilterChange,
}) => {
  return (
    <Space wrap style={{ width: "100%" }}>
      {disabledFilters.map((item, index) => (
        <Select
          key={`disabled-filter-${index}`}
          defaultValue={index + 1}
          disabled
          size="large"
          options={[{ value: index + 1, label: <span>{item}</span> }]}
        />
      ))}

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
    </Space>
  );
};

export default Filters;
