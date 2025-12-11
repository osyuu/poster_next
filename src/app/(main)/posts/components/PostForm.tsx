"use client";
import styles from "./PostForm.module.css";
import Avatar from "@/components/Avatar";
import { User } from "@/types";
import { useMemo, useState } from "react";
import { createPost } from "../actions";

interface PostFormProps {
  profile: User | null;
}

export default function PostForm({ profile }: PostFormProps) {
  const [content, setContent] = useState("");

  const isDisabled = useMemo(() => {
    return !content.trim() || content.length > 280;
  }, [content]);

  if (!profile) {
    return null;
  }

  const handleSubmit = async () => {
    const result = await createPost(content, profile.id);
    if (result.success) {
      console.log("result", result.data);
      setContent("");
    } else {
      console.error(result.error);
    }
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
