type tParam = (p: { [key: string]: any }) => string;

export const encodeUrlParams: tParam = (p) => {
  return Object.entries(p)
    .map((kv) => kv.map(encodeURIComponent).join("="))
    .join("&");
};
