import db from "~~/server/db";
import {token, user} from "~~/server/db/drizzle/schema";
import {ulid} from "ulid";
import {eq} from "drizzle-orm";

export async function createUser(data: {email: string, password: string}){
    const users = await db.insert(user).values({
        email: data.email.toLowerCase(),
        password: data.password,
        ulid: ulid()
    })

    return users.at(0)
}

export async function getUserByEmail(email: string){
    const results = await db.select().from(user).where(eq(user.email, email.toLowerCase()))
    return results.at(0)
}

export async function getUserByUlid(ulid: string){
    const results = await db.select().from(user).where(eq(user.ulid, ulid))
    return results.at(0)
}

export async function getUserByToken(_token: string){
    const result = await db.select().from(token).where(eq(token.value, _token)).innerJoin(user, eq(user.ulid, token.userUlid))
    const data = result.at(0)
    return data?.users
}