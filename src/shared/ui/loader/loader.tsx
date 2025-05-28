import { CircularProgress } from "@mui/material";
import { createPortal } from "react-dom";

export function Loader() {
  const loader = () => (
    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
      <CircularProgress size="5rem" color="primary" />
    </div>
  )
  return typeof document == "undefined" ? loader() : createPortal(
    loader(),
    document.body,
  );
}
