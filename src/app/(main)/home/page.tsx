import styles from "./page.module.css";
import PostList from "../posts/components/PostList";
import PostForm from "../posts/components/PostForm";
import { getCurrentUser } from "@/lib/auth";
import { User } from "@/types";
import { Suspense } from "react";
import { PostFormLoading } from "../posts/components/PostFormLoading";
import { PostListLoading } from "../posts/components/PostListLoading";

export default async function Home() {
  const profile = (await getCurrentUser()) satisfies User | null | undefined;

  return (
    <div className={styles["container"]}>
      <Suspense fallback={<PostFormLoading />}>
        {profile && <PostForm profile={profile} />}
      </Suspense>

      <Suspense fallback={<PostListLoading />}>
        <PostList />
      </Suspense>
    </div>
  );
}
