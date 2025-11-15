"use client";

import React, { forwardRef, useState, useEffect } from "react";
import { Select, Space, Input } from "antd";
import { genreOptions } from "@/constants/genreOptions";

interface FiltersProps {
  genre: string;
  onGenreChange: (value: string) => void;
  likeFilter: string;
  onLikeFilterChange: (value: string) => void;
  onSearch?: (value: string) => void;
}

const Filters = forwardRef<HTMLDivElement, FiltersProps>(
  ({ genre, onGenreChange, likeFilter, onLikeFilterChange, onSearch }, ref) => {
    const [search, setSearch] = useState("");

    useEffect(() => {
      if (onSearch) {
        onSearch(search);
      }
    }, [search, onSearch]);

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
          options={genreOptions.map((g) => ({ ...g, label: <span key={g.value}>{g.label}</span> }))}
          style={{ width: 160 }}
          onChange={onGenreChange}
        />
        <Input
          placeholder="Поиск по названию"
          size="large"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />{" "}
      </Space>
    );
  }
);

export default Filters;
