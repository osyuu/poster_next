import { User } from "@/types";
import { ComposeModal } from "./components/ComposeModal";
import { getCurrentUser } from "@/lib/auth";
import { cookies } from "next/headers";
import Home from "@/app/(main)/home/page";
import Notifications from "@/app/(main)/notifications/page";

const pageMap: Record<string, React.ComponentType> = {
  "/home": Home,
  "/notifications": Notifications,
};

export default async function ComposePostPage({
  children,
}: {
  children: React.ReactNode;
}) {
  const profile = (await getCurrentUser()) satisfies User | null | undefined;
  const cookieStore = await cookies();
  const previousPage = cookieStore.get("previous-page")?.value || "/home";

  const Background = pageMap[previousPage] || Home;

  return (
    <>
      <div>
        <Background />
      </div>
      {/* Modal */}
      <ComposeModal profile={profile} />
      {children}
    </>
  );
}
