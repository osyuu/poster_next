import Link from "next/link";
import styles from "./page.module.css";

export default function NotFound() {
  return (
    <div className={styles.container}>
      <div className={styles.error}>
        <h1>404</h1>
        <p>找不到這篇文章</p>
        <Link href="/">返回列表</Link>
      </div>
    </div>
  );
}
