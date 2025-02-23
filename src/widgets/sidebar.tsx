import { Link } from "react-router-dom";
import { CoreIcon } from "../assets/CoreIcon";
import { ReactElement } from "react";

interface ISidebarLink {
  name: string;
  href: string;
  icon: ReactElement
}

export function Sidebar({
  links,
}: {
  links: ISidebarLink[];
}) {
  return (
    <aside className="h-screen w-1/5 flex-none bg-blue-200 p-4">
      <div>
        <CoreIcon />
      </div>
      {links.map((link, i) => (
        <Link key={i} to={link.href} className="flex items-center gap-2 py-2">
          <div className="flex gap-3">
            <div className="w-6 h-6">{link.icon}</div>
            <div>{link.name}</div>
          </div>
        </Link>
      ))}
    </aside>
  );
}
