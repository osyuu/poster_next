"use client";

import { ReactElement, ReactNode, useEffect, useRef, useState } from "react";
import styles from "./DropdownMenu.module.css";

export interface MenuItem {
  icon?: ReactElement;
  label: string;
  onClick: () => void;
  variant?: "default" | "danger";
}

interface DropdownMenuProps {
  trigger: ReactNode;
  items: MenuItem[];
  position?: "top" | "bottom";
  align?: "left" | "right" | "center";
  className?: string;
  onOpenChange?: (isOpen: boolean) => void;
}

export default function DropdownMenu({
  trigger,
  items,
  position = "bottom",
  align = "left",
  className,
  onOpenChange,
}: DropdownMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);

  // 通知父組件選單狀態變化
  useEffect(() => {
    onOpenChange?.(isOpen);
  }, [isOpen, onOpenChange]);

  // 處理點擊外部關閉選單
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        triggerRef.current &&
        !triggerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }
  }, [isOpen]);

  const handleTriggerClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsOpen(!isOpen);
  };

  const handleItemClick = (item: MenuItem) => {
    item.onClick();
    setIsOpen(false);
  };

  return (
    <div className={`${styles["dropdown-wrapper"]} ${className || ""}`}>
      <div ref={triggerRef} onClick={handleTriggerClick}>
        {trigger}
      </div>
      {isOpen && (
        <div
          ref={menuRef}
          className={`${styles["menu"]} ${styles[`menu-${position}`]} ${
            styles[`menu-${align}`]
          }`}
        >
          {items.map((item) => (
            <div
              key={item.label}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                handleItemClick(item);
              }}
              className={styles["menu-item"]}
            >
              {item.icon}
              {item.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
