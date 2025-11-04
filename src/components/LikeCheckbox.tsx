"use client";

import { HeartOutlined, HeartFilled } from "@ant-design/icons";
import { Checkbox } from "antd";
import React from "react";

interface LikeCheckboxProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
}

export default function LikeCheckbox({ checked, onChange }: LikeCheckboxProps) {
  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <Checkbox
      checked={checked}
      onChange={(e) => onChange(e.target.checked)}
      onClick={handleClick}
      style={{ display: "inline-flex" }}
    >
      {checked ? (
        <HeartFilled style={{ color: "#EB2F45", fontSize: 20 }} />
      ) : (
        <HeartOutlined style={{ color: "#EB2F45", fontSize: 20 }} />
      )}
    </Checkbox>
  );
}
