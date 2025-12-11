import { user } from "@/lib/db/schema";

export type User = typeof user.$inferSelect;
