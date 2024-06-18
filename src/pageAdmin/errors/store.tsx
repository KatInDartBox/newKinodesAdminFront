import CONFIG from "@/src/config";
import { getDefaultDate } from "@/src/utils/date/getDefault";
import { axClient, tRes } from "@/src/utils/req/axiosClient";
import { zusThunk } from "@/src/utils/zustand/zusthunk";
import { create } from "zustand";
import { storeUser } from "../store";

export type tAdmErr = {
  id: string;
  ip: string;
  msg: string;
  risk_level: number;
  err: string;
  file: string;
  line: number;
  func: string;
  url: string;
  method: string;
  updated_at: Date;
};

type tAdmErrStore = {
  loading: boolean;
  loadingList: boolean;
  current?: tAdmErr;
  lists: tAdmErr[];
};
type tAdmErrAction = {
  setCurrent: (adm?: tAdmErr) => void;
  setLists: () => Promise<void>;
  flush: (before: Date) => Promise<void>;
};

export const admErrStore = create<tAdmErrStore & tAdmErrAction>((set, get) => ({
  loading: false,
  loadingList: false,
  current: undefined,
  lists: [],
  setCurrent: (ads) => {
    set({
      current: ads,
    });
  },
  setLists: zusThunk(
    set,
    async () => {
      const pre = get().lists;
      const last = pre[pre.length - 1];
      const lastId = last?.id || "1";
      const csrf = storeUser.getState().csrf;
      const req = await axClient.put(CONFIG.apiAdmErr.get, {
        id: lastId + "",
        csrf,
      });
      const data = req.data as tRes<{ data: tAdmErr[] }>;
      const newLists = data.body.data.map((ad) => ({
        ...ad,
        updated_at: getDefaultDate(ad.updated_at),
      }));
      const lists = pre.concat(newLists);

      // already sorted by server
      // errDb.sort((a, b) => (isGreater(b.id, a.id) ? 1 : -1));

      set({
        lists,
      });
    },
    "loadingList",
  ),
  flush: zusThunk(set, async (before) => {
    const pre = get().lists;
    const csrf = storeUser.getState().csrf;
    await axClient.put(CONFIG.apiAdmErr.flush, {
      updated_at: before,
      csrf,
    });
    const lists = pre.filter(
      (ls) => ls.updated_at.getTime() > before.getTime(),
    );
    set({
      lists,
    });
  }),
}));

// const ExAds: tAds[] = [
//   {
//     id: "1",
//     img_url: "",
//     href: "abc.com",
//     title: "abc",
//     desc: "desc",
//     tags: "abc,efg",
//   },
//   {
//     id: "2",
//     img_url: "",
//     href: "abc.com",
//     title: "efg",
//     desc: "desc",
//     tags: "abc,efg",
//   },
// ];
