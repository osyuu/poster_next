import { db } from "@/lib/db";
import { user } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

class UserRepository {
  async findById(id: number) {
    return db.query.user.findFirst({
      where: eq(user.id, id),
    });
  }

  async findByEmail(email: string) {
    return db.query.user.findFirst({
      where: eq(user.email, email),
    });
  }

  async findByUsername(username: string) {
    return db.query.user.findFirst({
      where: eq(user.username, username),
    });
  }
}

export const userRepository = new UserRepository();
