import { Request, Response } from "express";
import log from '../utils/logger';
import { omit } from 'lodash';
import { createUser, findUser, updateUserField } from "../service/user.service";
import { CreateUserInput, VerifyUserSchema } from "../schema/user.schema";
import sendEmail from "../utils/mailer";

//lodash i omit usuwa z response elementy, które nie chcemy przekazać dalej. Wymagane jest użycie funkcji .toJSON() na obiekcie "user"
export async function createUserHandler(req: Request<{}, {}, CreateUserInput["body"]>, res: Response) {
    try {
        const user = await createUser(req.body);
        await sendEmail({
            from: 'test@example.com',
            to: user.email,
            subject: "Please verify your account",
            text:
                `Verification code: ${user.verificationCode} 
            ID: ${user._id}`
        });
        return res.send(user);
    } catch (error: any) {
        log.error(error)
        return res.status(409).send(error.message);
    }
}

export async function verifyUser(req: Request<VerifyUserSchema["params"]>, res: Response) {
    try {
        const id = req.params.id;
        const user = await findUser({ _id: id });
        if (!user) {
            return res.send('User not verified');
        }

        if (user.verify) {
            return res.send('User is already verified');
        }

        const verificationCode = req.params.verificationCode;
        if (verificationCode === user.verificationCode) {
            await updateUserField(user._id, { verify: true })
            return res.send('User successfully verified');
        }
        return res.status(400).send('User not verified');

    } catch (error: any) {
        log.error(error)
        return res.status(409).send(error.message);
    }
}