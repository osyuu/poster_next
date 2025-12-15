"use client";
import { PostWithAuthorSummary } from "@/types";
import styles from "./PostItem.module.css";
import Link from "next/link";
import Avatar from "@/components/Avatar";
import { deletePost } from "../actions";
import { MenuItem } from "@/components/DropdownMenu";
import { useRef } from "react";
import { useDropdown } from "@/context/DropdownContext";

interface PostItemProps {
  post: PostWithAuthorSummary;
}

export default function PostItem({ post }: PostItemProps) {
  const { openDropdown } = useDropdown();
  const triggerRef = useRef<HTMLButtonElement>(null);
  const handleDelete = async () => {
    if (confirm("確定要刪除此貼文嗎？")) {
      await deletePost(post.id);
    }
  };

  const menuItems: MenuItem[] = [
    {
      label: "刪除",
      onClick: handleDelete,
      variant: "danger",
    },
  ];

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    openDropdown({
      items: menuItems,
      triggerRef,
      align: "left",
      position: "bottom",
    });
  };

  return (
    <div className={`${styles["post-item-wrapper"]}`}>
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
            <button
              className={styles["header-setting"]}
              onClick={handleClick}
              ref={triggerRef}
            >
              ⋯
            </button>
          </div>
          <div className={styles["content"]}>
            <span>{`${post.content}\n${post.content}`}</span>
          </div>
          <div className={styles["footer"]}>Footer</div>
        </div>
      </Link>
    </div>
  );
}
