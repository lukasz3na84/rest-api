import { DocumentDefinition, FilterQuery, QueryOptions, UpdateQuery } from "mongoose";
import { ProductDocument, ProductModel } from "../models/product.model";

export async function createProduct(input: DocumentDefinition<Omit<ProductDocument, "createdAt" | "updatedAt">>) {
    return await ProductModel.create(input);
}

export async function findProduct(query: FilterQuery<ProductDocument>, options: QueryOptions = { lean: true }) {   
    return await ProductModel.findOne(query, {}, options)
}


export async function findAndUpdateProduct(query: FilterQuery<ProductDocument>, update: UpdateQuery<ProductDocument>, options: QueryOptions) {
    return ProductModel.findOneAndUpdate(query, update, options);
}


export async function deleteProduct(query: FilterQuery<ProductDocument>) {
    return ProductModel.deleteOne(query);
}
