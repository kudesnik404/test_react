"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "@/store";
import { fetchProducts } from "@/store/slices/productsSlice";
import { Typography, Tag, Flex, Button, Row, Col } from "antd";
import MovieModal from "@/components/MovieModal";
import LikeCheckbox from "@/components/LikeCheckbox";
import styles from "./page.module.scss";
import { EditOutlined, FrownOutlined, LeftOutlined } from "@ant-design/icons";

const { Title, Paragraph } = Typography;

export default function ProductPage() {
  const { id } = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const products = useSelector((state: RootState) => state.products.products);

  const [product, setProduct] = useState<(typeof products)[0] | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const initialValues = product
    ? {
        id: product.id,
        name: product.name,
        year: product.year,
        description: product.description,
        genres: product.genres?.map((g) => g.name) || [],
        poster: product.poster,
        liked: product.liked,
      }
    : null;

  useEffect(() => {
    if (products.length === 0) {
      dispatch(fetchProducts());
    }
  }, [dispatch, products.length]);

  useEffect(() => {
    if (products.length > 0) {
      const p = products.find((p) => p.id.toString() === id);
      setProduct(p ?? null);
    }
  }, [products, id]);

  return (
    <main className={styles.movie}>
      <Link href="/products">
        <Button type="text" className={styles.movie__btn}>
          <LeftOutlined /> Каталог
        </Button>
      </Link>

      {product ? (
        <Row gutter={64} wrap={false}>
          {" "}
          <Col flex="500px" className={styles.movie__poster_сontainer}>
            {product.poster ? (
              <img className={styles.movie__poster} src={product.poster} alt={product.name} />
            ) : (
              <div className={styles.movie__poster}>
                <FrownOutlined style={{ fontSize: "50px" }} />
              </div>
            )}
            <LikeCheckbox checked={!!product.liked} onChange={() => {}} moviePage />
          </Col>
          <Col flex="auto">
            <Flex justify="space-between">
              <Title level={2}>{product.name}</Title>
              <Button
                type="primary"
                icon={<EditOutlined />}
                onClick={() => setIsModalOpen(true)}
              />{" "}
            </Flex>
            <Paragraph>{product.description || "Описание отсутствует"}</Paragraph>
            <Paragraph>Год: {product.year || "неизвестен"}</Paragraph>
            {product.genres?.length > 0 && (
              <div>
                {product.genres.map((g: any) => (
                  <Tag key={g.name}>{g.name}</Tag>
                ))}
              </div>
            )}
          </Col>{" "}
        </Row>
      ) : (
        <Paragraph>Фильм не найден</Paragraph>
      )}

      <MovieModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        initialValues={product}
      />
    </main>
  );
}
