import { Link } from "react-router-dom";
import coreIcon from "../assets/core-icon.svg";

export function Sidebar({
  links,
}: {
  links: { name: string; href: string; iconURL: string }[];
}) {
  return (
    <aside className="w-1/5 flex-none bg-blue-200 p-4">
      <div><img src={coreIcon} alt="" /></div>
      {links.map((link, i) => (
        <Link key={i} to={link.href} className="flex items-center gap-2 py-2">
          <img src={link.iconURL} className="w-6 h-6" alt={link.name} />
          {link.name}
        </Link>
      ))}
    </aside>
  );
}
