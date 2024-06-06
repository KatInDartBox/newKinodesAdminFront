import { useEffect } from "react";

export default function Users() {
  const url = new URL(window.location.href);
  console.log("user search: ", {
    id: url.searchParams.get("id"),
    name: url.searchParams.get("name"),
    role: url.searchParams.get("role"),
  });
  useEffect(() => {}, []);
  return (
    <>
      <div>users </div>{" "}
    </>
  );
}
