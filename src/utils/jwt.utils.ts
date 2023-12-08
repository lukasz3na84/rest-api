import config from 'config';
import jwt, { JwtPayload } from 'jsonwebtoken';

const privateKey = config.get<string>("privateKey");
const publicKey = config.get<string>("publicKey");

// Zapis ...(options && options) w kontekście JavaScript jest używany do rozpakowywania obiektu options, 
// ale tylko wtedy, gdy options jest zdefiniowane (nie jest undefined). Działa to na zasadzie krótkiego układu oceny (ternary operator), 
// w którym rozpakowywanie jest wykonywane tylko wtedy, gdy warunek options && options jest spełniony (czyli options nie jest undefined).
export async function signJWT(
    object: Object,
    options?: jwt.SignOptions | undefined
) {
    return await jwt.sign(object, privateKey, {
        ...(options && options),
        algorithm: 'RS256'
    });
}

export async function verifyJWT(token: string) {
    try {
        const decoded = jwt.verify(token, publicKey)
        return {
            valid: true,
            expired: false,
            decoded
        };
    } catch (error: any) {
        return {
            valid: false,
            expired: error.message === 'jwt expired',
            decoded: null
        }
    }
}