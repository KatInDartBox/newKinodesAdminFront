import DateCol from "@/src/components/dateCol";
import Modal from "@/src/components/modal";
import Search from "@/src/components/search";
import Wrapper from "@/src/components/wrapper";
import { useInitUser } from "@/src/pageUser/store";
import IconFlush from "@mui/icons-material/EventBusy";
import IconButton from "@mui/material/IconButton";
import { useEffect, useState } from "react";
import { Flush } from "./flush";
import AdmErrForm from "./form";
import { tAdmLog, visitorStore } from "./store";

const defaultOpen = {
  view: false,
  flush: false,
};
export default function Visitors() {
  const [open, setOpen] = useState(defaultOpen);
  const { setCurrent, lists, setLists } = visitorStore();
  const csrf = useInitUser();
  const handleView = (admErr: tAdmLog) => {
    // console.log("current: ", admErr);
    setCurrent(admErr);
    setOpen({ ...defaultOpen, view: true });
    // console.log("open: ", open);
  };

  useEffect(() => {
    if (!!csrf) {
      setLists(0);
    }
  }, [csrf]);

  return (
    <>
      <Wrapper
        className="h-full w-full overflow-y-auto"
        Header={
          <>
            <h1 className="text-base">Visitors</h1>

            <Search
              onSearch={(str) => console.log("search: ", str)}
              onClear={() => {
                console.log("clear: ");
              }}
            />
            <IconButton
              onClick={() => setOpen({ ...defaultOpen, flush: true })}
            >
              <IconFlush />
            </IconButton>
          </>
        }
        Body={
          <>
            <ul>
              {!csrf ? (
                <li>loading</li>
              ) : (
                lists.map((ls) => (
                  <li
                    style={{
                      borderBottom: "1px solid grey",
                    }}
                    key={ls.id}
                    className="cursor-pointer px-3 py-2 flex justify-between items-center w-full hover:bg-me-gray"
                    onClick={() => handleView(ls)}
                  >
                    <div className="flex items-center">
                      <DateCol className="mr-2" date={ls.updated_at} />
                      <div className="flex flex-col">
                        <h2 className="text-base">{ls.ip}</h2>
                        <p className="text-xs">
                          {ls.header.Method[0] + " : " + ls.header.URL[0]}
                        </p>
                        <p className="text-xss">{"atm: " + ls.attempts}</p>
                        <p className="text-xss">{"id: " + ls.id}</p>
                      </div>
                    </div>
                  </li>
                ))
              )}
            </ul>
          </>
        }
      ></Wrapper>

      <Modal
        open={open.flush}
        onClose={() => setOpen({ ...defaultOpen })}
        title="Flush Error"
        width="sm"
        Content={<Flush onClose={() => setOpen({ ...defaultOpen })} />}
      />
      <Modal
        open={open.view}
        onClose={() => setOpen({ ...defaultOpen })}
        title="Error"
        width="xl"
        Content={<AdmErrForm />}
      />
    </>
  );
}
