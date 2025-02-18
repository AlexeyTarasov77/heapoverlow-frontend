import { LayoutPage } from "../pages/layout";
import { LikedQuestionsList } from "../pages/liked-questions/liked-questions-list.ui";
import { MainPage } from "../pages/main";
import { QuestionPage } from "../pages/question-detail";
import { QuestionsListPage } from "../pages/questions-list";

export const routes = [
  {
    element: <LayoutPage />,
    children: [
      {
        path: "/",
        element: <MainPage />
      },
      {
        path: "/questions",
        element: <QuestionsListPage />
      },
      {
        path: "/questions/:id",
        element: <QuestionPage />
      },
      {
        path: "/questions/liked",
        element: <LikedQuestionsList />
      }
    ],
  },
];
