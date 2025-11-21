"use client";
import styles from "./PostForm.module.css";
import Avatar from "@/components/Avatar";
import { useData } from "@/context/data_context";
import { CreatePostRequest, CreatePostResponse, User } from "@/types";
import { useMemo, useState } from "react";

interface PostFormProps {
  profile: User | null;
}

export default function PostForm({ profile }: PostFormProps) {
  const { setPosts } = useData();
  const [content, setContent] = useState("");

  const isDisabled = useMemo(() => {
    return !content.trim() || content.length > 280;
  }, [content]);

  if (!profile) {
    return null;
  }

  const handleSubmit = async () => {
    const res = await fetch("/api/v1/posts", {
      method: "POST",
      body: JSON.stringify({
        content: content,
        authorId: profile.id,
      } satisfies CreatePostRequest),
    });
    const { data: addedPost } = (await res.json()) as CreatePostResponse;
    setPosts((prevPosts) => [addedPost, ...prevPosts]);
    setContent("");
  };

  return (
    <div className={styles["post-form"]}>
      <div className={styles["avatar-container"]}>
        <Avatar
          src={profile.avatar}
          alt={profile.display}
          width={40}
          height={40}
        />
      </div>
      <div className={styles["main-container"]}>
        <div className={styles["content"]}>
          <input
            id="post-input"
            type="text"
            placeholder="What's happening?"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>
        <div className={styles["footer"]}>
          <button
            className={styles["post-button"]}
            disabled={isDisabled}
            onClick={handleSubmit}
          >
            Post
          </button>
        </div>
      </div>
    </div>
  );
}
