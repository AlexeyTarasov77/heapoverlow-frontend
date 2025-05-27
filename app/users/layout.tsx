import { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
  return <div className="flex justify-center items-center min-h-screen">
    {children}
  </div>
}
