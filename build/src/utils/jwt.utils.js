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
exports.verifyJWT = exports.signJWT = void 0;
const config_1 = __importDefault(require("config"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const privateKey = config_1.default.get("privateKey");
const publicKey = config_1.default.get("publicKey");
// Zapis ...(options && options) w kontekście JavaScript jest używany do rozpakowywania obiektu options, 
// ale tylko wtedy, gdy options jest zdefiniowane (nie jest undefined). Działa to na zasadzie krótkiego układu oceny (ternary operator), 
// w którym rozpakowywanie jest wykonywane tylko wtedy, gdy warunek options && options jest spełniony (czyli options nie jest undefined).
function signJWT(object, options) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield jsonwebtoken_1.default.sign(object, privateKey, Object.assign(Object.assign({}, (options && options)), { algorithm: 'RS256' }));
    });
}
exports.signJWT = signJWT;
function verifyJWT(token) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const decoded = jsonwebtoken_1.default.verify(token, publicKey);
            return {
                valid: true,
                expired: false,
                decoded
            };
        }
        catch (error) {
            return {
                valid: false,
                expired: error.message === 'jwt expired',
                decoded: null
            };
        }
    });
}
exports.verifyJWT = verifyJWT;
