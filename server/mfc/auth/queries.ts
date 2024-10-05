import {token} from "~~/server/db/drizzle/schema";
import {eq} from "drizzle-orm";
import db from "~~/server/db";
import {ulid} from "ulid";
import {v4} from "uuid";
import {getUserByEmail, getUserByUlid} from "~~/server/mfc/users/queries";

export async function revokeToken(_token: string)
{
    db.delete(token).where(eq(token.value, _token))
}

export async function revokeTokens(userUlid: string) {
    db.delete(token).where(eq(token.userUlid, userUlid))
}

export async function createToken(data: { userUlid?: string, email?: string }) {
    let user = null
    if (data.userUlid) {
        user = await getUserByUlid(data.userUlid)
    } else if (data.email) {
        user = await getUserByEmail(data.email)
    } else {
        throw new Error("Missing userUlid or email")
    }
    if (!user) throw new Error("User not found")

    const _token = v4()
    db.insert(token).values({
        ulid: ulid(),
        userUlid: user.ulid,
        value: _token
    })
    return {user, token: _token}
}
