export const zusThunk = <R, A extends any[]>(
  set: any,
  fn: (...args: A) => Promise<R>,
  loading = "loading",
  logError = false,
) =>
  async function asyncFn(...args: A) {
    try {
      const loadings = getLoading(loading);
      for (let loading of loadings) {
        set({ [loading]: true });
      }
      const itm = await fn(...args);
      for (let loading of loadings) {
        set({ [loading]: false });
      }
      return itm;
    } catch (error) {
      const loadings = getLoading(loading);
      for (let loading of loadings) {
        set({ [loading]: false });
      }
      if (logError) {
        console.log("from zustand error handler:\n", error);
      }
    }
  };

const getLoading = (loading: string | string[]) => {
  if (!loading) return ["loading"];
  return typeof loading === "string"
    ? loading.replace(/\s/gi, "").split(",")
    : loading;
};
