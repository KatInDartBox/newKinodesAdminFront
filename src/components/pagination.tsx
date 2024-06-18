import IconDown from "@mui/icons-material/ChevronLeft";
import IconUp from "@mui/icons-material/ChevronRight";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";

export type tDirection = "up" | "down";
type tProps = {
  no?: string | number;
  onPageChange: (direction: tDirection) => void;
  disabledNext?: boolean;
};

export default function Pagination({
  no = 1,
  onPageChange,
  disabledNext = false,
}: tProps) {
  const page = +no < 1 ? 1 : +no;

  const handlePageChange = (direction: tDirection) => () => {
    onPageChange(direction);
  };

  return (
    <div className="flex items-center">
      <Tooltip title={"previous page"} placement="top">
        <span>
          <IconButton
            disabled={page === 1}
            className="text-me-white"
            size="small"
            onClick={handlePageChange("down")}
          >
            <IconDown style={{ width: 16, height: 16 }} />
          </IconButton>
        </span>
      </Tooltip>
      <input
        className={
          "relative text-xs -top-px w-8 border-none text-inherit text-center outline-none bg-transparent " +
          " pointer-events-none"
        }
        readOnly
        value={page} //
      />
      <Tooltip title={"next page"} placement="top">
        <span>
          <IconButton
            disabled={disabledNext}
            className="text-me-white "
            size="small" //
            onClick={handlePageChange("up")}
          >
            <IconUp style={{ width: 16, height: 16 }} />
          </IconButton>
        </span>
      </Tooltip>
    </div>
  );
}
