import PostItem from "./PostItem";
import styles from "./PostList.module.css";
import { connection } from "next/server";
import { postRepository } from "@/lib/repositories/post_repository";

export default async function PostList() {
  await connection();

  const posts = postRepository.findAll();

  return (
    <div className={styles["post-list-container"]}>
      {posts.map((post) => (
        <div key={post.id} className={styles["post-item-container"]}>
          <PostItem post={post} />
        </div>
      ))}
    </div>
  );
}
