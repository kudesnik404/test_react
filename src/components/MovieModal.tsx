"use client";

import React from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { addProduct, updateProduct } from "@/store/slices/productsSlice";
import { Modal, Form, Input, Button, Select } from "antd";
import { genreOptions } from "@/constants/genreOptions";
import type { Movie } from "@/store/slices/productsSlice";

interface MovieModalProps {
  open: boolean;
  onClose: () => void;
  initialValues?: Movie;
}

export default function MovieModal({ open, onClose, initialValues }: MovieModalProps) {
  const [form] = Form.useForm();
  const dispatch = useDispatch();

  useEffect(() => {
    if (initialValues) {
      form.setFieldsValue(initialValues);
    } else {
      form.resetFields();
    }
  }, [initialValues, form]);

  const handleSubmit = (values: any) => {
    const movieData: Movie = {
      ...initialValues, // сохраняем id если редактируем
      name: values.name,
      year: values.year || "",
      description: values.description || "",
      genres: (values.genres || []).map((g: string) => ({ name: g })),
      poster: values.poster || "",
      liked: initialValues?.liked ?? false,
    };

    if (initialValues) {
      dispatch(updateProduct(movieData));
    } else {
      dispatch(addProduct({ ...movieData, id: Date.now() }));
    }

    form.resetFields();
    setTimeout(() => {
      onClose();
    }, 0);
  };

  return (
    <Modal
      open={open}
      onCancel={onClose}
      title={initialValues ? "Редактировать фильм" : "Добавить новый фильм"}
      footer={null}
      centered
      maskClosable={false}
    >
      <Form layout="vertical" onFinish={handleSubmit} form={form}>
        <Form.Item
          name="name"
          label="Название"
          rules={[{ required: true, message: "Введите название фильма" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item name="year" label="Год выпуска">
          <Input />
        </Form.Item>

        <Form.Item name="poster" label="URL постера">
          <Input placeholder="https://..." />
        </Form.Item>

        <Form.Item name="genres" label="Жанры">
          <Select
            mode="multiple"
            placeholder="Выберите жанры"
            allowClear
            options={genreOptions.map((g) => ({
              ...g,
              label: <span key={g.value}>{g.label}</span>,
            }))}
          />
        </Form.Item>

        <Form.Item name="description" label="Описание">
          <Input.TextArea autoSize={{ minRows: 3, maxRows: 8 }} />
        </Form.Item>

        <Button type="primary" htmlType="submit" block>
          {initialValues ? "Сохранить изменения" : "Добавить фильм"}
        </Button>
      </Form>
    </Modal>
  );
}
