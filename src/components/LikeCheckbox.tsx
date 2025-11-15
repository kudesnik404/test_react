"use client";

import React from "react";
import styles from "./LikeCheckbox.module.scss";
import { HeartTwoTone, HeartFilled } from "@ant-design/icons";

interface LikeCheckboxProps {
  moviePage?: boolean;
  checked: boolean;
  onChange: (checked: boolean) => void;
}

export default function LikeCheckbox({ checked, onChange, moviePage = false }: LikeCheckboxProps) {
  return (
    <label
      className={`${styles.checkbox} ${moviePage ? styles.checkbox_moviePage : ""}`}
      onClick={(e) => e.stopPropagation()}
    >
      <input type="checkbox" checked={checked} onChange={(e) => onChange(e.target.checked)} />
      <span className={styles.icon}>
        {checked ? (
          <HeartFilled style={{ color: "#EB2F45", fontSize: 40 }} />
        ) : (
          <HeartTwoTone twoToneColor="#EB2F45" style={{ fontSize: 40 }} />
        )}
      </span>
    </label>
  );
}
