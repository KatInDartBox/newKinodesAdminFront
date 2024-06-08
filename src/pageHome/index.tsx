import LoginGoogle from "@/src/components/loginGoogle";
import { useEffect } from "react";
import { Link } from "wouter";
import { navigate } from "wouter/use-browser-location";
import { storeUser } from "../pageUser/store";

export default function PageHome() {
  const { id } = storeUser();
  useEffect(() => {
    if (!!id) {
      navigate("/user/");
    }
  }, []);
  return (
    <>
      <Link to="/user?id=123&name=vichetch&role=admin">user</Link>
      <Link to="/">home</Link>
      <div
        style={{
          height: "100vh",
        }}
        className="h-full flex items-center justify-center"
      >
        <LoginGoogle />
      </div>
    </>
  );
}
