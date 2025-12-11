"use server";

import { postRepository } from "@/lib/repositories/post_repository";
import type { Post } from "@/types";
import { ErrorCode } from "@/types";
import { revalidatePath } from "next/cache";

type ActionResult<T> =
  | { success: true; data: T }
  | { success: false; error: { code: string; message: string } };

export async function createPost(
  content: string,
  authorId: number
): Promise<ActionResult<Post>> {
  if (!content || !authorId) {
    return {
      success: false,
      error: {
        code: ErrorCode.MISSING_FIELDS,
        message: "缺少必要字段",
      },
    };
  }

  try {
    const post = await postRepository.create({ content, authorId });
    revalidatePath("/");
    return { success: true, data: post };
  } catch (error) {
    if (error instanceof Error && "code" in error) {
      return {
        success: false,
        error: {
          code: (error as { code: string }).code,
          message: error.message,
        },
      };
    }
    throw error;
  }
}

export async function deletePost(id: number): Promise<ActionResult<void>> {
  try {
    await postRepository.delete(id);
    revalidatePath("/");
    return { success: true, data: undefined };
  } catch {
    return {
      success: false,
      error: { code: ErrorCode.POST_NOT_FOUND, message: "Post not found" },
    };
  }
}
