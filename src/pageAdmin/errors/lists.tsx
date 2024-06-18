import DateCol from "@/src/components/dateCol";
import Modal from "@/src/components/modal";
import IconRight from "@mui/icons-material/ChevronRight";
import IconFlush from "@mui/icons-material/EventBusy";
import IconButton from "@mui/material/IconButton";
import { useEffect, useState } from "react";
import Wrapper from "../../components/wrapper";
import { useInitUser } from "../store";
import { Flush } from "./flush";
import AdmErrForm from "./form";
import { admErrStore, tAdmErr } from "./store";
import { filePath, pkName } from "./utils";

const defaultOpen = {
  view: false,
  flush: false,
};
export default function Errors() {
  const [open, setOpen] = useState(defaultOpen);
  const { setCurrent, lists, setLists } = admErrStore();
  const csrf = useInitUser();
  const handleView = (admErr: tAdmErr) => {
    // console.log("current: ", admErr);
    setCurrent(admErr);
    setOpen({ ...defaultOpen, view: true });
    // console.log("open: ", open);
  };
  const handlePageChange = async () => {
    await setLists();
  };

  useEffect(() => {
    if (!!csrf) {
      setLists();
    }
  }, [csrf]);

  return (
    <>
      <Wrapper
        className="h-full w-full overflow-y-auto"
        Header={
          <>
            <h1 className="text-base">Errors</h1>

            <div />
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
                        <h2 className="text-base">{pkName(ls.func)}</h2>
                        <p className="text-xs">
                          {ls.method + " : " + filePath(ls.file)}
                        </p>
                        <p className="text-xss">{"ip: " + ls.ip}</p>
                        <p className="text-xss">{"id: " + ls.id}</p>
                      </div>
                    </div>
                  </li>
                ))
              )}
            </ul>
          </>
        }
        Footer={
          <>
            <div />
            <IconButton onClick={handlePageChange} size="small">
              <IconRight />
            </IconButton>
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
