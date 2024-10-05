import {createToken, revokeToken} from "./queries"
import type {H3Event} from "h3"
import {getUserByEmail, getUserByToken} from "../users/queries";
import {hash} from "node:crypto"
import type {Drizzle} from "~~/server/db/types";

function hashPassword(password: string): string {
    return hash("sha256", password)
}

function verifyPassword(password: string, hash: string): boolean {
    return hashPassword(password) === hash
}

export async function revokeAuthToken(event: H3Event) {
    const token = readAuthToken(event)
    if (!token) return true

    await revokeToken(token)
    return true
}

async function reValidateToken(token: string) {
    const fail = {
        user: undefined,
        token: undefined
    }
    const user = await getUserByToken(token)
    if (!user) return fail

    revokeToken(token)
    return createToken({userUlid: user.ulid})
}

export async function authenticate(user: {
    ulid?: string,
    email?: string,
    password?: string,
    token?: string
}) : Promise<{user?: Drizzle.User.select; token?: string}>{
    if (user.token) return reValidateToken(user.token)

    const fail = {
        user: undefined,
        token: undefined
    }
    if (!(user.email && user.password)) return fail

    const _user = await getUserByEmail(user.email)
    if(!_user) return fail

    if (!verifyPassword(user.password, _user.password)) return fail

    return createToken({userUlid: _user.ulid})
}