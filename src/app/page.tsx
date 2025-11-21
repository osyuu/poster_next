import styles from "./page.module.css";
import Link from "next/link";
import { GetPostsResponse } from "@/types";
import PostList from "./features/posts/components/PostList";
import PostForm from "./features/posts/components/PostForm";
import { getCurrentUser } from "@/lib/auth";

export default async function Home() {
  const profile = await getCurrentUser();
  const res = await fetch("http://localhost:3000/api/v1/posts", {
    cache: "no-store",
  });

  const { data: posts } = (await res.json()) as GetPostsResponse;

  return (
    <div className={styles["container"]}>
      <PostForm profile={profile} />
      <PostList initialPosts={posts} />
    </div>
  );
}
