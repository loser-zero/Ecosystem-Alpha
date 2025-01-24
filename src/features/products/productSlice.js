"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeProduct = exports.toggleLike = exports.addProductAsync = exports.fetchProductsAsync = void 0;
// features/products/productSlice.ts
const toolkit_1 = require("@reduxjs/toolkit");
const productApi_1 = require("./productApi");
const initialState = {
    products: [],
    status: "idle",
    error: null,
};
exports.fetchProductsAsync = (0, toolkit_1.createAsyncThunk)("products/fetchProducts", () => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield (0, productApi_1.fetchProducts)();
    return response.map((product) => (Object.assign(Object.assign({}, product), { liked: false })));
}));
exports.addProductAsync = (0, toolkit_1.createAsyncThunk)("products/addProduct", (newProduct) => __awaiter(void 0, void 0, void 0, function* () {
    const id = Date.now();
    const productWithId = Object.assign(Object.assign({}, newProduct), { id, liked: false });
    console.log("Добавление продукта:", productWithId); // Логируем новый продукт
    return productWithId;
}));
const productSlice = (0, toolkit_1.createSlice)({
    name: "products",
    initialState,
    reducers: {
        toggleLike: (state, action) => {
            const productIndex = state.products.findIndex((p) => p.id === action.payload);
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
            .addCase(exports.addProductAsync.fulfilled, (state, action) => {
            // Проверяем, нет ли уже такого продукта
            const existingProduct = state.products.find(product => product.id === action.payload.id);
            if (!existingProduct) {
                state.products.push(action.payload); // Добавляем новый продукт, если его нет
            }
        })
            .addCase(exports.fetchProductsAsync.pending, (state) => {
            state.status = "loading";
        })
            .addCase(exports.fetchProductsAsync.fulfilled, (state, action) => {
            state.status = "succeeded";
            // Обновляем массив продуктов, избегая дублирования
            state.products = action.payload.map(product => {
                const existingProduct = state.products.find(p => p.id === product.id);
                return existingProduct ? existingProduct : product; // Если продукт уже есть, используем его
            });
            console.log("Полученные продукты:", action.payload); // Логируем полученные продукты
        });
        // .addCase(fetchProductsAsync.rejected, (state, action) => {
        //   state.status = "failed";
        //   state.error = action.error.message ?? null;
        // });
    }
});
// eslint-disable-next-line no-unused-expressions
_a = productSlice.actions, exports.toggleLike = _a.toggleLike, exports.removeProduct = _a.removeProduct;
exports.default = productSlice.reducer;
