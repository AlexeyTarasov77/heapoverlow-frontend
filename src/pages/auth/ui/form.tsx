import { Box } from "@mui/material";
import { ReactNode, FormEventHandler } from "react";

export function AuthForm({ children, onSubmit }: { children: ReactNode, onSubmit: FormEventHandler }) {
  return (
    <Box
      component="form"
      onSubmit={onSubmit}
      className="flex flex-col gap-4 border border-blue-500 py-32 px-32"
      maxWidth="sm"
      maxHeight="sm"
    >
      {children}
    </Box>
  )
}
