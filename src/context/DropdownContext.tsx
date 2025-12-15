import { MenuItem } from "@/components/DropdownMenu";
import {
  createContext,
  ReactNode,
  RefObject,
  useCallback,
  useContext,
  useState,
} from "react";

type DropdownState = {
  isOpen: boolean;
  items: MenuItem[];
  triggerRef: RefObject<HTMLElement | null>;
  align?: "left" | "right" | "center";
  position?: "top" | "bottom";
};

type Options = Omit<DropdownState, "isOpen">;

interface DropdownContextValue {
  state: DropdownState;
  openDropdown: (options: Options) => void;
  closeDropdown: () => void;
}

const DropdownContext = createContext<DropdownContextValue | undefined>(
  undefined
);

const initialState: DropdownState = {
  isOpen: false,
  items: [],
  triggerRef: { current: null },
  align: "left",
  position: "bottom",
};

export function DropdownProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<DropdownState>(initialState);

  const openDropdown = useCallback((options: Options) => {
    setState({
      isOpen: true,
      items: options.items,
      triggerRef: options.triggerRef,
      align: options.align || "left",
      position: options.position || "bottom",
    });
  }, []);

  const closeDropdown = useCallback(() => {
    setState(initialState);
  }, []);

  return (
    <DropdownContext.Provider value={{ state, openDropdown, closeDropdown }}>
      {children}
    </DropdownContext.Provider>
  );
}

export function useDropdown() {
  const context = useContext(DropdownContext);
  if (!context) {
    throw new Error("useDropdown must be used within a DropdownProvider");
  }
  return context;
}
