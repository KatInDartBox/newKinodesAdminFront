import { addHours } from "date-fns/addHours";
import { useEffect } from "react";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import CONFIG from "../config";
import { getDefaultDate } from "../utils/date/getDefault";
import { axClient, tRes } from "../utils/req/axiosClient";
import { zusThunk } from "../utils/zustand/zusthunk";

export type tUser = {
  loading: boolean;
  loadingList: boolean;
  name: string;
  role: string;
  id: string;
  csrf: string;
  csrfLife: Date;
};
type tAction = {
  getUser: () => tUser;
  setCsrf: () => Promise<void>;
};
const defaultUser: tUser = {
  loading: false,
  loadingList: false,
  name: "",
  role: "",
  id: "",
  csrf: "",
  csrfLife: new Date(-1),
};
export const storeUser = create(
  persist<tUser & tAction>(
    (set, get) => ({
      ...defaultUser,
      getUser() {
        return {
          ...get(),
        };
      },
      setCsrf: zusThunk(set, async () => {
        let { csrf, csrfLife } = get();
        csrfLife = getDefaultDate(csrfLife);

        const isExpired = csrfLife.getTime() < new Date().getTime();
        // console.log({ csrf, isExpired });
        if (!csrf || isExpired) {
          const req = await axClient.get(CONFIG.apiUserCsrf);
          const data = req.data as tRes<{ token: string }>;
          const csrf = data.body.token;
          const life = addHours(new Date(), CONFIG.csrfLifeInHour);
          set({
            csrf, //
            csrfLife: life,
          });
        }
      }),
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

export function useInitUser() {
  const { csrf, loading, setCsrf } = storeUser.getState();

  useEffect(() => {
    console.log("init user effect");
    if (!csrf) setCsrf();
  }, [csrf]);

  return {
    csrf,
    loading,
  };
}
