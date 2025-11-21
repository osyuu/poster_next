import { NextResponse } from "next/server";
import type {
  Post,
  PostWithAuthor,
  CreatePostRequest,
  GetPostsResponse,
  CreatePostResponse,
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
    createdAt: new Date(Date.UTC(2012, 1, 2, 4, 0, 0)).toISOString(),
  },
  {
    id: 3,
    content: "Post 3",
    authorId: 3,
    createdAt: new Date(Date.UTC(2012, 1, 2, 5, 0, 0)).toISOString(),
  },
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

export async function GET(): Promise<
  NextResponse<GetPostsResponse | ApiError>
> {
  // 手動 join：將 posts 與 users 關聯
  const postsWithAuthor = posts.map(getPostWithAuthor);

  const sortedPostsWithAuthor = sortPostsWithAuthor(postsWithAuthor);

  return NextResponse.json(
    {
      data: sortedPostsWithAuthor,
    } satisfies GetPostsResponse,
    { status: 200 }
  );
}

export async function POST(
  request: Request
): Promise<NextResponse<CreatePostResponse | ApiError>> {
  try {
    const body = (await request.json()) as CreatePostRequest;
    const { content, authorId } = body;

    if (!content || !authorId) {
      return NextResponse.json(
        {
          error: {
            message: "缺少必要字段：title 和 authorId",
            code: "MISSING_FIELDS",
          },
        } satisfies ApiError,
        { status: 400 }
      );
    }

    // 驗證 authorId 是否存在
    const author = users.find((u) => u.id === authorId);
    if (!author) {
      return NextResponse.json(
        {
          error: {
            message: `用戶 ID ${authorId} 不存在`,
            code: "USER_NOT_FOUND",
          },
        } satisfies ApiError,
        { status: 404 }
      );
    }

    const newPost: Post = {
      id: posts.length + 1,
      content,
      authorId,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    posts.push(newPost);

    // 返回帶有關聯資料的 Post
    const postWithAuthor = getPostWithAuthor(newPost);

    return NextResponse.json(
      {
        data: postWithAuthor,
      } satisfies CreatePostResponse,
      { status: 201 }
    );
  } catch {
    return NextResponse.json(
      {
        error: {
          message: "服务器错误",
          code: "SERVER_ERROR",
        },
      } satisfies ApiError,
      { status: 500 }
    );
  }
}
