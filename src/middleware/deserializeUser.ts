import { NextFunction, Request, Response } from "express";
import { get } from 'lodash';
import { verifyJWT } from "../utils/jwt.utils";
import { reIssueAccessToken } from "../service/session.service";


/*
get(req, "headers.authorization", "") - Funkcja get próbuje pobrać wartość o wskazanej ścieżce. Jeśli taka wartość istnieje, 
 zostanie zwrócona; w przeciwnym razie zwrócona zostanie pusta wartość (""). Ostatecznie, to wyrażenie jest używane do próby pobrania wartości nagłówka "authorization" 
 z obiektu req.

.replace(/^Bearer\s/,"") - Jest to metoda wywoływana na wyniku poprzedniego wyrażenia. Metoda replace() służy do zamiany fragmentów łańcucha znaków. 
W tym przypadku zamienia się początkowy tekst łańcucha, który pasuje do wyrażenia regularnego ^Bearer\s, na pusty ciąg znaków, 
co oznacza usunięcie "Bearer " z początku tekstu.
*/

const deserializeUser = async (req: Request, res: Response, next: NextFunction) => {
    //pobranie accessTokena z nagłówka requesta
    const accessToken = get(req, "headers.authorization", "").replace(
        /^Bearer\s/, "");      
        
    //pobranie RefreshTokena z nagłówka requesta    
    const refreshToken = get(req, "headers.x-refresh","") as string;
 
    if (!accessToken) {
        return next();
    }

    const { expired, decoded } = await verifyJWT(accessToken);

    if (decoded) {
        res.locals.user = decoded;
        return next()
    };

    //jesli expired==true && jest refresToken to wywyołujemy funkcję z utworzeniem nowego accessTokena-> reIssueAccessToken
    if (expired && refreshToken) {
        const newAccessToken = await reIssueAccessToken({ refreshToken });

    //dodanie nowego accessTokena do nagłówka    
        if(newAccessToken) {
            res.setHeader('x-access-token', newAccessToken);
        }

     //dopisanie obiektu decoded do res.locals.user   
        const result = await verifyJWT(newAccessToken as string);
        res.locals.user = result.decoded;
    }

    return next()
}

export default deserializeUser;

