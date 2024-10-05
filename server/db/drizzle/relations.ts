import { relations } from "drizzle-orm/relations";
import { users, tokens } from "./schema";

export const tokensRelations = relations(tokens, ({one}) => ({
	user: one(users, {
		fields: [tokens.userUlid],
		references: [users.ulid]
	}),
}));

export const usersRelations = relations(users, ({many}) => ({
	tokens: many(tokens),
}));