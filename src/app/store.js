"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.store = void 0;
// app/store.ts
const toolkit_1 = require("@reduxjs/toolkit");
const productSlice_1 = __importDefault(require("../features/products/productSlice"));
exports.store = (0, toolkit_1.configureStore)({
    reducer: {
        products: productSlice_1.default,
    },
});
