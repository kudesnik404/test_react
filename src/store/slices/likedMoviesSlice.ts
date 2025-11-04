import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface LikedMovie {
  id: string;
  name: string;
}

interface LikedMoviesState {
  movies: LikedMovie[];
}

const initialState: LikedMoviesState = {
  movies: [],
};

const likedMoviesSlice = createSlice({
  name: "likedMovies",
  initialState,
  reducers: {
    addLikedMovie(state, action: PayloadAction<LikedMovie>) {
      if (!state.movies.find((m) => m.id === action.payload.id)) {
        state.movies.push(action.payload);
      }
    },
    removeLikedMovie(state, action: PayloadAction<string>) {
      state.movies = state.movies.filter((m) => m.id !== action.payload);
    },
    setLikedMovies(state, action: PayloadAction<LikedMovie[]>) {
      state.movies = action.payload; // для восстановления из localStorage
    },
  },
});

export const { addLikedMovie, removeLikedMovie, setLikedMovies } = likedMoviesSlice.actions;
export default likedMoviesSlice.reducer;
