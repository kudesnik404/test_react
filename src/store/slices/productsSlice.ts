import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import type { Movie } from "@/types";

interface ProductsState {
  products: Movie[];
  total: number;
  loading: boolean;
  error: string | null;
}

const initialState: ProductsState = {
  products: [],
  total: 0,
  loading: false,
  error: null,
};

export const fetchProducts = createAsyncThunk<{ products: Movie[]; total: number }, void>(
  "products/fetchProducts",
  async () => {
    const res = await fetch("/api/products");
    const data = await res.json();
    const products = data?.products ?? [];
    const total = typeof data?.total === "number" ? data.total : products.length;
    return { products, total };
  }
);

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setProducts(state, action: PayloadAction<Movie[]>) {
      state.products = action.payload;
      state.total = action.payload.length;
    },
    toggleFavorite(state, action: PayloadAction<{ id: string; value: boolean }>) {
      const { id, value } = action.payload;
      const index = state.products.findIndex((p) => p.id === id);
      if (index >= 0) {
        state.products[index] = { ...state.products[index], favourite: value };
        localStorage.setItem("products", JSON.stringify(state.products));
      }
    },
    removeProduct(state, action: PayloadAction<string>) {
      state.products = state.products.filter((m) => m.id !== action.payload);
    },
    addProduct(state, action: PayloadAction<Movie>) {
      state.products.unshift(action.payload);
    },
    updateProduct(state, action: PayloadAction<Movie>) {
      const updated = action.payload;

      const index = state.products.findIndex((p) => p.id === updated.id);

      if (index !== -1) {
        state.products[index] = {
          ...state.products[index],
          ...updated,
          id: state.products[index].id,
        };

        localStorage.setItem("products", JSON.stringify(state.products));
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload.products;
        state.total = action.payload.total;
        localStorage.setItem("products", JSON.stringify(state.products));
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Ошибка загрузки";
      });
  },
});

export const { setProducts, toggleFavorite, removeProduct, addProduct, updateProduct } =
  productsSlice.actions;
export default productsSlice.reducer;
