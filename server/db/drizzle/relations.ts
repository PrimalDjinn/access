import { relations } from "drizzle-orm/relations";
import { user, token } from "./schema";

export const tokensRelations = relations(token, ({one}) => ({
	user: one(user, {
		fields: [token.userUlid],
		references: [user.ulid]
	}),
}));

export const usersRelations = relations(user, ({many}) => ({
	tokens: many(token),
}));