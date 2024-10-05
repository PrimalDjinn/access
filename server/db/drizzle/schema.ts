import { pgTable, varchar, text, timestamp, foreignKey } from "drizzle-orm/pg-core"
import { sql } from "drizzle-orm"

export const user = pgTable("users", {
	ulid: varchar("ulid", { length: 26 }).primaryKey().notNull(),
	email: varchar("email", { length: 255 }).notNull(),
	password: varchar("password", { length: 255 }).notNull(),
	picture: text("picture"),
	createdAt: timestamp("created_at", { mode: 'string' }).default(sql`CURRENT_TIMESTAMP`).notNull(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).default(sql`CURRENT_TIMESTAMP`).notNull(),
});

export const token = pgTable("tokens", {
	ulid: varchar("ulid", { length: 26 }).primaryKey().notNull(),
	userUlid: varchar("user_ulid", { length: 26 }).notNull(),
	value: text("value").notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }).default(sql`CURRENT_TIMESTAMP`).notNull(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).default(sql`CURRENT_TIMESTAMP`).notNull(),
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