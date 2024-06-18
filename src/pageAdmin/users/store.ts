import CONFIG from "@/src/config";
import { storeUser } from "@/src/pageAdmin/store";
import { getDefaultDate } from "@/src/utils/date/getDefault";
import { axClient, tRes } from "@/src/utils/req/axiosClient";
import { zusThunk } from "@/src/utils/zustand/zusthunk";
import { create } from "zustand";

export type tUserCompany = {
  id: string;
  role: string;
  actions: string;
  name: string;
  address: string;
  phone_no: string;
  other: string;
  photo_url: string;
  updated_at: Date;
};

export type tAdmUser = {
  id: string;
  name: string;
  user_name: string;
  gender: string;
  about_me: string;
  email: string;
  email_verified: boolean;
  photo_url: string;
  updated_at: Date;
};

type tAdmUserStore = {
  loading: boolean;
  loadingList: boolean;
  current?: tAdmUser;
  lists: tAdmUser[];
  companies: tUserCompany[];
};
type tAdmUserAction = {
  setCurrent: (adm?: tAdmUser) => void;
  setLists: () => Promise<void>;
  setCompanies: (userId: string) => Promise<void>;
};

export const admUserStore = create<tAdmUserStore & tAdmUserAction>(
  (set, get) => ({
    loading: false,
    loadingList: false,
    current: undefined,
    companies: [],
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
        const req = await axClient.put(CONFIG.apiAdmUser.get, {
          id: lastId + "",
          csrf,
        });
        const data = req.data as tRes<{ data: tAdmUser[] }>;
        const newLists = data.body.data.map((ad) => ({
          ...ad,
          photo_url: CONFIG.apiPhoto + ad.photo_url,
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

    setCompanies: zusThunk(set, async (user_id) => {
      const csrf = storeUser.getState().csrf;
      const req = await axClient.put(CONFIG.apiAdmUser.companies, {
        csrf,
        user_id,
      });
      const data = req.data as tRes<{ data: tUserCompany[] }>;
      const companies = data.body.data.map((cm) => ({
        ...cm,
        updated_at: getDefaultDate(cm.updated_at),
        photo_url: CONFIG.apiPhoto + cm.photo_url,
      }));

      set({
        companies,
      });
    }),
  }),
);
