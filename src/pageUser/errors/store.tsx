import CONFIG from "@/src/config";
import { getDefaultDate } from "@/src/utils/date/getDefault";
import { isGreater } from "@/src/utils/number/big";
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
  setLists: (id: number) => Promise<void>;
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
    async (id) => {
      const csrf = storeUser.getState().csrf;
      const req = await axClient.put(CONFIG.apiAdmErr.get, {
        id: id + "",
        csrf,
      });
      const data = req.data as tRes<{ data: tAdmErr[] }>;
      let errDb = data.body.data;
      errDb.sort((a, b) => (isGreater(b.id, a.id) ? 1 : -1));

      set({
        lists: errDb.map((ad) => ({
          ...ad,
          updated_at: getDefaultDate(ad.updated_at),
        })),
      });
    },
    "loadingList",
  ),
  flush: zusThunk(set, async (before) => {
    const csrf = storeUser.getState().csrf;
    await axClient.put(CONFIG.apiAdmErr.flush, {
      updated_at: before,
      csrf,
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
