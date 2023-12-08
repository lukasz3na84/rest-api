"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProductSchema = exports.deleteProductSchema = exports.updateProductSchema = exports.createProductSchema = void 0;
const zod_1 = require("zod");
const payload = {
    body: (0, zod_1.object)({
        title: (0, zod_1.string)({ required_error: "Title is rerquired" }),
        description: (0, zod_1.string)({ required_error: "Description is rerquired" }).min(20, "Description should be at least 20 characters"),
        price: (0, zod_1.number)({ required_error: "Price is rerquired" }),
        image: (0, zod_1.string)({ required_error: "Image is rerquired" })
    })
};
const params = {
    params: (0, zod_1.object)({
        productId: (0, zod_1.string)({ required_error: "PorductId is required" })
    })
};
//jakmy "payload" lub "params" byłyby opakowane w object() zodowy to nei dało by siętego rozstrukturyzowac
exports.createProductSchema = (0, zod_1.object)(Object.assign({}, payload));
exports.updateProductSchema = (0, zod_1.object)(Object.assign(Object.assign({}, payload), params));
exports.deleteProductSchema = (0, zod_1.object)(Object.assign({}, params));
exports.getProductSchema = (0, zod_1.object)(Object.assign({}, params));
