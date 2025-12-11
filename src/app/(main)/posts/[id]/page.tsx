import Link from "next/link";
import styles from "./page.module.css";
import { postRepository } from "@/lib/repositories/post_repository";
import { notFound } from "next/navigation";

interface PostDetailPageProps {
  params: Promise<{ id: string }>;
}

export const dynamic = "force-dynamic";

export default async function PostDetailPage({ params }: PostDetailPageProps) {
  const { id } = await params;
  const postId = parseInt(id);

  const post = await postRepository.findById(postId);

  if (!post) {
    notFound();
  }

  return (
    <div className={styles.container}>
      <Link href="/" className={styles.backLink}>
        ← 返回列表
      </Link>

      <article className={styles.post}>
        <h1 className={styles.title}>{post.content}</h1>

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
