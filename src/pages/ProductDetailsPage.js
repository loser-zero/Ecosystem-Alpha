"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const react_router_dom_1 = require("react-router-dom");
const react_redux_1 = require("react-redux");
const react_router_dom_2 = require("react-router-dom");
const ProductDetailsPage = () => {
    const { id } = (0, react_router_dom_1.useParams)();
    const products = (0, react_redux_1.useSelector)((state) => state.products.products);
    const status = (0, react_redux_1.useSelector)((state) => state.products.status);
    const navigate = (0, react_router_dom_2.useNavigate)();
    // Проверка статуса загрузки
    if (status === 'loading') {
        return react_1.default.createElement("div", null, "Loading...");
    }
    const productId = parseInt(id, 10);
    const product = products.find((p) => p.id === productId);
    // Проверка наличия продукта
    if (!product) {
        return react_1.default.createElement("div", null, "Product not found");
    }
    return (react_1.default.createElement("div", { id: "content-container" },
        react_1.default.createElement("div", { className: "product-card" },
            react_1.default.createElement("div", { className: "product-card-img" },
                react_1.default.createElement("img", { src: product.image, alt: product.title })),
            react_1.default.createElement("div", { className: "product-card-content" },
                react_1.default.createElement("h3", null, product.title),
                react_1.default.createElement("p", null,
                    "Price: $",
                    product.price),
                react_1.default.createElement("p", null,
                    "Description: ",
                    product.description)),
            react_1.default.createElement("div", { className: "actions" },
                react_1.default.createElement("button", { onClick: () => navigate('/products') }, "Back to Products")))));
};
exports.default = ProductDetailsPage;
