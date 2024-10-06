import {createToken, revokeToken} from "./queries"
import type {H3Event} from "h3"
import {getUserByEmail, getUserByToken} from "../users/queries";
import {hash} from "node:crypto"
import type {Drizzle} from "~~/server/db/types";

export function hashPassword(password: string): string {
    return hash("sha256", password)
}

export function verifyPassword(password: string, hash: string): boolean {
    return hashPassword(password) === hash
}

export async function revokeAuthToken(event: H3Event) {
    const token = readAuthToken(event)
    if (!token) return true

    await revokeToken(token)
    return true
}

async function reValidateToken(token: string) {
    const user = await getUserByToken(token)
    if (!user) return null

    revokeToken(token)
    return createToken({userUlid: user.ulid})
}

export async function authenticate(user: {
    ulid?: string,
    email?: string,
    password?: string,
    token?: string
}): Promise<{ user: Drizzle.User.select; token: string } | null> {
    if (user.token) {
        const {token} = await reValidateToken(user.token) || {token: null}
        if (!token) return null

        return {
            user: await getUserByToken(token) as Drizzle.User.select,
            token
        }
    }

    if (!(user.email && user.password)) return null
    const _user = await getUserByEmail(user.email);
    if (!_user) return null

    if (!verifyPassword(user.password, _user.password)) return null
    const {token} = await createToken({userUlid: _user.ulid})
    return {
        user: _user,
        token
    }
}