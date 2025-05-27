"use client"
import { ComponentType } from "react";
import { useAppSelector } from "../../../app/store";
import { useRouter } from "next/navigation";

export function PrivateRoute({ Component }: { Component: ComponentType }) {
  const user = useAppSelector((state) => state.users.user);
  const router = useRouter()
  return user ? <Component /> : router.push("/users/login")
}
