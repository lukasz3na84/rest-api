import { FilterQuery, UpdateQuery } from "mongoose";
import SessionModel, { SessionDocument } from "../models/session.model";
import { signJWT, verifyJWT } from "../utils/jwt.utils";
import { get } from "lodash";
import config from "config";
import { findUser } from "./user.service";

export async function createSession(userId: string, userAgent: string) {
    const session = await SessionModel.create({ user: userId, userAgent });
    return session.toJSON();
}

export function findSessions(query: FilterQuery<SessionDocument>) {
    return SessionModel.find(query).lean();
}

export async function updateSession(
    query: FilterQuery<SessionDocument>,
    update: UpdateQuery<SessionDocument>
) {
    return SessionModel.updateOne(query, update);

}

export async function reIssueAccessToken({ refreshToken }: { refreshToken: string }) {  
    const { decoded } = await verifyJWT(refreshToken);
    //jeśli nie ma decoded (jest null) lub nie ma sesji to zwracamy false  
    if (!decoded || !get(decoded, "session")) return false;

    //wyszukujemy sesję z rozkodowanego refreshTokena
    const session = await SessionModel.findById(get(decoded, "session"));

    //jesli nie znaleziono sesji lub wyszukana sesja jest valid to zwracamy false
    if (!session || !session.valid) return false;

    //wyszukujemy użytkownika na podstawie id z wyszukanej sesji
    const user = await findUser({ _id: session.user });

    //jełśi nie ma usera, zwracamy false
    if (!user) return false;

    //jak mamy usera i sesje, to robimy nowy accessToken
    const accessToken = signJWT(
        { ...user, session: session._id },
        { expiresIn: config.get("accessTokenTtl") } // 15 minutes
    );

    return accessToken;
}