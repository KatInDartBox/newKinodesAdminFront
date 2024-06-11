import IconAds from "@mui/icons-material/AdsClick";
import IconBug from "@mui/icons-material/BugReport";
import IconHome from "@mui/icons-material/House";
import IconUser from "@mui/icons-material/Person";
import AxiosHandler from "../components/axios";
import SideBar, { tSideBarIcon } from "../components/sideBar";

export const Icons: tSideBarIcon[] = [];

export default function Layout() {
  return (
    <>
      <SideBar
        icons={[
          { txt: "home", Icon: <IconHome />, path: "~/" },
          { txt: "user", Icon: <IconUser />, path: "/" },
          { txt: "ads", Icon: <IconAds />, path: "/ads" },
          { txt: "error", Icon: <IconBug />, path: "/error" },
        ]}
        basePath="/user"
      />
      <AxiosHandler />
    </>
  );
}
