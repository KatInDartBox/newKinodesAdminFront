import CONFIG from "@/src/config";
import { storeUser } from "@/src/pageAdmin/store";
import { axClient, tRes } from "@/src/utils/req/axiosClient";
import { zusThunk } from "@/src/utils/zustand/zusthunk";
import { create } from "zustand";

type tStore = {
  loading: boolean;
  users: number;
  companys: number;
};
type tAction = {
  setCounter: () => Promise<void>;
};

export const counterStore = create<tStore & tAction>((set) => ({
  loading: false,
  users: 0,
  companys: 0,
  setCounter: zusThunk(set, async () => {
    const csrf = storeUser.getState().csrf;
    const req = await axClient.put(CONFIG.apiCounter.get, {
      csrf,
    });
    const data = req.data as tRes<{ counter: tStore }>;
    const counter = data.body.counter;
    set({
      users: counter.users,
      companys: counter.companys,
    });
  }),
}));
