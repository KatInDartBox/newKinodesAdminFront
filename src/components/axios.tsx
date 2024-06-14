import config from "@/src/config";
import { axClient, tRes } from "@/src/utils/req/axiosClient";
import { useEffect, useState } from "react";
import { Prompt } from "./toast";

let axiosInterceptRequest: number;
let axiosInterceptResponse: number;
const defaultSnack = {
  open: false,
  message: "",
  isError: false,
};
export default function AxiosHandler() {
  const [snack, setSnack] = useState(defaultSnack);

  useEffect(() => {
    if (!!axiosInterceptRequest || axiosInterceptRequest === 0) {
      axClient.interceptors.request.eject(axiosInterceptRequest);
    }
    if (!!axiosInterceptResponse || axiosInterceptResponse === 0) {
      axClient.interceptors.response.eject(axiosInterceptResponse);
    }

    axiosInterceptRequest = axClient.interceptors.request.use(
      function (config) {
        return config;
      }, //
      function (err) {
        return onError(err);
      },
    );

    axiosInterceptResponse = axClient.interceptors.response.use(
      function (response) {
        const data = (response.data as tRes<any>) || ({} as tRes<any>);

        if (!!data.msg && data.is_success) {
          setSnack({ open: true, message: data.msg, isError: false });
        }

        if (!config.isProd) {
          const size = new Blob([JSON.stringify(data)]).size;
          //@ts-ignore
          const sTime = +(response.config?.meta?.requestStartedAt || "");
          const e = new Date().getTime() - sTime;
          console.log("response : ", {
            size: `${(size / 1024).toFixed(2)}kb`,
            data,
            time: `${e}ms`,
            url: response.request?.responseURL,
          });
        }
        // console.log("intercept response: ", response);

        return response;
      },
      function (err) {
        return onError(err);
      },
    );

    const onError = (err: any) => {
      return new Promise((resolve, reject) => {
        const response = err?.response ? err?.response : err?.request;
        const data = (response.data as tRes<any>) || ({} as tRes<any>);
        const { is_success, body, msg } = data;
        console.log("error res:", response);

        if (!is_success && !!msg) {
          setSnack({
            open: true,
            isError: true,
            message: msg,
          });
        }

        reject(response);
      });
    };
  }, []);

  console.log("add auto snack");

  return (
    <Prompt
      open={snack.open}
      onClose={() => setSnack(defaultSnack)}
      message={snack.message}
      className={snack.isError ? "!bg-me-red" : ""}
    />
  );
}
