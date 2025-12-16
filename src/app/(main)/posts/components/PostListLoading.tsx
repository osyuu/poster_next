import PostItemLoading from "./PostItemLoading";
import styles from "./PostList.module.css";

export function PostListLoading() {
  const items = Array.from({ length: 5 }, (_, i) => i);
  return (
    <div className={styles["post-list-container"]}>
      {items.map((i) => (
        <div key={i} className={styles["post-item-container"]}>
          <PostItemLoading />
        </div>
      ))}
    </div>
  );
}
