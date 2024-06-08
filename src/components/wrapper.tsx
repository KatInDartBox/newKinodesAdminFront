import Paper, { PaperProps } from "@mui/material/Paper";
import { ReactNode } from "react";

type tProps = {
  children: ReactNode;
} & PaperProps;
export default function Wrapper({ children, ...others }: tProps) {
  return (
    <div
      className="flex items-center justify-center py-8 px-4"
      style={{
        height: "100vh",
        width: "100%",
      }}
    >
      <Paper
        style={{
          maxWidth: "788px",
        }}
        className="w-full h-full p-2"
        {...others}
      >
        {children}
      </Paper>
    </div>
  );
}
