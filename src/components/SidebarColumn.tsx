import Footer from "./Footer";
import styles from "./SidebarColumn.module.css";
export default function SiderbarColumn() {
  return (
    <aside className={styles["sidebar-container"]}>
      <div className={styles["sidebar-content"]}>
        <h2>Sidebar</h2>
        <h2>Sidebar</h2>
        <h2>Sidebar</h2>
        <Footer />
      </div>
    </aside>
  );
}
