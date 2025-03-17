import { Alert as MUIAlert } from "@mui/material";
import { createPortal } from "react-dom";
import { AlertT } from "../shared/types/common";

export function ShowNotification({ children }: { children?: AlertT }) {
  return (
    children &&
    createPortal(
      <div className="absolute bottom-4 right-4">
        <MUIAlert onClose={() => {}} severity={children.severity}>
          {children.message}
        </MUIAlert>
      </div>,
      document.body,
    )
  );
}
