import {token} from "~~/server/db/drizzle/schema";
import {eq} from "drizzle-orm";
import db from "~~/server/db";
import {ulid} from "ulid";
import {v4} from "uuid";
import {getUserByEmail} from "~~/server/kfc/users/queries";
import type {Drizzle} from "~~/server/db/types";

export async function revokeToken(_token: string) {
    db.delete(token).where(eq(token.value, _token))
}

export async function revokeTokens(userUlid: string) {
    db.delete(token).where(eq(token.userUlid, userUlid))
}

type CreateTokenReturn<T extends CreateTokenData> = T extends CreateTokenDataB ? {
    user: Drizzle.User.select,
    token: string
} : { user: string, token: string }
type CreateTokenDataA = { userUlid: string }
type CreateTokenDataB = { email: string }
type CreateTokenData = CreateTokenDataA | CreateTokenDataB
function isCreateTokenDataA(data: CreateTokenData): data is CreateTokenDataA {
    return !!(data as CreateTokenDataA)?.userUlid
}
export async function createToken<T extends CreateTokenData>(data: T) {
    let user: Drizzle.User.select | string | undefined
    if (isCreateTokenDataA(data)) {
        user = data.userUlid
    } else if (data?.email) {
        user = await getUserByEmail(data.email)
    } else {
        throw new Error("Missing user or email")
    }
    if (!user) throw new Error("User not found")

    const _token = v4()
    db.insert(token).values({
        ulid: ulid(),
        userUlid: typeof user === "string" ? user : user.ulid,
        value: _token
    })

    return {user: user, token: _token} as CreateTokenReturn<T>
}
