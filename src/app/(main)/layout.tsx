import styles from "./layout.module.css";
import Header from "@/components/Header/Header";
import SidebarColumn from "@/components/SidebarColumn";

export default function MainLayout({
  children,
  modal,
}: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) {
  return (
    <div className={styles["container"]}>
      <header className={styles["header-container"]}>
        <Header />
      </header>
      <main className={styles["main-container"]}>
        <div className={styles["main"]}>
          <div className={styles["content-container"]}>{children}</div>
          <div className={styles["sidebar-container"]}>
            <SidebarColumn />
          </div>
        </div>
      </main>
      {modal}
    </div>
  );
}
