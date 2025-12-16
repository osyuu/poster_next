"use client";

import Link from "next/link";
import styles from "./TabItem.module.css";

interface TabItemProps {
  href: string;
  icon: React.ReactNode;
  label: string;
}

export default function TabItem({ href, icon, label }: TabItemProps) {
  return (
    <Link href={href} className={styles["tab-item-wrapper"]}>
      <div className={styles["tab-item-content"]}>
        <div className={styles["tab-item-icon"]}>{icon}</div>
        <div className={styles["tab-item-label"]}>{label}</div>
      </div>
    </Link>
  );
}
