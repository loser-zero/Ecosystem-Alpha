"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// ./components/ProductList.tsx
const react_1 = __importDefault(require("react"));
const ProductCard_1 = __importDefault(require("./ProductCard"));
const ProductList = ({ products }) => {
    return (react_1.default.createElement("div", { className: "product-grid" }, products.map(product => (react_1.default.createElement(ProductCard_1.default, { key: product.id, product: product })))));
};
exports.default = ProductList;
