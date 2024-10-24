import { defineConfig } from 'drizzle-kit';
import type { Config } from '@libsql/client';

const credentials = {
    url: process.env.DATABASE_URL || "file:./db.sqlite",
} satisfies Config

export { credentials }

export default defineConfig({
    schema: "./server/db/drizzle/schema.ts",
    dialect: "sqlite",
    dbCredentials: credentials,
    verbose: true,
    strict: false,
    out: './server/db/drizzle',
})