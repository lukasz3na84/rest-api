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
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = require("lodash");
const jwt_utils_1 = require("../utils/jwt.utils");
const session_service_1 = require("../service/session.service");
/*
get(req, "headers.authorization", "") - Funkcja get próbuje pobrać wartość o wskazanej ścieżce. Jeśli taka wartość istnieje,
 zostanie zwrócona; w przeciwnym razie zwrócona zostanie pusta wartość (""). Ostatecznie, to wyrażenie jest używane do próby pobrania wartości nagłówka "authorization"
 z obiektu req.

.replace(/^Bearer\s/,"") - Jest to metoda wywoływana na wyniku poprzedniego wyrażenia. Metoda replace() służy do zamiany fragmentów łańcucha znaków.
W tym przypadku zamienia się początkowy tekst łańcucha, który pasuje do wyrażenia regularnego ^Bearer\s, na pusty ciąg znaków,
co oznacza usunięcie "Bearer " z początku tekstu.
*/
const deserializeUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    //pobranie accessTokena z nagłówka requesta
    const accessToken = (0, lodash_1.get)(req, "headers.authorization", "").replace(/^Bearer\s/, "");
    //pobranie RefreshTokena z nagłówka requesta    
    const refreshToken = (0, lodash_1.get)(req, "headers.x-refresh", "");
    if (!accessToken) {
        return next();
    }
    const { expired, decoded } = yield (0, jwt_utils_1.verifyJWT)(accessToken);
    if (decoded) {
        res.locals.user = decoded;
        return next();
    }
    ;
    //jesli expired==true && jest refresToken to wywyołujemy funkcję z utworzeniem nowego accessTokena-> reIssueAccessToken
    if (expired && refreshToken) {
        const newAccessToken = yield (0, session_service_1.reIssueAccessToken)({ refreshToken });
        //dodanie nowego accessTokena do nagłówka    
        if (newAccessToken) {
            res.setHeader('x-access-token', newAccessToken);
        }
        //dopisanie obiektu decoded do res.locals.user   
        const result = yield (0, jwt_utils_1.verifyJWT)(newAccessToken);
        res.locals.user = result.decoded;
    }
    return next();
});
exports.default = deserializeUser;
