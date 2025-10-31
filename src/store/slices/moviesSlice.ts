import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Movie {
  id: string;
  name: string;
  description?: string;
  year?: string;
  poster: string;
}

interface MoviesState {
  list: Movie[];
}

const initialState: MoviesState = { list: [] };

const moviesSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {
    setMovies(state, action: PayloadAction<Movie[]>) {
      state.list = action.payload;
    },
  },
});

export const { setMovies } = moviesSlice.actions;
export default moviesSlice.reducer;
