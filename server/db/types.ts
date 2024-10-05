import { users, tokens } from "./drizzle/schema";

export namespace Drizzle {
    export namespace User {
        export type insert = typeof users.$inferInsert
        export type select = typeof users.$inferSelect
    }

    export namespace Token {
        export type insert = typeof tokens.$inferInsert
        export type select = typeof tokens.$inferSelect
    }
}