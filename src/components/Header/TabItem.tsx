"use client";

import Link from "next/link";
import styles from "./TabItem.module.css";

interface TabItemProps {
  href: string;
  label: string;
}

export default function TabItem({ href, label }: TabItemProps) {
  return (
    <Link href={href} className={styles["tab-item-wrapper"]}>
      <div className={styles["tab-item-content"]}>
        <div className={styles["tab-item-icon"]}>IC</div>
        <div className={styles["tab-item-label"]}>{label}</div>
      </div>
    </Link>
  );
}
