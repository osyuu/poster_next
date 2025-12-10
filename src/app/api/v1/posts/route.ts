import { NextResponse } from "next/server";
import { type GetPostsResponse, type ApiError } from "@/types";
import { postRepository } from "@/lib/repositories/post_repository";

export async function GET(): Promise<
  NextResponse<GetPostsResponse | ApiError>
> {
  const posts = await postRepository.findAll();

  return NextResponse.json(
    {
      data: posts,
    } satisfies GetPostsResponse,
    { status: 200 }
  );
}
