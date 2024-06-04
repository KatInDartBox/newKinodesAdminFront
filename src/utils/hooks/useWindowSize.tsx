import { debounce } from "@mui/material";
import { useEffect, useState } from "react";

type tState = {
  width: number;
  height: number;
};
export default function useWindowSize() {
  const [size, setSize] = useState<tState>({
    width: 1120,
    height: 620,
  });

  useEffect(() => {
    function handleResize() {
      setSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }
    handleResize();
    window.addEventListener("resize", debounce(handleResize, 250));

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return size;
}
