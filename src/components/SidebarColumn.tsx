import Footer from "./Footer";
import styles from "./SidebarColumn.module.css";
export default function SiderbarColumn() {
  return (
    <aside className={styles["sidebar-content"]}>
      <div className={styles["sidebar-relative"]}>
        <div className={styles["sidebar-fixed"]}>
          <h2>Some Fixed Content</h2>
        </div>
      </div>

      <h2>Sidebar</h2>
      <h2>Sidebar</h2>
      <h2>Sidebar</h2>
      <Footer />
    </aside>
  );
}
