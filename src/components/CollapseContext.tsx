import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useState,
} from "react";

const context = createContext<{
  setCollapsed: Dispatch<SetStateAction<boolean>>;
  collapsed: boolean;
} | null>(null);

export const CollapseContextProvider = ({
  children,
  collapsed,
  setCollapsed,
}: {
  children: React.ReactNode;
  setCollapsed: Dispatch<SetStateAction<boolean>>;
  collapsed: boolean;
}) => {
  return (
    <context.Provider value={{ collapsed, setCollapsed }}>
      {children}
    </context.Provider>
  );
};

export const useCollapseContext = () => {
  const ctx = useContext(context);
  if (!ctx) throw new Error("CollapseContextProvider not found");
  return ctx;
};
