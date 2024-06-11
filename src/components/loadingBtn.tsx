import Button, { ButtonProps } from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import { ReactNode } from "react";

type tProps = {
  txt: ReactNode;
  isLoading?: boolean;
  loadingType?: "scan" | "circle";
} & ButtonProps;

export default function LoadingBtn({
  txt,
  isLoading,
  loadingType = "scan",
  ...others
}: tProps) {
  return (
    <Button
      className="relative overflow-hidden"
      size="small"
      disabled={others.disabled || isLoading}
      {...others}
    >
      <div className="flex items-center justify-center overflow-x-hidden">
        <span>{txt}</span>
        {isLoading && loadingType === "scan" && (
          <div className="absolute left-0 h-full w-5 bg-me-hover aniScan"></div>
        )}
        {isLoading && loadingType === "circle" && (
          <CircularProgress className="absolute" color="warning" size={15} />
        )}
      </div>
    </Button>
  );
}

// export default function LoadingBtn({ txt, isLoading, ...others }: tProps) {
//   return (
//     <Button disabled={isLoading} {...others}>
//       <div className="relative flex items-center justify-center">
//         <span className={!!isLoading ? "opacity-40" : ""}>{txt}</span>
//         {isLoading && <CircularProgress className="absolute" color="warning" size={15} />}
//       </div>
//     </Button>
//   );
// }
