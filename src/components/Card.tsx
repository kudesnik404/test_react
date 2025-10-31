"use client";

import React from "react";
import styles from "./Card.module.scss";
import { Button } from "antd";

interface CardProps {
  title: string;
  description?: string;
  poster?: string;
  year?: string;
  onClick?: () => void;
}

export default function Card({ title, description, poster, year, onClick }: CardProps) {
  return (
    <div className={styles.card} onClick={onClick}>
      {poster && (
        <img
          src={poster}
          alt={title}
          style={{ width: "100%", borderRadius: "8px", marginBottom: "8px" }}
        />
      )}
      <div className={styles.title}>
        {title} {year && `(${year})`}
      </div>
      <div className={styles.description}>{description}</div>
      <Button type="primary" style={{ marginTop: "12px" }}>
        Action
      </Button>
    </div>
  );
}
