import styles from "./page.module.css";
import PostList from "./(features)/posts/components/PostList";
import PostForm from "./(features)/posts/components/PostForm";
import { getCurrentUser } from "@/lib/auth";

export default async function Home() {
  const profile = await getCurrentUser();

  return (
    <div className={styles["container"]}>
      <PostForm profile={profile} />
      <PostList />
    </div>
  );
}
