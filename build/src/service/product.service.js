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
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProduct = exports.findAndUpdateProduct = exports.findProduct = exports.createProduct = void 0;
const product_model_1 = require("../models/product.model");
function createProduct(input) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield product_model_1.ProductModel.create(input);
    });
}
exports.createProduct = createProduct;
function findProduct(query, options = { lean: true }) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield product_model_1.ProductModel.findOne(query, {}, options);
    });
}
exports.findProduct = findProduct;
function findAndUpdateProduct(query, update, options) {
    return __awaiter(this, void 0, void 0, function* () {
        return product_model_1.ProductModel.findOneAndUpdate(query, update, options);
    });
}
exports.findAndUpdateProduct = findAndUpdateProduct;
function deleteProduct(query) {
    return __awaiter(this, void 0, void 0, function* () {
        return product_model_1.ProductModel.deleteOne(query);
    });
}
exports.deleteProduct = deleteProduct;
