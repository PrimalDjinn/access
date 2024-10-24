import { credentials } from "~~/drizzle.config";
import { drizzle } from "drizzle-orm/libsql";
import { createClient } from "@libsql/client";
import * as schema from "./drizzle/schema";

const client = createClient(credentials);
export default drizzle(client, {
    schema: schema
});