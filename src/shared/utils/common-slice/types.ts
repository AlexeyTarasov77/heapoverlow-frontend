
export type AlertT = {
  severity: "success" | "error" | "info" | "warning";
  message: string;
};

export type CommonState = {
  alert?: AlertT;
};
