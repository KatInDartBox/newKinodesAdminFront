import { addHours } from "date-fns/addHours";
import { useEffect, useState } from "react";
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
  updated_at: Date;
};
type tAction = {
  getUser: () => tUser;
  setCsrf: () => Promise<void>;
  setProfile: () => Promise<void>;
  logout: () => Promise<void>;
};
const defaultUser: tUser = {
  loading: false,
  loadingList: false,
  name: "",
  role: "",
  id: "",
  csrf: "",
  csrfLife: new Date(-1),
  updated_at: new Date(-1),
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
      setProfile: zusThunk(set, async () => {
        const req = await axClient.get(CONFIG.apiProfile.get);
        const data = req.data as tRes<{ user: tUser; csrf: string }>;
        const csrf = data.body.csrf;
        const user = data.body.user;
        set({
          id: user.id,
          name: user.name,
          csrf,
          csrfLife: addHours(new Date(), CONFIG.csrfLifeInHour),
          role: user.role,
          updated_at: new Date(user.updated_at),
        });
      }),
      logout: zusThunk(set, async () => {
        await axClient.get(CONFIG.apiProfile.logout);
        set({
          ...defaultUser,
        });
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
  const [state, setState] = useState("");
  const { csrf, setCsrf } = storeUser();

  useEffect(() => {
    console.log("init user effect");
    setCsrf();
  }, []);
  useEffect(() => {
    if (!!csrf) {
      setState(csrf);
    }
  }, [csrf]);

  return state;
}
