"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// ProductsPage.tsx
const react_1 = __importStar(require("react"));
const react_redux_1 = require("react-redux");
const productSlice_1 = require("../features/products/productSlice");
const ProductList_1 = __importDefault(require("../components/ProductList"));
const ProductsPage = () => {
    const dispatch = (0, react_redux_1.useDispatch)();
    const status = (0, react_redux_1.useSelector)((state) => state.products.status);
    const products = (0, react_redux_1.useSelector)((state) => state.products.products);
    console.log("Продукты на странице ProductsPage:", products);
    const [filter, setFilter] = (0, react_1.useState)('all');
    (0, react_1.useEffect)(() => {
        console.log("Получение продуктов...");
        dispatch((0, productSlice_1.fetchProductsAsync)());
    }, [dispatch]);
    (0, react_1.useEffect)(() => {
        console.log("Продукты на странице ProductsPage:", products);
    }, [products]);
    const filteredProducts = filter === 'favorites'
        ? products.filter(product => product.liked)
        : products;
    return (react_1.default.createElement("div", null,
        react_1.default.createElement("h1", null, "Products"),
        react_1.default.createElement("div", null,
            react_1.default.createElement("button", { onClick: () => setFilter('all') }, "\u0412\u0441\u0435"),
            react_1.default.createElement("button", { onClick: () => setFilter('favorites') }, "\u0418\u0437\u0431\u0440\u0430\u043D\u043D\u044B\u0435")),
        status === 'loading' && react_1.default.createElement("p", null, "Loading..."),
        status === 'succeeded' && react_1.default.createElement(ProductList_1.default, { products: filteredProducts }),
        status === 'failed' && react_1.default.createElement("p", null, "Error loading products")));
};
exports.default = ProductsPage;
