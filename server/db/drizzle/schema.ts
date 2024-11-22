import { sqliteTable, text, foreignKey } from "drizzle-orm/sqlite-core"
import { sql } from "drizzle-orm"

export const user = sqliteTable("users", {
	ulid: text("ulid", { length: 26 }).primaryKey().notNull(),
	email: text("email", { length: 255 }).notNull().unique(),
	password: text("password", { length: 255 }).notNull(),
	picture: text("picture"),
	createdAt: text('timestamp').notNull().default(sql`(current_timestamp)`)
});

export const token = sqliteTable("tokens", {
	ulid: text("ulid", { length: 26 }).primaryKey().notNull(),
	userUlid: text("user_ulid", { length: 26 }).notNull(),
	value: text("value").notNull(),
	createdAt: text('timestamp').notNull().default(sql`(current_timestamp)`),
},
	(table) => {
		return {
			tokensUserUlidFkey: foreignKey({
				columns: [table.userUlid],
				foreignColumns: [user.ulid],
				name: "tokens_user_ulid_fkey"
			}),
		}
	});