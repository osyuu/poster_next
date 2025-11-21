"use client";
import Image from "next/image";
import styles from "./Avatar.module.css";
import { useEffect, useState } from "react";

interface AvatarProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
}

export default function Avatar({
  src,
  alt,
  width = 40,
  height = 40,
}: AvatarProps) {
  const [imgSrc, setImgSrc] = useState(src);

  useEffect(() => {
    setImgSrc(src);
  }, [src]);

  return (
    <div className={styles["avatar"]}>
      <Image
        src={imgSrc}
        alt={alt}
        width={width}
        height={height}
        onError={() =>
          setImgSrc(
            "https://ui-avatars.com/api/?name=John+Doe&size=40&background=random&color=random"
          )
        }
      />
    </div>
  );
}
