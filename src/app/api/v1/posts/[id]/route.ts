import { NextResponse } from "next/server";
import {
  type GetPostResponse,
  type ApiError,
  getErrorStatus,
  ErrorCode,
} from "@/types";
import { postRepository } from "@/lib/repositories/post_repository";

/**
 GET /api/v1/posts/123
 */
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
): Promise<NextResponse<GetPostResponse | ApiError>> {
  const { id } = await params;
  const postId = parseInt(id);
  const post = await postRepository.findById(postId);
  if (!post) {
    return NextResponse.json(
      {
        error: {
          message: "貼文不存在",
          code: ErrorCode.POST_NOT_FOUND,
        },
      } satisfies ApiError,
      { status: getErrorStatus(ErrorCode.POST_NOT_FOUND) }
    );
  }

  return NextResponse.json(
    {
      data: post,
    } satisfies GetPostResponse,
    { status: 200 }
  );
}
