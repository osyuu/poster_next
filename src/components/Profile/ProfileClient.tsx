"use client";
import Avatar from "../Avatar";
import styles from "./Profile.module.css";
import DropdownMenu, { MenuItem } from "../DropdownMenu";
import { signOut } from "next-auth/react";

interface ProfileClientProps {
  avatar: string | null;
  display: string;
  username: string;
}

export default function ProfileClient({
  avatar,
  display,
  username,
}: ProfileClientProps) {
  const menuItems: MenuItem[] = [
    {
      label: "Logout",
      onClick: () => {
        signOut();
      },
    },
  ];

  const trigger = (
    <button className={styles["header-profile"]}>
      <div className={styles["header-profile-avatar"]}>
        <Avatar src={avatar || ""} alt={display} />
      </div>
      <div className={styles["header-profile-info"]}>
        <p className={styles["header-profile-info-name"]}>{display}</p>
        <p className={styles["header-profile-info-username"]}>{username}</p>
      </div>
      <div className={styles["header-profile-setting"]}>
        <svg
          viewBox="0 0 24 24"
          aria-hidden="true"
          className={styles["header-profile-setting-icon"]}
        >
          <g>
            <path d="M3 12c0-1.1.9-2 2-2s2 .9 2 2-.9 2-2 2-2-.9-2-2zm9 2c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm7 0c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2z"></path>
          </g>
        </svg>
      </div>
    </button>
  );

  return (
    <div className={styles["header-profile-wrapper"]}>
      <DropdownMenu
        trigger={trigger}
        items={menuItems}
        align="center"
        position="top"
      />
    </div>
  );
}
