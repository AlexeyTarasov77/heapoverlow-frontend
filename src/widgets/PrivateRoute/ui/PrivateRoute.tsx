import { useEffect, useState, ComponentType } from "react";
import { checkAuthenticated } from "../api/checkAuthenticated";
import { Navigate } from "react-router-dom";

export function PrivateRoute({ Component }: { Component: ComponentType }) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  useEffect(() => {
    checkAuthenticated().then((value) => setIsAuthenticated(value));
  }, []);
  if (isAuthenticated === null) {
    return <div>Loading...</div>;
  }
  return isAuthenticated ? <Component /> : <Navigate to="/users/signin" />;
}
