import { Express, Request, Response } from "express";
import { createUserHandler, forgotPasswordHandler, resetPasswordHandler, verifyUser } from "../controller/user.controller";
import validateResources from "../middleware/validateResources";
import { createUserSchema, forgotPasswordUserSchema, resetPasswordSchema } from "../schema/user.schema";
import createSessionSchema from "../schema/session.schema";
import { createUserSessionHandler, deleteSessionsHandler, getUserSessionsHandler } from "../controller/session.controller";
import requireUser from "../middleware/requireUser";
import { createProductSchema, deleteProductSchema, getProductSchema, updateProductSchema } from "../schema/product.schema";
import { createProductHandler, deleteProductHandler, getProductHandler, updateProductHandler } from "../controller/product.controller";

export default function (app: Express) {
    app.get('/healthcheck', (req: Request, res: Response) => res.sendStatus(200));

    //Register user
    app.post('/api/users', validateResources(createUserSchema), createUserHandler);

    //Verify user
    app.post('/api/users/verify/:id/:verificationCode', verifyUser);
    
   
    //Login
    // POST /api/sessions
    app.post('/api/sessions', validateResources(createSessionSchema), createUserSessionHandler);

    //send reset password email
    app.post('/api/users/forgotpassword', validateResources(forgotPasswordUserSchema), forgotPasswordHandler);

    //reset password
    app.post('/api/users/resetpassword/:id/:passwordResetCode', validateResources(resetPasswordSchema), resetPasswordHandler);

    //get user's sesions
    // GET /api/sessions
    app.get('/api/sessions', requireUser, getUserSessionsHandler);

    //logout
    // DELETE /api/sessions
    app.delete('/api/sessions', requireUser, deleteSessionsHandler);

    app.post('/api/products', [requireUser, validateResources(createProductSchema)], createProductHandler);

    app.put('/api/products/:productId', [requireUser, validateResources(updateProductSchema)], updateProductHandler);

    app.get('/api/products/:productId', [requireUser, validateResources(getProductSchema)], getProductHandler);
    
    app.delete('/api/products/:productId', [requireUser, validateResources(deleteProductSchema)], deleteProductHandler);
}