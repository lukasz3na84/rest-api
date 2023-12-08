"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const config_1 = __importDefault(require("config"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const uuid_1 = require("uuid");
const UserSchema = new mongoose_1.default.Schema({
    email: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    password: { type: String, required: true },
    verificationCode: { type: String, required: true, default: () => (0, uuid_1.v4)() },
    verify: { type: Boolean, default: false }
}, {
    timestamps: true
});
// "save": Uruchamiane przed zapisaniem dokumentu do bazy danych.
UserSchema.pre("save", function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        let user = this;
        // hashuj hasło tylko wtedy, gdy zostało zmodyfikowane (lub jest nowe)
        if (!user.isModified("password"))
            return next();
        //Random additional data
        const salt = yield bcrypt_1.default.genSalt(config_1.default.get("saltWorkFactor"));
        const hash = yield bcrypt_1.default.hashSync(user.password, salt);
        //replace the password with the hash
        user.password = hash;
        return next();
    });
});
//Used for logging in
UserSchema.methods.comparePassword = function (candidatePassword) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = this;
        return bcrypt_1.default.compare(candidatePassword, user.password).catch((error) => false);
    });
};
const UserModel = mongoose_1.default.model('User', UserSchema);
exports.default = UserModel;
