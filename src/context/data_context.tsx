"use client";
import { PostWithAuthor } from "@/types";
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
} from "react";

type DataContextType = {
  posts: PostWithAuthor[];
  setPosts: Dispatch<SetStateAction<PostWithAuthor[]>>;
};

const DataContext = createContext<DataContextType | undefined>(undefined);

// このProviderでアプリをラップすると、どのコンポーネントからでもvalueの値にアクセスできる
export function DataProvider({ children }: { children: ReactNode }) {
  const [posts, setPosts] = useState<PostWithAuthor[]>([]);

  const value = { posts, setPosts };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
}

// 各コンポーネントが簡単にContextのデータを使えるようにするための便利関数
export function useData() {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error("useData must be used within a DataProvider");
  }
  return context;
}
