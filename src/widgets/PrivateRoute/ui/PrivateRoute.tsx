import { ComponentType } from "react";
import { Navigate } from "react-router-dom";
import { useAppSelector } from "../../../app/hooks";

export function PrivateRoute({ Component }: { Component: ComponentType }) {
  const user = useAppSelector((state) => state.users.user);
  return user ? <Component /> : <Navigate to="/users/signin" />;
}
