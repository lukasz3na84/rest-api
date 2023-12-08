"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//uzycie currying
const validate = (schema) => (req, res, next) => {
    try {
        schema.parse({
            body: req.body,
            query: req.query,
            params: req.params
        });
        next();
    }
    catch (error) {
        return res.status(400).send(error.error);
    }
};
exports.default = validate;
