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

export enum ErrorCode {
  MISSING_FIELDS = "MISSING_FIELDS",
  USER_NOT_FOUND = "USER_NOT_FOUND",
  POST_NOT_FOUND = "POST_NOT_FOUND",
  SERVER_ERROR = "SERVER_ERROR",
}

export interface ErrorWithCode extends Error {
  code: ErrorCode;
}

export function createError(code: ErrorCode, message: string): ErrorWithCode {
  const error = new Error(message) as ErrorWithCode;
  error.code = code;
  return error;
}

export function getErrorStatus(code: ErrorCode): number {
  const statusMap: Record<ErrorCode, number> = {
    [ErrorCode.MISSING_FIELDS]: 400,
    [ErrorCode.USER_NOT_FOUND]: 404,
    [ErrorCode.POST_NOT_FOUND]: 404,
    [ErrorCode.SERVER_ERROR]: 500,
  };
  return statusMap[code] ?? 500;
}

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
