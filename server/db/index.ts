import { credentials } from "~~/drizzle.config";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

const connection = postgres({...credentials, ssl: 'prefer'});

export default drizzle(connection);