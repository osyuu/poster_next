import type { Post, PostWithAuthor } from "./post";

// API 回應的標準格式
export type ApiResponse<T> = {
  data: T;
};

export type ApiError = {
  error: {
    message: string;
    code: string;
  };
};

// Posts API 相關類型
// 注意：API 回應通常包含關聯資料，所以使用 PostWithAuthor
export type GetPostsResponse = ApiResponse<PostWithAuthor[]>;
export type GetPostResponse = ApiResponse<PostWithAuthor>;
// 創建請求只需要 authorId，不需要完整的 author 物件
export type CreatePostRequest = Omit<Post, "id" | "createdAt" | "updatedAt">;
export type CreatePostResponse = ApiResponse<PostWithAuthor>;
export type DeletePostResponse = {
  message: string;
};
