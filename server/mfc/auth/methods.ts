import {createToken, revokeToken, revokeTokens} from "./queries"
import type {H3Event} from "h3"
import {getUserByEmail, getUserByToken} from "~~/server/mfc/users/queries";
import {hash} from "node:crypto"

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
        user: null,
        token: null
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
}) {
    if (user.token) return reValidateToken(user.token)

    const fail = {
        user: null,
        token: null
    }
    if (!(user.email && user.password)) return fail

    const _user = await getUserByEmail(user.email)
    if(!_user) return fail

    if (!verifyPassword(user.password, _user.password)) return fail

    return createToken({userUlid: _user.ulid})
}