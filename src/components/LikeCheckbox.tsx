"use client";

import { HeartTwoTone, HeartFilled } from "@ant-design/icons";
import React from "react";
import styles from "./LikeCheckbox.module.scss";

interface LikeCheckboxProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
}

export default function LikeCheckbox({ checked, onChange }: LikeCheckboxProps) {
    return (
        <label className={styles.checkbox} onClick={(e) => e.stopPropagation()}>
            <input
                type="checkbox"
                checked={checked}
                onChange={(e) => onChange(e.target.checked)}
            />
            <span className={styles.icon}>
        {checked ? (
            <HeartFilled style={{color: "#EB2F45", fontSize: 40}}/>
        ) : (
            <HeartTwoTone twoToneColor="#EB2F45" style={{fontSize: 40}}/>
        )}
      </span>
        </label>
    );
}