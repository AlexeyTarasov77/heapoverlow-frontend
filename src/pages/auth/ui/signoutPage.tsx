"use client"

import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../app/store";
import { Button, Typography } from "@mui/material";
import { userLogout } from "../../../entities/users";
import { useRouter } from "next/navigation";

export function SignOutPage() {
  const isNotAuthenticated = !useAppSelector((state) => state.users.user);
  const dispatch = useAppDispatch();
  const router = useRouter()
  useEffect(() => {
    if (isNotAuthenticated) {
      router.replace("/")
    }
  }, []);
  const onLogoutConfirm = () => {
    dispatch(userLogout());
    router.replace("/users/signin");
  };
  return (
    <div className="flex justify-center items-center h-full">
      <div className="border border-blue-500 shadow-blue-400 p-5 shadow-md">
        <Typography gutterBottom variant="h4">
          Are you sure you want to logout?
        </Typography>
        <div className="flex gap-3">
          <Button variant="contained" onClick={onLogoutConfirm}>
            Yes
          </Button>
          <Button
            variant="contained"
            color="error"
            onClick={() => router.back()}
          >
            No
          </Button>
        </div>
      </div>
    </div>
  );
}
