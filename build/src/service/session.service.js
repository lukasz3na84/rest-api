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
exports.reIssueAccessToken = exports.updateSession = exports.findSessions = exports.createSession = void 0;
const session_model_1 = __importDefault(require("../models/session.model"));
const jwt_utils_1 = require("../utils/jwt.utils");
const lodash_1 = require("lodash");
const config_1 = __importDefault(require("config"));
const user_service_1 = require("./user.service");
function createSession(userId, userAgent) {
    return __awaiter(this, void 0, void 0, function* () {
        const session = yield session_model_1.default.create({ user: userId, userAgent });
        return session.toJSON();
    });
}
exports.createSession = createSession;
function findSessions(query) {
    return session_model_1.default.find(query).lean();
}
exports.findSessions = findSessions;
function updateSession(query, update) {
    return __awaiter(this, void 0, void 0, function* () {
        return session_model_1.default.updateOne(query, update);
    });
}
exports.updateSession = updateSession;
function reIssueAccessToken({ refreshToken }) {
    return __awaiter(this, void 0, void 0, function* () {
        const { decoded } = yield (0, jwt_utils_1.verifyJWT)(refreshToken);
        //jeśli nie ma decoded (jest null) lub nie ma sesji to zwracamy false  
        if (!decoded || !(0, lodash_1.get)(decoded, "session"))
            return false;
        //wyszukujemy sesję z rozkodowanego refreshTokena
        const session = yield session_model_1.default.findById((0, lodash_1.get)(decoded, "session"));
        //jesli nie znaleziono sesji lub wyszukana sesja jest valid to zwracamy false
        if (!session || !session.valid)
            return false;
        //wyszukujemy użytkownika na podstawie id z wyszukanej sesji
        const user = yield (0, user_service_1.findUser)({ _id: session.user });
        //jełśi nie ma usera, zwracamy false
        if (!user)
            return false;
        //jak mamy usera i sesje, to robimy nowy accessToken
        const accessToken = (0, jwt_utils_1.signJWT)(Object.assign(Object.assign({}, user), { session: session._id }), { expiresIn: config_1.default.get("accessTokenTtl") } // 15 minutes
        );
        return accessToken;
    });
}
exports.reIssueAccessToken = reIssueAccessToken;
