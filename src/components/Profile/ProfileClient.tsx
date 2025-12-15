"use client";
import Avatar from "../Avatar";
import styles from "./Profile.module.css";
import { MenuItem } from "../DropdownMenu";
import { signOut } from "next-auth/react";
import { useDropdown } from "@/context/DropdownContext";
import { useRef } from "react";

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
      onClick: () => signOut({ callbackUrl: "/login" }),
    },
  ];

  const triggerRef = useRef<HTMLButtonElement>(null);
  const { openDropdown } = useDropdown();

  const handleClick = () => {
    openDropdown({
      items: menuItems,
      triggerRef,
      align: "center",
      position: "top", // menu 出現在上方
    });
  };

  return (
    <div className={styles["header-profile-wrapper"]}>
      <button
        className={styles["header-profile"]}
        ref={triggerRef}
        onClick={handleClick}
      >
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
    </div>
  );
}
