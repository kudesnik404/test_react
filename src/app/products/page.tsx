"use client";

import React, { useEffect, useState, useRef, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/store";
import { fetchProducts, setProducts } from "@/store/slices/productsSlice";
import MovieCard from "@/components/Card";
import Filters from "@/components/Filters";
import MovieModal from "@/components/MovieModal";
import { Row, Col, Skeleton, Typography, Pagination, Flex, Button } from "antd";
import { PlusCircleOutlined } from "@ant-design/icons";
import cardStyles from "@/components/Card.module.scss";

const { Title } = Typography;

export default function ProductsPage() {
  const dispatch = useDispatch<AppDispatch>();
  const productsState = useSelector((state: RootState) => (state as any).products);
  const [open, setOpen] = useState(false);

  const products = productsState?.products ?? [];
  const totalFromState = productsState?.total ?? 0;
  const loading = productsState?.loading ?? false;
  const error = productsState?.error ?? null;

  const [page, setPage] = useState<number>(1);
  const [genre, setGenre] = useState<string>("all");
  const [likeFilter, setLikeFilter] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState("");
  const productsRef = useRef<HTMLDivElement>(null);
  const isFirstRun = useRef(true);

  const PAGE_SIZE = 16;

  useEffect(() => {
    try {
      const ls = localStorage.getItem("products");
      if (ls) {
        const parsed = JSON.parse(ls);
        if (Array.isArray(parsed)) {
          dispatch(setProducts(parsed));
          isFirstRun.current = false;
          return;
        }
      }
    } catch (e) {
      console.warn("Не удалось прочитать products из localStorage", e);
    }
    dispatch(fetchProducts());
  }, [dispatch]);

  useEffect(() => {
    if (isFirstRun.current) {
      isFirstRun.current = false;
      return;
    }

    try {
      localStorage.setItem("products", JSON.stringify(products));
    } catch (e) {
      console.warn("Не удалось записать products в localStorage", e);
    }
  }, [products]);

  const filteredProducts = useMemo(() => {
    let result = products.slice();

    if (searchTerm.trim() !== "") {
      result = result.filter((m: {name: string}) => m.name.toLowerCase().includes(searchTerm.toLowerCase()));
    }

    if (genre && genre !== "all") {
      result = result.filter((m: { genres?: Array<{ name: string } | string> }) =>
          Array.isArray(m.genres)
              ? m.genres.some((g: { name: string } | string) =>
                  typeof g === "string" ? g === genre : g.name === genre
              )
              : false
      );
    }

    if (likeFilter === "liked") {
      result = result.filter((m: { favourite?: boolean }) => m.favourite === true);
    } else if (likeFilter === "notLiked") {
      result = result.filter((m: { favourite?: boolean }) => !m.favourite);
    }

    return result;
  }, [products, genre, likeFilter, searchTerm]);

  const total = filteredProducts.length || totalFromState;
  const pageCount = Math.max(1, Math.ceil(total / PAGE_SIZE));
  const currentPage = Math.min(page, pageCount);

  const start = (currentPage - 1) * PAGE_SIZE;
  const pagedProducts = filteredProducts.slice(start, start + PAGE_SIZE);

  const skeletonArray = Array.from({ length: PAGE_SIZE });

  return (
    <main className={"products"}>
      <Title>Моя библиотека фильмов</Title>

      <Flex justify="space-between" style={{ width: "100%", padding: "0 9px" }}>
        <Filters
          genre={genre}
          onGenreChange={(g) => {
            setGenre(g);
            setPage(1);
          }}
          likeFilter={likeFilter}
          onLikeFilterChange={(lf) => {
            setLikeFilter(lf);
            setPage(1);
          }}
          onSearch={(value: string) => {
            setSearchTerm(value);
            setPage(1);
          }}
          ref={productsRef}
        />
        <Button size="large" type="text" onClick={() => setOpen(true)}>
          Добавить фильм <PlusCircleOutlined />
        </Button>

        <MovieModal open={open} onClose={() => setOpen(false)} />
      </Flex>

      {error ? (
        <p style={{ color: "red" }}>Ошибка: {error}</p>
      ) : !loading && pagedProducts.length === 0 ? (
        <p style={{ textAlign: "center", marginTop: 32 }}>По заданным фильтрам фильмы не найдены</p>
      ) : (
        <>
          <Row gutter={[16, 16]} style={{ width: "100%" }}>
            {loading && products.length === 0
              ? skeletonArray.map((_, idx) => (
                  <Col xs={24} sm={12} md={8} lg={6} key={idx}>
                    <Skeleton.Node active className={cardStyles.card__container} />
                  </Col>
                ))
              : pagedProducts.map((p: { id: string; name: string; poster?: string; favourite?: boolean; genres?: Array<{ name: string } | string>; year?: string; description?: string }) => (
                    <Col xs={24} sm={12} md={8} lg={6} key={p.id}>
                      <MovieCard movie={p} />
                    </Col>
                ))}
          </Row>

          {pagedProducts.length > 0 && (
            <Pagination
              style={{ textAlign: "center", marginTop: 16 }}
              current={currentPage}
              total={total}
              pageSize={PAGE_SIZE}
              showSizeChanger={false}
              onChange={(newPage) => {
                setPage(newPage);
                if (productsRef.current) {
                  requestAnimationFrame(() => {
                    productsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
                  });
                }
              }}
            />
          )}
        </>
      )}
    </main>
  );
}
