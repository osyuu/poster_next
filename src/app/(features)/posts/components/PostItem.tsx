"use client";
import { PostWithAuthor } from "@/types";
import styles from "./PostItem.module.css";
import Link from "next/link";
import Avatar from "@/components/Avatar";
import { deletePost } from "../actions";
import DropdownMenu, { MenuItem } from "@/components/DropdownMenu";
import { useState } from "react";

interface PostItemProps {
  post: PostWithAuthor;
}

export default function PostItem({ post }: PostItemProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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

  return (
    <div
      className={`${styles["post-item-wrapper"]} ${
        isMenuOpen ? styles["menu-open"] : ""
      }`}
    >
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
            <DropdownMenu
              trigger={<div className={styles["header-setting"]}>⋯</div>}
              items={menuItems}
              align="left"
              onOpenChange={setIsMenuOpen}
            />
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
