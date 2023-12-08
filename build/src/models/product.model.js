"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const uuid_1 = require("uuid");
const productSchema = new mongoose_1.default.Schema({
    productId: { type: String, unique: true, default: `product_${(0, uuid_1.v4)()}` },
    user: { type: mongoose_1.default.Schema.Types.ObjectId, ref: "User" },
    title: { type: String, required: true },
    description: { type: String, required: true },
    price: {
        type: Number, required: true
    },
    image: { type: String, required: true }
}, {
    timestamps: true
});
exports.ProductModel = mongoose_1.default.model("Product", productSchema);
