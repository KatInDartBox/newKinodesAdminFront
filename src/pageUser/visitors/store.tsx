import CONFIG from "@/src/config";
import { storeUser } from "@/src/pageUser/store";
import { getDefaultDate } from "@/src/utils/date/getDefault";
import { isGreater } from "@/src/utils/number/big";
import { axClient, tRes } from "@/src/utils/req/axiosClient";
import { zusThunk } from "@/src/utils/zustand/zusthunk";
import { create } from "zustand";

type tAdmHeader = {
  Method: string[];
  Cookie: string[];
  Origin: string[];
  URL: string[];
};
export type tAdmLog = {
  id: string;
  attempts: number;
  ip: string;
  header: tAdmHeader;
  updated_at: Date;
};

type tAdmLogStore = {
  loading: boolean;
  loadingList: boolean;
  current?: tAdmLog;
  lists: tAdmLog[];
};
type tAdmLogAction = {
  setCurrent: (adm?: tAdmLog) => void;
  setLists: (id: number) => Promise<void>;
  flush: (before: Date) => Promise<void>;
};

export const visitorStore = create<tAdmLogStore & tAdmLogAction>((set, _) => ({
  loading: false,
  loadingList: false,
  current: undefined,
  lists: [],
  setCurrent: (log) => {
    set({
      current: log,
    });
  },
  setLists: zusThunk(
    set,
    async (id) => {
      const csrf = storeUser.getState().csrf;
      const req = await axClient.put(CONFIG.apiAdmLog.get, {
        id: id + "",
        csrf,
      });
      const data = req.data as tRes<{ data: tAdmLog[] }>;
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
    await axClient.put(CONFIG.apiAdmLog.flush, {
      updated_at: before,
      csrf,
    });
  }),
}));
