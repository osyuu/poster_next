import { post } from "@/lib/db/schema";
import type { User } from "./user";
import { ApiResponse } from "./api";

export type Post = typeof post.$inferSelect;

export type PostWithAuthorSummary = Post & {
  author: Pick<User, "id" | "username" | "display" | "avatar">;
};

// Posts API 相關類型
// 注意：API 回應通常包含關聯資料，所以使用 PostWithAuthor
export type GetPostsResponse = ApiResponse<PostWithAuthorSummary[]>;
export type GetPostResponse = ApiResponse<PostWithAuthorSummary>;
// 創建請求只需要 authorId，不需要完整的 author 物件
export type CreatePostRequest = Pick<Post, "content" | "authorId">;
export type CreatePostResponse = ApiResponse<PostWithAuthorSummary>;
export type DeletePostResponse = {
  message: string;
};
