import type { Post, PostWithAuthorSummary } from "./post";

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
