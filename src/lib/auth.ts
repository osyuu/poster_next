import { User } from "@/types";
import { unstable_noStore } from "next/cache";
import { cache } from "react";

export const getCurrentUser = cache(async (): Promise<User | null> => {
  unstable_noStore();
  try {
    // const cookieStore = await cookies();
    // const sessionToken = cookieStore.get("session")?.value;

    // if (!sessionToken) {
    //   return null;
    // }

    // const response = await fetch(`${process.env.API_URL}/auth/verify`, {
    //   headers: {
    //     Authorization: `Bearer ${sessionToken}`,
    //   },
    // });

    // if (!response.ok) {
    //   return null;
    // }

    // const user = await response.json();
    // return user;

    const user = {
      id: 1,
      username: "user1",
      email: "user1@example.com",
      display: "作者A",
      avatar: "https://ui-avatars.com/api/?name=John+Doe&size=40",
    };
    return user;
  } catch {
    return null;
  }
});
