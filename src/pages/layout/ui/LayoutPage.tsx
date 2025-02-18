import { Outlet } from "react-router-dom";
import { SIDEBAR_LINKS } from "../../../app/constants";
import { Sidebar } from "../../../widgets";

export function LayoutPage() {
  return (
    <>
      <main className="h-screen">
        <div className="flex h-full gap-5">
          <Sidebar links={SIDEBAR_LINKS} />
          <div className="w-full h-full">
            <Outlet />
          </div>
        </div>
      </main>
    </>
  );
}
