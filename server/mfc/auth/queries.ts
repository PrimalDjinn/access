import { tokens, users } from "~~/server/db/drizzle/schema";
import { eq } from "drizzle-orm";
import db from "~~/server/db";
import { ulid } from "ulid";

export async function revokeToken(token: string){
    return db.delete(tokens).where(eq(tokens.value, token))
}

export async function revokeTokens(userUlid: string){
    return db.delete(tokens).where(eq(tokens.userUlid, userUlid))
}

export async function createUser(user: {email: string, password: string}){
    return db.insert(users).values({
        email: user.email.toLowerCase(),
        password: user.password,
        ulid: ulid()
    })
}

export async function getUserByEmail(email: string){
    const results = await db.select().from(users).where(eq(users.email, email.toLowerCase()))
    return results.at(0) || null
}

export async function getUserByUlid(ulid: string){
    const results = await db.select().from(users).where(eq(users.ulid, ulid))
    return results.at(0) || null
}

export async function createToken(data: {userUlid?: string, email?: string}){
    if (!data.userUlid && !data.email){
        throw new Error("Missing userUlid or email")
    }

    
}