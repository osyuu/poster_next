import "dotenv/config";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { reset, seed } from "drizzle-seed";
import * as schema from "./schema";
import { sql } from "drizzle-orm";

async function main() {
  console.log("Starting seeding...");

  const client = postgres(process.env.DATABASE_URL!);
  const db = drizzle(client);

  // Reset the database
  await reset(db, schema);

  await seed(db, schema).refine((f) => ({
    user: {
      count: 3,
      columns: {
        username: f.uuid({ arraySize: 2 }),
        email: f.email(),
        display: f.fullName(),
        avatar: f.valuesFromArray({
          values: [
            "https://ui-avatars.com/api/?name=John+Doe&size=40",
            "https://ui-avatars.com/api/?name=Jane+Doe&size=40",
            "https://ui-avatars.com/api/?name=Jim+Beam&size=40",
          ],
        }),
      },
      with: {
        post: 3,
      },
    },
    post: {
      columns: {
        content: f.loremIpsum(),
      },
    },
  }));

  console.log("Seeding completed");

  await db.execute(
    sql`SELECT setval('posts_id_seq', (SELECT COALESCE(MAX(id), 0) FROM posts))`
  );
  await db.execute(
    sql`SELECT setval('users_id_seq', (SELECT COALESCE(MAX(id), 0) FROM users))`
  );

  await client.end();
  process.exit(0);
}

main();
