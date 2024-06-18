import Paper, { PaperProps } from "@mui/material/Paper";
import { ReactNode } from "react";

type tProps = {
  Header?: ReactNode;
  Body: ReactNode;
  Footer?: ReactNode;
} & PaperProps;
export default function Wrapper({ Header, Body, Footer, ...others }: tProps) {
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
        className="w-full h-full"
        {...others}
      >
        <div
          style={{
            height: "48px",
            boxShadow: "rgb(0 0 0 / 39%) 0 1px 3px 1px",
          }}
          className="flex items-center justify-between px-3"
        >
          {Header}
        </div>
        <div
          style={{
            height: "calc(100vh - 4rem - 48px - 48px)",
          }}
          className="overflow-y-auto"
        >
          {Body}
        </div>

        <div
          style={{
            height: "48px",

            boxShadow: "rgb(0 0 0 / 39%) 0 -1px 3px 1px",
          }}
          className="flex items-center justify-between px-3"
        >
          {Footer}
        </div>
      </Paper>
    </div>
  );
}
