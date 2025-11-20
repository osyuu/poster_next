import type { GetPostsResponse } from "@/types";
import Link from "next/link";
import styles from "./page.module.css";

export default async function PostsPage() {
  const res = await fetch("http://localhost:3000/api/v1/posts", {
    cache: "no-store",
  });

  const { data: posts } = (await res.json()) as GetPostsResponse;

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Posts列表</h1>
      <div className={styles.postList}>
        {posts.map((post) => (
          <Link
            key={post.id}
            href={`/posts/${post.id}`}
            className={styles.postCard}
          >
            <h2 className={styles.postTitle}>{post.title}</h2>
            <p className={styles.postAuthor}>
              作者：{post.author.display} (@{post.author.username})
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
