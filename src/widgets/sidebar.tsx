"use client"
import { CoreIcon } from "../assets/CoreIcon";
import HomeIcon from "@mui/icons-material/Home";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import LogoutIcon from "@mui/icons-material/Logout";
import QuestionsIcon from "@mui/icons-material/QuestionAnswer";
import SignInIcon from "@mui/icons-material/Login";
import SignUpIcon from "@mui/icons-material/HowToReg";
import { ReactElement } from "react";
import { useAppSelector } from "../app/store";
import Link from "next/link";

interface ISidebarLink {
  name: string;
  href: string;
  icon: ReactElement;
}

export function Sidebar() {
  const isAuthenticated = !!useAppSelector((state) => state.users.user);
  let linksList: ISidebarLink[] = [
    { name: "Home", href: "/", icon: <HomeIcon /> },
    { name: "Questions", href: "/questions", icon: <QuestionsIcon /> },
  ];
  if (isAuthenticated) {
    linksList = [
      ...linksList,
      { name: "Profile", href: "/users/profile", icon: <AccountBoxIcon /> },
      { name: "Logout", href: "/users/logout", icon: <LogoutIcon /> },
    ];
  } else {
    linksList = [
      ...linksList,
      { name: "Sign In", href: "/users/signin", icon: <SignInIcon /> },
      { name: "Sign Up", href: "/users/signup", icon: <SignUpIcon /> },
    ];
  }

  return (
    <aside className="h-screen w-1/5 flex-none bg-blue-200 p-4">
      <div>
        <CoreIcon />
      </div>
      {linksList.map((link, i) => (
        <Link key={i} href={link.href} className="flex items-center gap-2 py-2">
          <div className="flex gap-3">
            <div className="w-6 h-6">{link.icon}</div>
            <div>{link.name}</div>
          </div>
        </Link>
      ))}
    </aside>
  );
}
