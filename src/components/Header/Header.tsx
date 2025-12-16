import Link from "next/link";
import Image from "next/image";
import styles from "./Header.module.css";
import Profile from "../Profile";
import TabItem from "./TabItem";
import { Bell, Home } from "lucide-react";

export default async function Header() {
  const tabs = [
    { href: "/", label: "Home", icon: <Home /> },
    { href: "/notifications", label: "Notifications", icon: <Bell /> },
  ];
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
              {tabs.map((tab) => (
                <div className={styles["header-tab"]} key={tab.href}>
                  <TabItem href={tab.href} label={tab.label} icon={tab.icon} />
                </div>
              ))}
            </div>
            <div className={styles["header-post"]}>
              <Link
                href="/compose/post"
                className={styles["header-post-button"]}
              >
                <div className={styles["header-post-button-content"]}>
                  <span>POST</span>
                </div>
              </Link>
            </div>
          </div>
          <Profile />
        </div>
      </div>
    </header>
  );
}
