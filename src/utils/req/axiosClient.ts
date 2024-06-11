import config from "@/src/config";
import axios from "axios";
import { sanitize } from "./sanitize";

export type tRes<T> = {
  is_success: boolean;
  body: T;
  msg: string;
};

export const axClient = axios.create({
  timeout: 10000,

  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  withCredentials: true, //to pass cookie if any

  transformRequest: function (data, headers) {
    // measure request & response time
    if (!config.isProd) {
      // @ts-ignore
      this.meta = this.meta || {};
      // @ts-ignore
      this.meta.requestStartedAt = new Date().getTime();
    }

    if (headers["Content-Type"]?.toString() !== "application/json") return data;
    return JSON.stringify(data);
  },
  transformResponse: function (data, headers, status) {
    // if (!localEnv.isProd) {
    //   const size = `${round(JSON.stringify(data).length / 1e3)} Kb`;

    //   // @ts-ignore
    //   const time = `${new Date().getTime() - this?.meta?.requestStartedAt || 0} ms`;
    //   // data is whatever server resp as string
    //   // console.log(`respond data`, { data, status, size, time });
    // }

    if (!!data) {
      //the attempt to globalize number to bing num,
      //is gonna prom to have bug
      data = JSON.parse(data);
      return sanitize(data);
    }
  },
});
