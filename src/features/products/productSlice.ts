// features/products/productSlice.ts
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Product } from "../../types/Product";
import { fetchProducts } from "./productApi";

interface ProductState {
  products: Product[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: ProductState = {
  products: [],
  status: "idle",
  error: null,
};

export const fetchProductsAsync = createAsyncThunk(
  "products/fetchProducts",
  async () => {
    const response = await fetchProducts();
    return response.map((product) => ({ ...product, liked: false }));
  }
);

export const addProductAsync = createAsyncThunk(
  "products/addProduct",
  async (newProduct: Omit<Product, "id">) => {
    const id = Date.now();
    const productWithId = { ...newProduct, id, liked: false };
    console.log("Добавление продукта:", productWithId); // Логируем новый продукт
    return productWithId;
  }
);

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    toggleLike: (state, action) => {
      const productIndex = state.products.findIndex(
        (p) => p.id === action.payload
      );
      if (productIndex !== -1) {
        state.products[productIndex].liked =
          !state.products[productIndex].liked;
      }
    },
    removeProduct: (state, action) => {
      state.products = state.products.filter((p) => p.id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addProductAsync.fulfilled, (state, action) => {
        // Проверяем, нет ли уже такого продукта
        const existingProduct = state.products.find(product => product.id === action.payload.id);
        if (!existingProduct) {
          state.products.push(action.payload); // Добавляем новый продукт, если его нет
        }
      })
      .addCase(fetchProductsAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProductsAsync.fulfilled, (state, action) => {
        state.status = "succeeded";
        // Обновляем массив продуктов, избегая дублирования
        state.products = action.payload.map(product => {
          const existingProduct = state.products.find(p => p.id === product.id);
          return existingProduct ? existingProduct : product; // Если продукт уже есть, используем его
        });
        console.log("Полученные продукты:", action.payload); // Логируем полученные продукты
      })
      // .addCase(fetchProductsAsync.rejected, (state, action) => {
      //   state.status = "failed";
      //   state.error = action.error.message ?? null;
      // });
}
});

export const { toggleLike, removeProduct } = productSlice.actions;
export default productSlice.reducer;
