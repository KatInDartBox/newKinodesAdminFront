import { signal } from "@preact/signals-react";

export const storeUser = signal({
  name: "",
  role: "",
  id: "",
});
