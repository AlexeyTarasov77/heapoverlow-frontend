import homeIcon from "../assets/sidebar-icons/home-icon.svg";
import questionsIcon from "../assets/sidebar-icons/questions-icon.svg";

export const LIKED_QUESTIONS_KEY = "likesQuestionsIds";

// TODO: change url to icon components
export const SIDEBAR_LINKS = [
  { name: "Home", href: "/", iconURL: homeIcon },
  { name: "Questions", href: "/questions", iconURL: questionsIcon },
  { name: "Sign In", href: "/users/signin", iconURL: questionsIcon },
  { name: "Sign Up", href: "/users/signup", iconURL: questionsIcon },
];

export const SERVER_URL = "http://localhost:5050";
