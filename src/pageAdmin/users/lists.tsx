import Modal from "@/src/components/modal";
import MyImage from "@/src/components/myImg";
import Wrapper from "@/src/components/wrapper";
import { useInitUser } from "@/src/pageAdmin/store";
import IconRight from "@mui/icons-material/ChevronRight";
import IconButton from "@mui/material/IconButton";
import { format } from "date-fns/format";
import { useEffect, useState } from "react";
import AdmUserForm from "./form";
import { admUserStore, tAdmUser } from "./store";
import { counterStore } from "./storeCounter";

const defaultOpen = {
  view: false,
};
export default function UserLists() {
  const [open, setOpen] = useState(defaultOpen);
  const csrf = useInitUser();
  const handlePageChange = async () => {
    await setLists();
  };
  const { users: noUser, companys: noCompany, setCounter } = counterStore();
  const { lists, setLists, setCurrent, setCompanies } = admUserStore();

  const handleView = async (ls: tAdmUser) => {
    setCurrent(ls);
    await setCompanies(ls.id);
    setOpen({ ...defaultOpen, view: true });
  };
  useEffect(() => {
    if (!!csrf) {
      setCounter();
      setLists();
    }
  }, [csrf]);

  return (
    <>
      <Wrapper
        className="h-full w-full overflow-y-auto"
        Header={
          <>
            <h2 className="text-base">Users: {noUser}</h2>
            <h2 className="text-base">Companies: {noCompany}</h2>
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
                      <MyImage
                        className="mr-2"
                        style={{
                          border: "1px solid grey",
                          borderRadius: "4px",
                        }}
                        src={ls.photo_url}
                        alt={ls.name}
                        size={54}
                      />
                      <div className="flex flex-col">
                        <h2 className="text-base text-me-gold uppercase">
                          {ls.name}
                        </h2>
                        <p className="text-xs">{ls.id}</p>
                        <p className="text-xss">
                          {format(ls.updated_at, "yyyy-MM-dd")}
                        </p>
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
        width="lg"
        open={open.view}
        onClose={() => setOpen({ ...defaultOpen })}
        title="User"
        Content={<AdmUserForm />}
      />
    </>
  );
}
