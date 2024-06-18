import { Button } from "@mui/material";
import { truncate } from "lodash";
import { useEffect } from "react";
import { useSearch } from "wouter";
import Wrapper from "../../components/wrapper";
import { resetUserStore, storeUser } from "../store";

export default function Profile() {
  const query = useSearch();
  const url = new URL("http://abc.com/user?" + query);
  const params = url.searchParams;
  const uid = params.get("id");
  const { getUser } = storeUser();
  const userInfo = getUser();
  userInfo.csrf = truncate(userInfo.csrf, { length: 15 });

  useEffect(() => {
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
    <Wrapper
      Header={<h1 className="text-lg">User</h1>}
      Body={
        <div className="p-4">
          <div>
            <pre>{JSON.stringify(userInfo, null, 2)}</pre>
          </div>
          <div className="my-3"></div>
          <Button
            onClick={handleLogout}
            size="small"
            variant="contained"
            color="error"
          >
            logout
          </Button>
        </div>
      }
    ></Wrapper>
  );
}
