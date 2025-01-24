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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
// ./components/ProductForm.tsx
const react_1 = __importStar(require("react"));
const react_redux_1 = require("react-redux");
const productSlice_1 = require("../features/products/productSlice");
const react_router_dom_1 = require("react-router-dom");
const ProductForm = () => {
    const [formData, setFormData] = (0, react_1.useState)({
        title: '',
        price: 0,
        description: '',
        image: '',
        category: '',
        rating: { rate: 0, count: 0 },
    });
    const [errors, setErrors] = (0, react_1.useState)({});
    const dispatch = (0, react_redux_1.useDispatch)();
    const navigate = (0, react_router_dom_1.useNavigate)();
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(Object.assign(Object.assign({}, formData), { [name]: name === 'price' ? Number(value) : value }));
    };
    const handleSubmit = (e) => __awaiter(void 0, void 0, void 0, function* () {
        e.preventDefault();
        const newErrors = {};
        if (!formData.title.trim())
            newErrors.title = 'Название обязательно';
        if (formData.price <= 0)
            newErrors.price = 'Цена должна быть больше нуля';
        if (!formData.description.trim())
            newErrors.description = 'Описание обязательно';
        if (!formData.image.trim())
            newErrors.image = 'URL изображения обязателен';
        if (!formData.category.trim())
            newErrors.category = 'Категория обязательна';
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }
        try {
            const resultAction = yield dispatch((0, productSlice_1.addProductAsync)(formData));
            if (productSlice_1.addProductAsync.fulfilled.match(resultAction)) {
                navigate('/products');
            }
        }
        catch (error) {
            console.error("Ошибка при добавлении продукта:", error);
        }
    });
    return (react_1.default.createElement("form", { className: "product-form", onSubmit: handleSubmit },
        react_1.default.createElement("div", null,
            react_1.default.createElement("label", { htmlFor: "title" }, "Title:"),
            react_1.default.createElement("input", { type: "text", id: "title", name: "title", value: formData.title, onChange: handleChange }),
            errors.title && react_1.default.createElement("span", null, errors.title)),
        react_1.default.createElement("div", null,
            react_1.default.createElement("label", { htmlFor: "price" }, "Price:"),
            react_1.default.createElement("input", { type: "number", id: "price", name: "price", value: formData.price, onChange: handleChange }),
            errors.price && react_1.default.createElement("span", null, errors.price)),
        react_1.default.createElement("div", null,
            react_1.default.createElement("label", { htmlFor: "description" }, "Description:"),
            react_1.default.createElement("textarea", { id: "description", name: "description", value: formData.description, onChange: handleChange }),
            errors.description && react_1.default.createElement("span", null, errors.description)),
        react_1.default.createElement("div", null,
            react_1.default.createElement("label", { htmlFor: "image" }, "Image URL:"),
            react_1.default.createElement("input", { type: "text", id: "image", name: "image", value: formData.image, onChange: handleChange }),
            errors.image && react_1.default.createElement("span", null, errors.image)),
        react_1.default.createElement("div", null,
            react_1.default.createElement("label", { htmlFor: "category" }, "Category:"),
            react_1.default.createElement("input", { type: "text", id: "category", name: "category", value: formData.category, onChange: handleChange }),
            errors.category && react_1.default.createElement("span", null, errors.category)),
        react_1.default.createElement("button", { type: "submit" }, "Create Product")));
};
exports.default = ProductForm;
