import { Request, Response } from "express";
import log from '../utils/logger';
import { omit } from 'lodash';
import { createUser, findUser, updateUserField } from "../service/user.service";
import { CreateUserInput, ForgotPasswordUserInput, VerifyUserInput } from "../schema/user.schema";
import sendEmail from "../utils/mailer";
import { v4 as uuidv4 } from "uuid";

//lodash i omit usuwa z response elementy, które nie chcemy przekazać dalej. Wymagane jest użycie funkcji .toJSON() na obiekcie "user"
export async function createUserHandler(req: Request<{}, {}, CreateUserInput>, res: Response) {
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

export async function verifyUser(req: Request<VerifyUserInput>, res: Response) {
    try {
        const id = req.params.id;
        const user = await findUser({ _id: id });
        if (!user) {
            return res.status(404).send('Could not verify user');
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

export async function forgotPasswordHandler(req: Request<{}, {}, ForgotPasswordUserInput>, res: Response) {
    const message = "If a user with that email is registered you will receive a password reset email"
    const { email } = req.body;
    const user = await findUser({ email });

    if (!user) {
        log.debug(`User with email ${email} does not exists`);
        return res.send(message);
    }

    if (!user.verify) {
        return res.send('User is not verified');
    }

    const passwordResetCode = uuidv4();
    await updateUserField(user._id, { passwordResetCode });

    await sendEmail({
        to: user.email,
        from: "test@example.com",
        text: 
        `Password reset code: ${passwordResetCode} 
        ID: ${user._id}`
    });

    log.debug(`Password reset email sent to ${email}`);
    return res.send(message);
    
}