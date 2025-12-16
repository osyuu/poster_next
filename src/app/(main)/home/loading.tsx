import { PostFormLoading } from "../posts/components/PostFormLoading";
import { PostListLoading } from "../posts/components/PostListLoading";

export default function Loading() {
  return (
    <div>
      <PostFormLoading />
      <PostListLoading />
    </div>
  );
}
