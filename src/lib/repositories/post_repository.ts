import {
  Post,
  CreatePostRequest,
  createError,
  ErrorCode,
  PostWithAuthorSummary,
} from "@/types";
import { db } from "@/lib/db";
import { post } from "@/lib/db/schema";
import { desc, eq } from "drizzle-orm";

class PostRepository {
  /**
   * 取得所有 posts（帶 author 資訊，已排序）
   */
  async findAll(): Promise<PostWithAuthorSummary[]> {
    return db.query.post.findMany({
      with: {
        author: {
          columns: { id: true, username: true, display: true, avatar: true },
        },
      },
      orderBy: [desc(post.createdAt)],
    });
  }
  /**
   * 根據 id 取得單一 post
   * @returns PostWithAuthor 或 null（如果不存在）
   */
  async findById(id: number): Promise<PostWithAuthorSummary | undefined> {
    return db.query.post.findFirst({
      where: eq(post.id, id),
      with: {
        author: {
          columns: { id: true, username: true, display: true, avatar: true },
        },
      },
    });
  }
  /**
   * 創建新 post
   * @returns 創建成功的 PostWithAuthor
   * @throws Error 如果 authorId 不存在
   */
  async create(request: CreatePostRequest): Promise<Post> {
    const [newPost] = await db.insert(post).values(request).returning();
    return newPost;
  }
  /**
   * 刪除 post
   * @returns true 如果刪除成功，false 如果 post 不存在
   */
  async delete(id: number) {
    const result = await db.delete(post).where(eq(post.id, id)).returning();
    if (result.length === 0) {
      throw createError(
        ErrorCode.POST_NOT_FOUND,
        `Post with id ${id} not found`
      );
    }
  }
}

export const postRepository = new PostRepository();
