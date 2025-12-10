import { Post, User } from "@/types";

declare global {
  var __posts: Post[] | undefined;
  var __users: User[] | undefined;
  var __moduleId: string | undefined;
}

export const moduleId =
  globalThis.__moduleId ?? Math.random().toString(36).substring(7);
if (!globalThis.__moduleId) {
  globalThis.__moduleId = moduleId;
}

const initialUsers: User[] = [
  {
    id: 1,
    username: "user1",
    email: "user1@example.com",
    display: "作者A",
    avatar: "https://ui-avatars.com/api/?name=John+Doe&size=40",
  },
  {
    id: 2,
    username: "user2",
    email: "user2@example.com",
    display: "作者B",
    avatar: "https://ui-avatars.com/api/?name=John+Doe&size=40",
  },
  {
    id: 3,
    username: "user3",
    email: "user3@example.com",
    display: "作者C",
    avatar: "https://ui-avatars.com/api/?name=John+Doe&size=40",
  },
];

const initialPosts: Post[] = [
  {
    id: 1,
    content: "Post 1",
    authorId: 1,
    createdAt: new Date(Date.UTC(2012, 1, 2, 3, 0, 0)).toISOString(),
  },
  {
    id: 2,
    content: "Post 2",
    authorId: 2,
    createdAt: new Date(Date.UTC(2012, 1, 2, 3, 0, 0)).toISOString(),
  },
  {
    id: 3,
    content: "Post 3",
    authorId: 3,
    createdAt: new Date(Date.UTC(2012, 1, 2, 3, 0, 0)).toISOString(),
  },
];

if (!globalThis.__posts) {
  globalThis.__posts = [...initialPosts];
}
if (!globalThis.__users) {
  globalThis.__users = [...initialUsers];
}

export const users: User[] = globalThis.__users;
export const posts: Post[] = globalThis.__posts;

console.log(
  "Data module loaded - posts length:",
  posts.length,
  "moduleId:",
  moduleId
);
