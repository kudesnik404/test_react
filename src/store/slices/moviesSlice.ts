import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { Movie } from "../types";

type FetchArgs = { page?: number };

export const fetchMovies = createAsyncThunk<Movie[], FetchArgs>(
  "movies/fetchMovies",
  async ({ page = 1 }: FetchArgs) => {
    const res = await fetch(`/api/movies?page=${page}`);
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
  loading: boolean;
  error: string | null;
}

const initialState: MoviesState = {
  movies: [],
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
      })
      .addCase(fetchMovies.fulfilled, (state, action: PayloadAction<Movie[]>) => {
        state.loading = false;
        state.movies = action.payload;
      })
      .addCase(fetchMovies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Ошибка загрузки фильмов";
      });
  },
});

export const { setMovies } = moviesSlice.actions;
export default moviesSlice.reducer;
