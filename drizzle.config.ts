import { defineConfig } from 'drizzle-kit';

const url = process.env.DATABASE_URL;
if (!url) throw new Error('DATABASE_URL env variable is required');

const { username, password, host, port, pathname } = new URL(url);
const credentials = {
    user: username,
    password,
    host,
    port: +port,
    database: pathname.slice(1)
};

export { credentials };
export default defineConfig({
    schema: "./db/drizzle/schema.ts",
    dialect: "postgresql",
    dbCredentials: credentials,
    verbose: true,
    strict: true,
    out: './server/db/drizzle',
})