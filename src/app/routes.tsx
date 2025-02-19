import { Route, Routes } from "react-router-dom";
import { LayoutPage } from "../pages/layout";
import { MainPage } from "../pages/main";
import { NotFoundPage } from "../pages/not-found";
import { QuestionPage } from "../pages/question-detail";
import { QuestionsListPage } from "../pages/questions-list";
import { LikedQuestionsListPage } from "../pages/liked-questions";
import { BrowserRouter } from 'react-router-dom';


export function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<LayoutPage />}>
          <Route path="/" element={<MainPage />} />
          <Route path="/questions" element={<QuestionsListPage />} />
          <Route path="/questions/:id" element={<QuestionPage />} />
          <Route path="/questions/liked" element={<LikedQuestionsListPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

