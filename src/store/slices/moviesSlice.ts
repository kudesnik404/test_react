import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { Movie } from "../types";

type FetchArgs = { page?: number; genre?: string };

export const fetchMovies = createAsyncThunk<Movie[], FetchArgs>(
  "movies/fetchMovies",
  async ({ page = 1, genre }: FetchArgs) => {
    const params = new URLSearchParams();
    params.set("page", page.toString());
    if (genre && genre !== "all") {
      params.set("genres.name", genre);
    }

    const res = await fetch(`/api/movies?${params.toString()}`);
    if (!res.ok) {
      const text = await res.text().catch(() => "");
      throw new Error(`Ошибка запроса фильмов: ${res.status} ${res.statusText} ${text}`);
    }

    const data = await res.json();
    return data as Movie[];
  }
);

interface MoviesState {
  movies: Movie[];
  total: number;
  loading: boolean;
  error: string | null;
}

const initialState: MoviesState = {
  movies: [],
  total: 0,
  loading: false,
  error: null,
};

const moviesSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {
    setMovies(state, action: PayloadAction<Movie[]>) {
      state.movies = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMovies.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.movies = [];
      })
      .addCase(fetchMovies.fulfilled, (state, action) => {
        state.loading = false;
        state.movies = action.payload.movies;
        state.total = action.payload.total; // сохраняем total
      })
      .addCase(fetchMovies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Ошибка загрузки фильмов";
      });
  },
});

export const { setMovies } = moviesSlice.actions;
export default moviesSlice.reducer;
