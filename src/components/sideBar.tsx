import IconRight from "@mui/icons-material/ArrowRight";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import Paper from "@mui/material/Paper";
import { useState } from "react";
import { Link } from "wouter";

export type tSideBarIcon = {
  Icon: React.ReactNode;
  txt: string;
  path: string;
};
type tProps = {
  icons: tSideBarIcon[];
  style?: React.CSSProperties;
  className?: string;
  basePath: string;
};
export default function SideBar({
  style = {},
  icons,
  className = "",
  basePath,
}: tProps) {
  const url = new URL(window.location.href);

  const isActive = (iconPath: string) => {
    const rIconPath = basePath + iconPath;
    if (rIconPath === url.pathname) return "text-me-gold";
    return "";
  };
  const [expanse, setExpanse] = useState(true);
  const handleExpanse = () => {
    setExpanse((pre) => !pre);
  };
  return (
    <Paper
      square
      style={{
        width: expanse ? "58px" : "0px",
        height: "100vh",
        transition: "300ms",
        ...style,
      }}
      className={"relative  shadow-right  " + className}
    >
      <List className="h-full w-full overflow-x-hidden flex flex-col items-start">
        {icons.map((icon) => (
          <ListItem
            disablePadding
            style={{
              height: "56px",
            }}
            key={icon.path}
          >
            <Link
              className={`${isActive(icon.path)} w-full h-full`}
              to={icon.path}
            >
              <ListItemButton className={` flex   items-start`}>
                <div
                  style={{
                    marginRight: "0px",
                    width: "24px",
                  }}
                  className={
                    "flex flex-col items-center " //
                  }
                >
                  <div
                    style={{
                      width: "24px",
                      height: "24px",
                    }}
                    className=" flex items-center justify-center"
                  >
                    {icon.Icon}
                  </div>
                  <p
                    style={{
                      fontSize: "9px",
                    }}
                  >
                    {icon.txt}
                  </p>
                </div>
              </ListItemButton>
            </Link>
          </ListItem>
        ))}
      </List>

      {/* handle */}
      <div
        style={{
          right: 0,
          top: "50%",
          transform: `translateX(100%) rotate(${expanse ? 180 : 0}deg)`,
          transition: "300ms",
        }}
        className="absolute cursor-pointer flex items-center justify-center"
        onClick={handleExpanse}
      >
        <IconRight />
      </div>
    </Paper>
  );
}
