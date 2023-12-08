import { object, number, string, TypeOf } from "zod"

const payload = {
    body: object({
        title: string({ required_error: "Title is rerquired" }),
        description: string({ required_error: "Description is rerquired" }).min(20, "Description should be at least 20 characters"),
        price: number({ required_error: "Price is rerquired" }),
        image: string({ required_error: "Image is rerquired" })
    })
};

const params = {
    params: object({
        productId: string({ required_error: "PorductId is required" })
    })
};

//jakmy "payload" lub "params" byłyby opakowane w object() zodowy to nei dało by siętego rozstrukturyzowac

export const createProductSchema = object({
    ...payload
});

export const updateProductSchema = object({
    ...payload,
    ...params
});

export const deleteProductSchema = object({ 
    ...params, 
});

export const getProductSchema = object({ 
    ...params, 
});

//typy potrzebne do parametrów w controllerze (jako rozszerzenie typu generycznego Requesta)
//<typeof nazwa> gdzie nazwa musi byc opakowana w object() zodowy
export type CreateProductInput = TypeOf<typeof createProductSchema>;
export type UpdateProductInput = TypeOf<typeof updateProductSchema>;
export type GetProductInput = TypeOf<typeof getProductSchema>;
export type DeleteProductInput = TypeOf<typeof deleteProductSchema>;