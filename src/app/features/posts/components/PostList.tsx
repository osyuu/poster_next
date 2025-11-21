"use client";
import { PostWithAuthor } from "@/types";
import PostItem from "./PostItem";
import styles from "./PostList.module.css";
import { useData } from "@/context/data_context";
import { useEffect } from "react";

interface PostListProps {
  initialPosts: PostWithAuthor[];
}

export default function PostList({ initialPosts }: PostListProps) {
  const { posts, setPosts } = useData();

  useEffect(() => {
    setPosts(initialPosts);
  }, [initialPosts, setPosts]);

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
