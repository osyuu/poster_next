import Link from "next/link";
import Image from "next/image";
import styles from "./Header.module.css";

export default function Header() {
  return (
    <header className={styles["header-container"]}>
      <div className={styles["header-position"]}>
        <div className={styles["header"]}>
          <div className={styles["header-content"]}>
            <Link href="/">
              <Image
                className={styles["logo"]}
                src="/next.svg"
                alt="Next.js logo"
                width={100}
                height={20}
                priority
              />
            </Link>
            <div className={styles["header-tabs"]}>
              <Link href="/" className={styles["header-tab"]}>
                <Image
                  className={styles["logo"]}
                  src="/next.svg"
                  alt="Next.js logo"
                  width={100}
                  height={20}
                  priority
                />
              </Link>
            </div>
          </div>
          <div className={styles["header-profile"]}>
            <p>Profile</p>
          </div>
        </div>
      </div>
    </header>
  );
}
