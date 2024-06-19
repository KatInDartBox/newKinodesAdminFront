import { Button } from "@mui/material";
import { truncate } from "lodash";
import { useEffect } from "react";
import Wrapper from "../../components/wrapper";
import { storeUser } from "../store";

export default function Profile() {
  // const query = useSearch();
  // const url = new URL("http://abc.com/user?" + query);
  // const params = url.searchParams;
  // const uid = params.get("id");
  const { logout, getUser, setProfile, id, loading } = storeUser();
  const userInfo = getUser();
  userInfo.csrf = truncate(userInfo.csrf, { length: 15 });

  useEffect(() => {
    if (!id) {
      setProfile();
    }
  }, [id]);

  const handleLogout = async () => {
    await logout();
    // resetUserStore();
    window.location.replace("/");
  };

  return (
    <Wrapper
      Header={<h1 className="text-lg">Profile</h1>}
      Body={
        <div className="p-4">
          <div>
            {loading ? (
              <div>loading</div>
            ) : (
              <pre>{JSON.stringify(userInfo, null, 2)}</pre>
            )}
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
