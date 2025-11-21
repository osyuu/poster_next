import { NextResponse } from "next/server";
import type {
  Post,
  PostWithAuthor,
  GetPostResponse,
  DeletePostResponse,
  ApiError,
} from "@/types";
import type { User } from "@/types";

const users: User[] = [
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

const posts: Post[] = [
  { id: 1, content: "Post 1", authorId: 1 },
  { id: 2, content: "Post 2", authorId: 2 },
  { id: 3, content: "Post 3", authorId: 3 },
];

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

/**
 GET /api/v1/posts/123
 */
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
): Promise<NextResponse<GetPostResponse | ApiError>> {
  const { id } = await params;
  const postId = parseInt(id);
  const post = posts.find((p) => p.id === postId);

  if (!post) {
    return NextResponse.json(
      {
        error: {
          message: "漫画不存在",
          code: "POST_NOT_FOUND",
        },
      } satisfies ApiError,
      { status: 404 }
    );
  }

  // 關聯 author 資料
  const postWithAuthor = getPostWithAuthor(post);

  return NextResponse.json(
    {
      data: postWithAuthor,
    } satisfies GetPostResponse,
    { status: 200 }
  );
}

/**
 DELETE /api/v1/posts/123
*/

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
): Promise<NextResponse<DeletePostResponse | ApiError>> {
  const { id } = await params;
  const postId = parseInt(id);
  const index = posts.findIndex((p) => p.id === postId);

  if (index === -1) {
    return NextResponse.json(
      {
        error: {
          message: "漫画不存在",
          code: "POST_NOT_FOUND",
        },
      } satisfies ApiError,
      { status: 404 }
    );
  }

  posts.splice(index, 1);

  return NextResponse.json(
    {
      message: "删除成功",
    } satisfies DeletePostResponse,
    { status: 200 }
  );
}
