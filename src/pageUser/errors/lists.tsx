import DateCol from "@/src/components/dateCol";
import Modal from "@/src/components/modal";
import Search from "@/src/components/search";
import IconFlush from "@mui/icons-material/EventBusy";
import IconButton from "@mui/material/IconButton";
import { useEffect, useState } from "react";
import Wrapper from "../../components/wrapper";
import { useInitUser } from "../store";
import AdmErrForm from "./form";
import { admErrStore, tAdmErr } from "./store";

const defaultOpen = {
  view: false,
};
export default function Errors() {
  const [open, setOpen] = useState(defaultOpen);
  const { setCurrent, lists, setLists } = admErrStore();
  const { csrf } = useInitUser();
  const handleView = (admErr: tAdmErr) => {
    setCurrent(admErr);
    setOpen({ ...defaultOpen, view: true });
  };

  useEffect(() => {
    if (csrf) {
      setLists(0);
    }
  }, [csrf]);

  return (
    <Wrapper className="h-full w-full overflow-y-auto">
      {/* header  */}
      <div className="flex items-center justify-between px-3">
        <h1 className="text-base">Errors</h1>

        <Search
          onSearch={(str) => console.log("search: ", str)}
          onClear={() => {
            console.log("clear: ");
          }}
        />
        <IconButton>
          <IconFlush />
        </IconButton>
      </div>

      <ul>
        {lists.map((ls) => (
          <li
            style={{
              borderBottom: "1px solid grey",
            }}
            key={ls.id}
            className="cursor-pointer px-3 py-2 flex justify-between items-center w-full hover:bg-me-gray"
            onClick={() => handleView(ls)}
          >
            <div className="flex">
              <DateCol className="mr-2" date={ls.updated_at} />
              <div className="flex flex-col">
                <h2 className="text-base">{ls.func}</h2>
                <p className="text-xs">{ls.file}</p>
                <p className="text-xss">{ls.id}</p>
              </div>
            </div>
          </li>
        ))}
      </ul>
      <Modal
        open={open.view}
        onClose={() => setOpen({ ...defaultOpen })}
        title="Err"
        width="xl"
        Content={<AdmErrForm />}
      />
    </Wrapper>
  );
}
