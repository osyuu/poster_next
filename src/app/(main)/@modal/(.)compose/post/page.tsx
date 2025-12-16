import { getCurrentUser } from "@/lib/auth";
import { ComposeModal } from "../../components/ComposeModal";
import { User } from "@/types";

export default async function ComposePostModal() {
  const profile = (await getCurrentUser()) satisfies User | null | undefined;

  return <ComposeModal profile={profile} />;
}
