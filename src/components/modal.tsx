import { cssColor } from "@/src/mui/color";
import useIsMobile from "@/src/utils/hooks/useIsMogile";
import IconX from "@mui/icons-material/Close";
import { Breakpoint } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import ButtonIcon from "@mui/material/IconButton";
import { styled } from "@mui/material/styles";
import { ReactNode } from "react";

const DarkDialog = styled(Dialog)(() => ({
  "& .MuiBackdrop-root": {
    background: cssColor.black,
  },
  "& .MuiDialog-paperFullScreen": {
    background: cssColor.black,
  },
  "& .MuiDialog-paper": {
    overflowY: "visible",
  },
}));

export interface tModal {
  open: boolean;
  onClose: () => void;
  title: ReactNode;
  Content: React.ReactNode;
  isFullScreen?: boolean;
  width?: Breakpoint;
  isFullHeight?: boolean;
}

export default function Modal({
  title,
  open,
  onClose,
  Content, //
  isFullScreen = false,
  width = "sm",
  isFullHeight,
}: tModal) {
  const isMobile = useIsMobile();
  const handleClose = () => {
    onClose();
  };
  const getFullScreen = isMobile || isFullScreen;
  return (
    <DarkDialog
      // scroll="paper"
      fullScreen={getFullScreen} //
      keepMounted={false}
      open={open}
      fullWidth
      maxWidth={width}
    >
      <DialogTitle className="flex items-center justify-between">
        <span>{title}</span>
        <ButtonIcon color="warning" size="small" onClick={handleClose}>
          <IconX fontSize="small" />
        </ButtonIcon>
      </DialogTitle>
      <DialogContent
        style={{
          height: isFullHeight ? "calc(100vh - 112px)" : "",
        }}
      >
        {Content}
      </DialogContent>
    </DarkDialog>
  );
}
