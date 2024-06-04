import Button from "@mui/material/Button";
import { Link } from "wouter";

export default function NotFound() {
  return (
    <>
      <div
        style={{
          height: "100vh",
        }}
        className="h-full flex flex-col items-center justify-center"
      >
        <h1>Page Not Found</h1>
        <Link to="/">
          <Button color="success" variant="contained">
            Back
          </Button>
        </Link>
      </div>
    </>
  );
}
