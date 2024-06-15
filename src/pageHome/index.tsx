import LoginGoogle from "@/src/components/loginGoogle";
import { useEffect } from "react";
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
