"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// CreateProductPage.tsx
const react_1 = __importDefault(require("react"));
const ProductForm_1 = __importDefault(require("../components/ProductForm"));
const CreateProductPage = () => {
    return (react_1.default.createElement("div", null,
        react_1.default.createElement("h1", null, "Create Product"),
        react_1.default.createElement(ProductForm_1.default, null)));
};
exports.default = CreateProductPage;
