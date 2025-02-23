import { Outlet } from "react-router-dom";
import { Sidebar } from "../../../widgets";
import HomeIcon from "@mui/icons-material/Home"
import QuestionsIcon from '@mui/icons-material/QuestionAnswer';
import SignInIcon from '@mui/icons-material/Login';
import SignUpIcon from '@mui/icons-material/HowToReg';


export const SIDEBAR_LINKS = [
  { name: "Home", href: "/", icon: <HomeIcon /> },
  { name: "Questions", href: "/questions", icon: <QuestionsIcon /> },
  { name: "Sign In", href: "/users/signin", icon: <SignInIcon /> },
  { name: "Sign Up", href: "/users/signup", icon: <SignUpIcon /> },
];

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
