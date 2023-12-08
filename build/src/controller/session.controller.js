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
exports.deleteSessionsHandler = exports.getUserSessionsHandler = exports.createUserSessionHandler = void 0;
const user_service_1 = require("../service/user.service");
const session_service_1 = require("../service/session.service");
const jwt_utils_1 = require("../utils/jwt.utils");
const config_1 = __importDefault(require("config"));
function createUserSessionHandler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        // Validate the user's password
        const user = yield (0, user_service_1.validatePassword)(req.body);
        if (!user) {
            return res.status(401).send('Invalid user email or spassword');
        }
        // create a session
        const session = yield (0, session_service_1.createSession)(user._id, req.get("user-agent") || "");
        // create an access token
        const accessToken = yield (0, jwt_utils_1.signJWT)(Object.assign(Object.assign({}, user), { session: session._id }), { expiresIn: config_1.default.get('accessTokenTtl') });
        // create a refresh token
        const refreshToken = yield (0, jwt_utils_1.signJWT)(Object.assign(Object.assign({}, user), { session: session._id }), { expiresIn: config_1.default.get('refreshTokenTtl') });
        // return access & refresh tokens
        res.send({ accessToken, refreshToken });
    });
}
exports.createUserSessionHandler = createUserSessionHandler;
function getUserSessionsHandler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const userId = res.locals.user._id;
        const sessions = yield (0, session_service_1.findSessions)({ user: userId, valid: true });
        return res.send(sessions);
    });
}
exports.getUserSessionsHandler = getUserSessionsHandler;
function deleteSessionsHandler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const sessionId = res.locals.user.session; //w payload JWT był podany sessionId
        yield (0, session_service_1.updateSession)({ _id: sessionId }, { valid: false });
        return res.send({
            accessToken: null,
            refreshToken: null
        });
    });
}
exports.deleteSessionsHandler = deleteSessionsHandler;
