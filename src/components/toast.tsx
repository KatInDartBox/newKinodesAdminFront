import IconClose from "@mui/icons-material/Close";
import { Paper } from "@mui/material";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Slide, { SlideProps } from "@mui/material/Slide";
import Snackbar from "@mui/material/Snackbar";
import { useId } from "react";

function Transition(props: SlideProps) {
  return <Slide {...props} direction="up" />;
}

type tProps = {
  open: boolean;
  onClose: (e: any, reason?: string) => void;
  className?: string;
  message: string;
  Action?: React.ReactNode;
  duration?: number | null;
};
export function Prompt({
  duration = 3500,
  open,
  onClose,
  className,
  message,
  Action,
}: tProps) {
  const id = useId();
  return (
    <Snackbar
      className="w-full"
      autoHideDuration={duration} //
      anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      open={open}
      onClose={onClose}
      message="i love you"
      TransitionComponent={Transition}
      key={id}
    >
      <Paper
        className={`flex items-center justify-between py-2 px-4 sm:w-1/2  w-3/4 ${
          className || "!bg-me-green"
        }`}
      >
        <div className="px-1">{message}</div>
        {Action || (
          <IconButton onClick={onClose} size="small">
            <IconClose fontSize="small" />
          </IconButton>
        )}
      </Paper>
    </Snackbar>
  );
}

type tConfirm = {
  open: boolean;
  onConfirm: (isConfirm: boolean) => void;
  message: string;
  className?: string;
  duration?: number;
  confirmTxt?: string;
};

export function Confirm({
  open,
  onConfirm,
  message,
  className, //
  duration = 9000,
  confirmTxt = "confirm",
}: tConfirm) {
  const handleClose = (e: any, reason?: string, confirm?: boolean) => {
    if (reason === "clickaway") {
      return;
    }
    onConfirm(!!confirm);
  };

  return (
    <Prompt
      className={className}
      open={open}
      message={message}
      duration={duration}
      onClose={(e, r) => handleClose(e, r, false)}
      Action={
        <div className="flex items-center">
          <Button
            className="text-inherit mr-2"
            onClick={() => handleClose({}, "", true)} //
            color="secondary"
            variant="contained"
            size="small"
          >
            {confirmTxt}
          </Button>
          <IconButton onClick={handleClose} size="small">
            <IconClose fontSize="small" />
          </IconButton>
        </div>
      }
    />
  );
}
