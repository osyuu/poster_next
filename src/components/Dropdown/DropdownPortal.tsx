"use client";

import { useDropdown } from "@/context/DropdownContext";
import styles from "./DropdownPortal.module.css";
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";

type Position = {
  top: number;
  left: number;
};

export default function DropdownPortal() {
  const { state, closeDropdown } = useDropdown();
  const [position, setPosition] = useState<Position>({
    top: 0,
    left: 0,
  });
  const menuRef = useRef<HTMLDivElement>(null);

  const updatePosition = useCallback(() => {
    if (!state.triggerRef?.current) return;

    const rect = state.triggerRef.current.getBoundingClientRect();
    const menuWidth = menuRef.current?.offsetWidth ?? 200; // fallback 200

    let top: number;
    let left: number;

    // 上下位置
    if (state.position === "top") {
      top = rect.top - 8; // menu 會在上方，之後用 transform 往上移
    } else {
      top = rect.bottom + 8;
    }

    // 左右對齊
    switch (state.align) {
      case "right":
        left = rect.right - menuWidth;
        break;
      case "center":
        left = rect.left + rect.width / 2 - menuWidth / 2;
        break;
      case "left":
      default:
        left = rect.left;
        break;
    }

    // 邊界檢查（防止超出視窗）
    left = Math.max(8, Math.min(left, window.innerWidth - menuWidth - 8));
    top = Math.max(8, top);

    setPosition({ top, left });
  }, [state.triggerRef, state.position, state.align]);

  // 初始計算 + 監聽 resize/scroll
  useLayoutEffect(() => {
    if (!state.isOpen) return;

    // 初始計算
    // eslint-disable-next-line react-hooks/set-state-in-effect
    updatePosition();

    // 使用 requestAnimationFrame 來優化效能
    let rafId: number;
    const handleUpdate = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(updatePosition);
    };

    // 監聽變化
    window.addEventListener("resize", handleUpdate);
    window.addEventListener("scroll", handleUpdate, true); // true 捕獲所有滾動

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", handleUpdate);
      window.removeEventListener("scroll", handleUpdate, true);
    };
  }, [state.isOpen, updatePosition]);

  useEffect(() => {
    if (!state.isOpen) return;

    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        closeDropdown();
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [state.isOpen, closeDropdown]);

  if (!state.isOpen) {
    return null;
  }

  return (
    <div
      className={`${styles["menu"]} ${
        state.position === "top" ? styles["menu-top"] : ""
      }`}
      style={{
        top: position.top,
        left: position.left,
      }}
      onClick={(e) => e.stopPropagation()}
      ref={menuRef}
    >
      {state.items.map((item) => (
        <div
          key={item.label}
          className={`${styles["menu-item"]} ${
            item.variant === "danger" ? styles["menu-item-danger"] : ""
          }`}
          onClick={() => {
            item.onClick();
            closeDropdown();
          }}
        >
          {item.icon}
          <span>{item.label}</span>
        </div>
      ))}
    </div>
  );
}
