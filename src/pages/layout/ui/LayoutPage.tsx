import { Outlet } from "react-router-dom";
import { Sidebar } from "../../../widgets";

export function LayoutPage() {
  return (
    <>
      <main className="h-screen">
        <div className="flex h-full gap-5">
          <Sidebar />
          <div className="w-full h-full">
            <Outlet />
          </div>
        </div>
      </main>
    </>
  );
}
