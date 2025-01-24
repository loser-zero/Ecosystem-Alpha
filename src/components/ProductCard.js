"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// ./components/ProductCard.tsx
const react_1 = __importDefault(require("react"));
const react_redux_1 = require("react-redux");
const productSlice_1 = require("../features/products/productSlice");
const react_router_dom_1 = require("react-router-dom");
const fa_1 = require("react-icons/fa");
const ProductCard = ({ product }) => {
    const dispatch = (0, react_redux_1.useDispatch)();
    const navigate = (0, react_router_dom_1.useNavigate)(); // Используем navigate
    const handleCardClick = (event) => {
        const target = event.target;
        if (!target.closest('.actions')) {
            navigate(`/products/${product.id}`);
        }
    };
    return (react_1.default.createElement("div", { className: "product-card", onClick: handleCardClick },
        react_1.default.createElement("div", { className: 'product-card-img' },
            react_1.default.createElement("img", { src: product.image, alt: product.title })),
        react_1.default.createElement("div", { className: "product-card-content" },
            react_1.default.createElement("h3", null, product.title),
            react_1.default.createElement("p", null,
                product.description.substring(0, 100),
                "..."),
            react_1.default.createElement("div", { className: "actions" },
                react_1.default.createElement("button", { onClick: (e) => { e.stopPropagation(); dispatch((0, productSlice_1.toggleLike)(product.id)); } }, product.liked ? react_1.default.createElement(fa_1.FaHeart, { color: "red" }) : react_1.default.createElement(fa_1.FaRegHeart, null)),
                react_1.default.createElement("button", { onClick: (e) => { e.stopPropagation(); dispatch((0, productSlice_1.removeProduct)(product.id)); } }, "\u0423\u0434\u0430\u043B\u0438\u0442\u044C")))));
};
exports.default = ProductCard;
