import { create } from "zustand";
import { persist } from "zustand/middleware";

export type tUser = {
  name: string;
  role: string;
  id: string;
};
const defaultUser: tUser = {
  name: "",
  role: "",
  id: "",
};
export const storeUser = create(
  persist<tUser>(
    (set, get) => ({
      ...defaultUser,
    }),
    {
      name: "STORE_USER",
    },
  ),
);

export function resetUserStore() {
  storeUser.setState({
    ...defaultUser,
  });
}
