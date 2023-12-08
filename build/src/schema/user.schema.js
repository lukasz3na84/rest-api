"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUserSchema = void 0;
const zod_1 = require("zod");
//obiekt potrzebny do walidacji w routerze jako middleware oraz controllera
// "body" jako nazwa ma być spójne z nazwą użytą w schema.parse (validate) oraz w paramtrach controllera CreateUserInput["body"]
exports.createUserSchema = (0, zod_1.object)({
    body: (0, zod_1.object)({
        name: (0, zod_1.string)({ required_error: 'Name is required' }),
        password: (0, zod_1.string)({ required_error: 'Password is required' }).min(6, 'Password to short- should be 6 chars minimum'),
        passwordConfirmation: (0, zod_1.string)({ required_error: 'passwordconfirmation is required' }),
        email: (0, zod_1.string)({ required_error: 'Email is required' }).email('Not a valid email'),
    }).refine((data) => data.password === data.passwordConfirmation, {
        message: 'Password do not match',
        path: ['passwordConfirmation']
    })
});
