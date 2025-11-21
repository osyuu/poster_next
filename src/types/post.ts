import type { User } from "./user";

export type Post = {
  id: number;
  content: string;
  authorId: number;
  createdAt?: string;
  updatedAt?: string;
};

export type PostWithAuthor = Post & {
  author: User;
};

export type PostWithAuthorInfo = Post & {
  author: Pick<User, "id" | "username" | "display">;
};
