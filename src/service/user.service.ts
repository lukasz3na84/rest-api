import { DocumentDefinition, FilterQuery, UpdateQuery } from 'mongoose'
import UserModel, { UserDocument } from '../models/user.model';
import { omit } from 'lodash';

export async function createUser(input: DocumentDefinition<Omit<UserDocument, "createdAt" | "updatedAt" | "comparePassword" | "verificationCode" | "verify" | "passwordResetCode">>
) {
    try {
        const user = await UserModel.create(input);
        return omit(user.toJSON(), "password");
    } catch (error: any) {
        throw new Error(error);
    }
}

export async function validatePassword({ email, password }: { email: string, password: string }) {
    const user = await UserModel.findOne({ email });

    if (!user) {
        return false;
    }
    const isValid = await user.comparePassword(password);
    if (!isValid) return false;

    return omit(user.toJSON(), "password");
}

export async function findUser(query: FilterQuery<UserDocument>) {
    const user = await UserModel.findOne(query).lean();
    if (!user) {
        return false;
    }
    return omit(user, "password");
}

export async function updateUserField( userId: FilterQuery<UserDocument>, update: UpdateQuery<UserDocument> ) {
await UserModel.updateOne({ _id: userId }, { $set: update });
}