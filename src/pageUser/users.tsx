import { Button } from "@mui/material";
import { useEffect } from "react";
import { useSearch } from "wouter";
import Wrapper from "../components/wrapper";
import { resetUserStore, storeUser } from "./store";

export default function Users() {
  const query = useSearch();
  const url = new URL("http://abc.com/user?" + query);
  const params = url.searchParams;
  const uid = params.get("id");
  const { id, name, role } = storeUser();

  useEffect(() => {
    if (!uid) return;
    if (!!uid) {
      const sUser = {
        id: params.get("id") || "",
        name: params.get("name") || "",
        role: params.get("role") || "",
      };
      storeUser.setState({ ...sUser });
    }
  }, [query]);

  const handleLogout = () => {
    resetUserStore();
    window.location.replace("/");
  };

  return (
    <Wrapper>
      <div>id: {id} </div>
      <div>name: {name} </div>
      <div>role: {role} </div>
      <div className="my-3"></div>
      <Button
        onClick={handleLogout}
        size="small"
        variant="contained"
        color="error"
      >
        logout
      </Button>
    </Wrapper>
  );
}
