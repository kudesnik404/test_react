"use client";

import React from "react";
import { Button } from "antd";
import Link from "next/link";

export default function MainPage() {
    return (
        <main className={"products"}>
            <Link href="/products">
                <Button type="link">
                    Моя библиотека фильмов
                </Button>
            </Link>
        </main>
    );
}
