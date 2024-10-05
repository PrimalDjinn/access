import { user, token } from "./drizzle/schema";

export namespace Drizzle {
    export namespace User {
        export type insert = typeof user.$inferInsert
        export type select = typeof user.$inferSelect
    }

    export namespace Token {
        export type insert = typeof token.$inferInsert
        export type select = typeof token.$inferSelect
    }
}