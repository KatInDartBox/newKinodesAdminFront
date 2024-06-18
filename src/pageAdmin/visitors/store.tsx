import CONFIG from "@/src/config";
import { storeUser } from "@/src/pageAdmin/store";
import { getDefaultDate } from "@/src/utils/date/getDefault";
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
  setLists: () => Promise<void>;
  flush: (before: Date) => Promise<void>;
};

export const visitorStore = create<tAdmLogStore & tAdmLogAction>(
  (set, get) => ({
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
      async () => {
        const pre = get().lists;
        const last = pre[pre.length - 1];
        const lastId = last?.id || "1";

        const csrf = storeUser.getState().csrf;
        const req = await axClient.put(CONFIG.apiAdmLog.get, {
          id: lastId + "",
          csrf,
        });
        const data = req.data as tRes<{ data: tAdmLog[] }>;
        const newLists = data.body.data.map((ad) => ({
          ...ad,
          updated_at: getDefaultDate(ad.updated_at),
        }));
        const lists = pre.concat(newLists);

        // errDb is sorted desc by the server
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
      await axClient.put(CONFIG.apiAdmLog.flush, {
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
  }),
);
