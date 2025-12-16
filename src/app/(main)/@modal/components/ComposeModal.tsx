"use client";

import { Modal } from "@/components/Modal/Modal";
import PostForm from "@/app/(main)/posts/components/PostForm";
import { User } from "@/types";

export function ComposeModal({
  profile,
}: {
  profile: User | null | undefined;
}) {
  if (!profile) {
    return null;
  }

  return (
    <Modal>
      <PostForm profile={profile} />
    </Modal>
  );
}
