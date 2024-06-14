import CONFIG from "@/src/config";
import { deleteCol, updateCol } from "@/src/utils/array/collection";
import { getDefaultDate } from "@/src/utils/date/getDefault";
import { isGreater } from "@/src/utils/number/big";
import { axClient, tRes } from "@/src/utils/req/axiosClient";
import { zusThunk } from "@/src/utils/zustand/zusthunk";
import { create } from "zustand";
import { storeUser } from "../store";

export type tAds = {
  id: string;
  img_url: string;
  href: string;
  title: string;
  desc: string;
  tags: string;
  updated_at: Date;
};

// const defaultAds: tAds = {
//   id: "",
//   img_url: "",
//   href: "",
//   title: "",
//   desc: "",
//   tags: "",
//   updated_at: new Date(),
// };

type tAdsStore = {
  loading: boolean;
  loadingList: boolean;
  current?: tAds;
  lists: tAds[];
};
type tAdsAction = {
  setCurrent: (ads?: tAds) => void;
  setLists: () => Promise<void>;
  add: (ads: tAds) => Promise<void>;
  update: (ads: tAds) => Promise<void>;
  remove: (id: string) => Promise<void>;
};

export const adsStore = create<tAdsStore & tAdsAction>((set, get) => ({
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
      const req = await axClient.get(CONFIG.apiAds.get);
      const data = req.data as tRes<{ ads: tAds[] }>;
      let ads = data.body.ads;
      ads.sort((a, b) => (isGreater(b.id, a.id) ? 1 : -1));

      set({
        lists: ads.map((ad) => ({
          ...ad,
          updated_at: getDefaultDate(ad.updated_at),
        })),
      });
    },
    "loadingList",
  ),
  remove: zusThunk(set, async (id) => {
    const preLists = get().lists;
    const csrf = storeUser.getState().csrf;
    await axClient.put(CONFIG.apiAds.remove, {
      id,
      csrf,
    });
    set({
      lists: deleteCol(preLists, (itm) => itm.id === id),
    });
  }),
  add: zusThunk(set, async (ads) => {
    const csrf = storeUser.getState().csrf;
    const preLists = get().lists;
    const req = await axClient.put(CONFIG.apiAds.add, {
      ...ads,
      csrf,
    });
    const data = req.data as tRes<{ id: string }>;
    const id = data.body.id;
    set({
      lists: [
        {
          ...ads,
          id,
        },
      ].concat(preLists),
    });
  }),
  update: zusThunk(set, async (ads) => {
    const csrf = storeUser.getState().csrf;
    const preLists = get().lists;
    await axClient.put(CONFIG.apiAds.update, {
      ...ads,
      csrf,
    });
    set({
      lists: updateCol(preLists, ads, (itm) => itm.id === ads.id),
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
