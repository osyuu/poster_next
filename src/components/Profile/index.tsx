import { getCurrentUser } from "@/lib/auth";
import ProfileClient from "./ProfileClient";

export default async function Profile() {
  const profile = await getCurrentUser();
  if (!profile) {
    return null;
  }

  return (
    <ProfileClient
      avatar={profile.avatar}
      display={profile.display}
      username={profile.username}
    />
  );
}
