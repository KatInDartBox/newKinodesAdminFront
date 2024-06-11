import useWindowSize from "./useWindowSize";

export default function useIsMobile(mobileWidth: string | number = 600) {
  const w = +mobileWidth;
  const size = useWindowSize();

  return size.width <= w;
}
