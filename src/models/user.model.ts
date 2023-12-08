import mongoose from "mongoose";
import config from "config";
import bcrypt from "bcrypt";
import { v4 as uuidv4 } from 'uuid';

//tutaj "document" jako instancja
//porzebny do przekazania do serwisu
export interface UserDocument extends mongoose.Document {
    email: string;
    name: string;
    password: string;
    createdAt: Date;
    updatedAt: Date;
    verificationCode: string
    verify: boolean
    comparePassword(candidatePassword: string): Promise<boolean>;
}

const UserSchema = new mongoose.Schema(
    {
        email: { type: String, required: true, unique: true },
        name: { type: String, required: true },
        password: { type: String, required: true },
        verificationCode: { type: String, required: true, default: () => uuidv4() },
        verify: {type: Boolean, default: false}
    },
    {
        timestamps: true
    }
);

// "save": Uruchamiane przed zapisaniem dokumentu do bazy danych.
UserSchema.pre("save", async function (next: mongoose.HookNextFunction) {
    let user = this as UserDocument;

    // hashuj hasło tylko wtedy, gdy zostało zmodyfikowane (lub jest nowe)
    if (!user.isModified("password")) return next()

    //Random additional data
    const salt = await bcrypt.genSalt(config.get<number>("saltWorkFactor"));
    const hash = await bcrypt.hashSync(user.password, salt);

    //replace the password with the hash
    user.password = hash;

    return next();
});

//Used for logging in
UserSchema.methods.comparePassword = async function (candidatePassword: string) : Promise<boolean> {
    const user = this as UserDocument;

    return bcrypt.compare(candidatePassword, user.password).catch((error) => false);
};

const UserModel = mongoose.model<UserDocument>('User', UserSchema);

export default UserModel;