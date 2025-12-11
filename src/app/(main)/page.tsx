import styles from "./page.module.css";
import PostList from "./posts/components/PostList";
import PostForm from "./posts/components/PostForm";
import { getCurrentUser } from "@/lib/auth";
import { User } from "@/types";

export default async function Home() {
  const profile = (await getCurrentUser()) satisfies User | null | undefined;

  return (
    <div className={styles["container"]}>
      {profile && <PostForm profile={profile} />}
      <PostList />
    </div>
  );
}
