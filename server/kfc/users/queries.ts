import db from "~~/server/db";
import {token, user} from "~~/server/db/drizzle/schema";
import {ulid} from "ulid";
import {eq} from "drizzle-orm";
import {hashPassword} from "../auth/functions";

export async function createUser(data: {email: string, password: string}){
    if(!data.email || !data.password) throw new Error("Invalid user creation data")
    const _ulid = ulid()
    await db.insert(user).values({
        email: data.email.toLowerCase(),
        password: hashPassword(data.password),
        ulid: _ulid
    })
    return getUserByUlid(_ulid)
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