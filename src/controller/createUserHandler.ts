import { Request, Response } from "express";
import log from '../utils/logger';
import { omit } from 'lodash';
import { createUser } from "../service/user.service";
import { CreateUserInput } from "../schema/user.schema";

//lodash i omit usuwa z response elementy, które nie chcemy przekazać dalej. Wymagane jest użycie funkcji .toJSON() na obiekcie "user"
export async function createUserHandler(req: Request<{}, {}, CreateUserInput["body"]>, res: Response) {
    try {
        const user = await createUser(req.body);
        return res.send(user);
    } catch (error: any) {
        log.error(error)
        return res.status(409).send(error.message);
    }
}