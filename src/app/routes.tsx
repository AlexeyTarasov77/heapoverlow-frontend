import { Route, Routes } from "react-router-dom";
import { LayoutPage } from "../pages/layout";
import { MainPage } from "../pages/main";
import { NotFoundPage } from "../pages/not-found";
import { QuestionPage } from "../pages/question-detail";
import { QuestionsListPage } from "../pages/questions-list";
import { LikedQuestionsListPage } from "../pages/liked-questions";
import { BrowserRouter } from "react-router-dom";
import { CreateQuestionPage } from "../pages/create-question";
import { SignInPage, SignUpPage } from "../pages/auth";
import { PrivateRoute } from "../widgets";
import { ProfilePage } from "../pages/profile-page";
import { useEffect } from "react";
import { loadUserByToken } from "../shared/store/UsersSlice";
import { useAppDispatch } from "./hooks";

export function AppRouter() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(loadUserByToken());
  });
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<LayoutPage />}>
          <Route path="/" element={<MainPage />} />
          <Route path="/questions" element={<QuestionsListPage />} />
          <Route path="/questions/:id" element={<QuestionPage />} />
          <Route path="/questions/liked" element={<LikedQuestionsListPage />} />
          <Route
            path="/questions/create"
            element={<PrivateRoute Component={CreateQuestionPage} />}
          />
          <Route path="/users/signin" element={<SignInPage />} />
          <Route path="/users/signup" element={<SignUpPage />} />
          <Route
            path="/users/profile"
            element={<PrivateRoute Component={ProfilePage} />}
          />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
