import type { GetPostResponse, ApiError } from "@/types";
import Link from "next/link";
import styles from "./page.module.css";

interface PostDetailPageProps {
  params: Promise<{ id: string }>;
}

export default async function PostDetailPage({ params }: PostDetailPageProps) {
  const { id } = await params;
  console.log("id", id);
  const res = await fetch(`http://localhost:3000/api/v1/posts/${id}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    const error = (await res.json()) as ApiError;
    return (
      <div className={styles.container}>
        <div className={styles.error}>
          <h1>錯誤</h1>
          <p>{error.error.message}</p>
          <Link href="/posts">返回列表</Link>
        </div>
      </div>
    );
  }

  const { data: post } = (await res.json()) as GetPostResponse;

  return (
    <div className={styles.container}>
      <Link href="/posts" className={styles.backLink}>
        ← 返回列表
      </Link>

      <article className={styles.post}>
        <h1 className={styles.title}>{post.title}</h1>

        <div className={styles.meta}>
          <div className={styles.author}>
            <span className={styles.label}>作者：</span>
            <span className={styles.authorName}>{post.author.display}</span>
            <span className={styles.username}>(@{post.author.username})</span>
          </div>

          {post.createdAt && (
            <div className={styles.date}>
              <span className={styles.label}>發布時間：</span>
              <time dateTime={post.createdAt.toString()}>
                {new Date(post.createdAt).toLocaleString("zh-TW")}
              </time>
            </div>
          )}

          {post.updatedAt && post.updatedAt !== post.createdAt && (
            <div className={styles.date}>
              <span className={styles.label}>更新時間：</span>
              <time dateTime={post.updatedAt.toString()}>
                {new Date(post.updatedAt).toLocaleString("zh-TW")}
              </time>
            </div>
          )}
        </div>
      </article>
    </div>
  );
}
