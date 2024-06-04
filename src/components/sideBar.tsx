import IconRight from "@mui/icons-material/ArrowRight";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import Paper from "@mui/material/Paper";
import Tooltip from "@mui/material/Tooltip";
import { useState } from "react";
import { Link } from "react-router-dom";
import useWindowSize from "../utils/hooks/useWindowSize";

type tIcon = {
  Icon: React.ReactElement;
  txt: string;
  path: string;
};
type tProps = {
  icons: tIcon[];
  isExpanse: boolean;
  style?: React.CSSProperties;
  className?: string;
  onExpanse: (open: boolean) => void;
};
export default function SideBar({
  style = {},
  icons,
  isExpanse = false,
  className = "",
  onExpanse,
}: tProps) {
  // const [width, setWidth] = useState<{ min: string; max: string }>({
  //   min: "0px",
  //   max: "58px",
  // });
  const width = {
    min: "0px",
    max: "58px",
  };
  const [transition, setTransition] = useState("0ms");

  const windowSize = useWindowSize();
  const isMobile = windowSize.width < 620;

  const handleToggleExpanse = () => {
    setTransition("200ms");
    onExpanse(isExpanse);
  };

  return (
    <Paper
      square
      style={{
        width: isExpanse ? width?.max : width?.min,
        transition: transition,
        ...style,
      }}
      className={"relative h-body shadow-right  " + className}
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
            <Link className="text-me-white w-full h-full" to={icon.path}>
              <ListItemButton className={` flex   items-start`}>
                <div
                  style={{
                    marginRight: "0px",
                    width: "24px",
                    height: isExpanse ? "24px" : "32px",
                  }}
                  className="flex flex-col items-center "
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
                      visibility: isMobile
                        ? "visible"
                        : isExpanse
                          ? "hidden"
                          : "visible",
                    }}
                  >
                    {icon.txt}
                  </p>
                </div>

                <p
                  style={{
                    fontSize: "16px",
                    visibility: isMobile
                      ? "hidden"
                      : isExpanse
                        ? "visible"
                        : "hidden",
                  }}
                >
                  {icon.txt}
                </p>
              </ListItemButton>
            </Link>
          </ListItem>
        ))}
      </List>

      <div
        style={{
          right: 0,
          top: "50%",
          transform: `translateX(100%) rotate(${isExpanse ? 180 : 0}deg)`,
          transition: "300ms",
        }}
        className="absolute cursor-pointer flex items-center justify-center"
        onClick={handleToggleExpanse}
      >
        <Tooltip title={isExpanse ? "close" : "open"} placement="right">
          <div className="flex items-center justify-center">
            <IconRight fontSize="medium" />
          </div>
        </Tooltip>
      </div>
    </Paper>
  );
}
