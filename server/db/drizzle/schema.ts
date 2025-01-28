import { sqliteTable, text, foreignKey, integer } from "drizzle-orm/sqlite-core";
import { sql } from "drizzle-orm";

export const user = sqliteTable("users", {
	ulid: text("ulid", { length: 26 }).primaryKey().notNull(),
	email: text("email", { length: 255 }).notNull().unique(),
	password: text("password", { length: 255 }).notNull(),
	picture: text("picture"),
	createdAt: text("timestamp")
		.notNull()
		.default(sql`(current_timestamp)`),
});

export const token = sqliteTable(
	"tokens",
	{
		ulid: text("ulid", { length: 26 }).primaryKey().notNull(),
		userUlid: text("user_ulid", { length: 26 }).notNull().references(() => user.ulid),
		value: text("value").notNull(),
		createdAt: text("timestamp")
			.notNull()
			.default(sql`(current_timestamp)`),
	},
	(table) => {
		return {
			tokensUserUlidFkey: foreignKey({
				columns: [table.userUlid],
				foreignColumns: [user.ulid],
				name: "tokens_user_ulid_fkey",
			}),
		};
	}
);

export const reports = sqliteTable("reports", {
	reportId: text("report_id").primaryKey().notNull(),
	userId: text("user_id").notNull().references(() => user.ulid),
	url: text("url").notNull(),
	accessibilityScore: integer("accessibility_score"),
	createdAt: text("date").$defaultFn(() => new Date().toISOString()),
});

export const jobs = sqliteTable("jobs", {
	jobId: integer("job_id"),
	userId: text("user_id").notNull().references(() => user.ulid),
	jobStatus: text("job_status"),
	jobType: text("job_type"),
	startedAt: text("started_at").notNull(),
	completedAt: text("completed_at")
})
