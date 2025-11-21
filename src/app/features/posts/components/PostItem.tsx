import { PostWithAuthor } from "@/types";
import styles from "./PostItem.module.css";
import Link from "next/link";
import Avatar from "@/components/Avatar";

interface PostItemProps {
  post: PostWithAuthor;
}

export default function PostItem({ post }: PostItemProps) {
  return (
    <Link href={`/posts/${post.id}`} className={styles["post-item"]}>
      <div className={styles["avatar-container"]}>
        <Avatar src={post.author.avatar} alt={post.author.display} />
      </div>
      <div className={styles["main-container"]}>
        <div className={styles["header"]}>
          <div className={styles["header-title"]}>
            <span className={styles["author"]}>{post.author.display}</span>
            <span className={styles["time"]}>
              {new Date(post.createdAt ?? "").toLocaleString("zh-TW", {
                timeZone: "UTC",
                dateStyle: "short",
                timeStyle: "short",
                hour12: false,
              })}
            </span>
          </div>
          <div className={styles["header-setting"]}>setting</div>
        </div>
        <div className={styles["content"]}>
          <span>{`${post.content}\n${post.content}`}</span>
        </div>
        <div className={styles["footer"]}>Footer</div>
      </div>
    </Link>
  );
}
