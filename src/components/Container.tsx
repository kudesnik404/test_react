"use client";

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/store";
import { setMovies, Movie } from "@/store/slices/moviesSlice";

export default function Container() {
  const dispatch = useDispatch<AppDispatch>();
  const movies = useSelector((state: RootState) => state.movies.list);

  useEffect(() => {
    fetch("/api/movies")
      .then((res) => res.json())
      .then((data: Movie[]) => {
        dispatch(setMovies(data));
      })
      .catch((err) => console.error(err));
  }, [dispatch]);

  return (
    <div>
      {movies.map((m) => (
        <div key={m.id}>{m.name}</div>
      ))}
    </div>
  );
}
