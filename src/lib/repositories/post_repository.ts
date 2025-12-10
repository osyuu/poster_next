import {
  PostWithAuthor,
  Post,
  CreatePostRequest,
  createError,
  ErrorCode,
} from "@/types";
import { moduleId, posts, users } from "../data";

// 輔助函數：將 Post 與 User 關聯
function getPostWithAuthor(post: Post): PostWithAuthor {
  const author = users.find((u) => u.id === post.authorId);
  if (!author) {
    throw new Error(`User with id ${post.authorId} not found`);
  }
  return {
    ...post,
    author,
  };
}

// 輔助函數：將 PostWithAuthor 按 createdAt 排序
function sortPostsWithAuthor(
  postsWithAuthor: PostWithAuthor[]
): PostWithAuthor[] {
  return postsWithAuthor.sort((a, b) => {
    return (
      new Date(b.createdAt ?? "").getTime() -
      new Date(a.createdAt ?? "").getTime()
    );
  });
}

class PostRepository {
  /**
   * 取得所有 posts（帶 author 資訊，已排序）
   */
  findAll(): PostWithAuthor[] {
    const postsWithAuthor = posts.map(getPostWithAuthor);
    return sortPostsWithAuthor(postsWithAuthor);
  }
  /**
   * 根據 id 取得單一 post
   * @returns PostWithAuthor 或 null（如果不存在）
   */
  findById(id: number): PostWithAuthor | null {
    const post = posts.find((p) => p.id === id);
    if (!post) {
      return null;
    }
    return getPostWithAuthor(post);
  }
  /**
   * 創建新 post
   * @returns 創建成功的 PostWithAuthor
   * @throws Error 如果 authorId 不存在
   */
  create(post: CreatePostRequest): PostWithAuthor {
    console.log("create - moduleId:", moduleId);
    const author = users.find((u) => u.id === post.authorId);
    if (!author) {
      throw createError(
        ErrorCode.USER_NOT_FOUND,
        `User with id ${post.authorId} not found`
      );
    }

    // 生成新 id（簡單實作：取最大 id + 1）
    const newId =
      posts.length > 0 ? Math.max(...posts.map((p) => p.id)) + 1 : 1;

    const newPost: Post = {
      id: newId,
      content: post.content,
      authorId: post.authorId,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    posts.push(newPost);
    console.log("create - posts:", posts.length);
    return getPostWithAuthor(newPost);
  }
  /**
   * 刪除 post
   * @returns true 如果刪除成功，false 如果 post 不存在
   */
  delete(id: number) {
    const index = posts.findIndex((p) => p.id === id);
    if (index === -1) {
      throw createError(
        ErrorCode.POST_NOT_FOUND,
        `Post with id ${id} not found`
      );
    }
    posts.splice(index, 1);
  }
}

export const postRepository = new PostRepository();
