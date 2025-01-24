"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/pages/App.tsx
const react_1 = __importDefault(require("react"));
const react_router_dom_1 = require("react-router-dom");
const ProductsPage_1 = __importDefault(require("./ProductsPage"));
const ProductDetailsPage_1 = __importDefault(require("./ProductDetailsPage"));
const CreateProductPage_1 = __importDefault(require("./CreateProductPage"));
const App = () => (react_1.default.createElement(react_router_dom_1.BrowserRouter, null,
    react_1.default.createElement(react_router_dom_1.Routes, null,
        react_1.default.createElement(react_router_dom_1.Route, { path: "/products", element: react_1.default.createElement(ProductsPage_1.default, null) }),
        react_1.default.createElement(react_router_dom_1.Route, { path: "/products/:id", element: react_1.default.createElement(ProductDetailsPage_1.default, null) }),
        react_1.default.createElement(react_router_dom_1.Route, { path: "/create-product", element: react_1.default.createElement(CreateProductPage_1.default, null) }))));
exports.default = App;
