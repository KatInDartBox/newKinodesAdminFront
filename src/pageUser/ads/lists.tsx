import Modal from "@/src/components/modal";
import ModalConfirmByClick from "@/src/components/modalConfirmByClick";
import Search from "@/src/components/search";
import AddIcon from "@mui/icons-material/Add";
import EditNoteIcon from "@mui/icons-material/EditNote";
import DeleteIcon from "@mui/icons-material/Remove";
import IconButton from "@mui/material/IconButton";
import { useEffect, useState } from "react";
import Wrapper from "../../components/wrapper";
import { useInitUser } from "../store";
import AddAds from "./form";
import { adsStore, tAds } from "./store";

const defaultOpen = {
  add: false,
  edit: false,
  del: false,
  search: false,
};
export default function Ads() {
  const { remove, loading, setLists, current, setCurrent, lists, loadingList } =
    adsStore();

  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(defaultOpen);

  const handleCloseModal = () => {
    setOpen({ ...defaultOpen });
    setCurrent(undefined);
  };

  const handleDelete = async () => {
    if (current?.id) {
      await remove(current?.id);
    }
    handleCloseModal();
  };

  const handleOpenAdd = (ads?: tAds) => {
    setOpen({ ...defaultOpen, add: true });
    setCurrent(ads);
  };

  const handleFilter = (str: string) => {
    // console.log("search: ", str);
    setSearch(str);
    // setOpen({...defaultOpen,search:true})
  };

  const getFilter = () => {
    // if (!open.search) return lists;
    if (!search) return lists;
    return lists.filter((ls) => `${ls.title} ${ls.tags}`.includes(search));
  };

  useEffect(() => {
    setLists();
  }, []);
  useInitUser();

  return (
    <Wrapper className="h-full w-full overflow-y-auto">
      {/* header  */}
      <div className="flex items-center justify-between px-3">
        <h1 className="text-base">Ads</h1>
        <Search
          onSearch={(str) => handleFilter(str)}
          onClear={() => {
            // setOpen({...defaultOpen})
            setSearch("");
          }}
        />
        {/* <Input */}
        {/*   onKeyDown={(e) => { */}
        {/*     // console.log({ key: e.key, search }); */}
        {/*     handleFilter(e.key); */}
        {/*   }} */}
        {/*   onChange={(e) => handleSearchChange(e.target.value)} */}
        {/*   value={search} */}
        {/*   style={{ */}
        {/*     maxWidth: "450px", */}
        {/*   }} */}
        {/*   className="w-full" */}
        {/*   inputProps={{ */}
        {/*     className: "!px-2 ", */}
        {/*   }} */}
        {/*   placeholder="search" */}
        {/*   color="info" */}
        {/* /> */}
        <IconButton onClick={() => handleOpenAdd()}>
          <AddIcon />
        </IconButton>
      </div>

      {loadingList ? (
        <div>loading...</div>
      ) : (
        <ul>
          <li>
            {getFilter().map((ad) => (
              <div
                style={{
                  borderBottom: "1px solid grey",
                }}
                key={ad.id}
                className="px-3 flex justify-between items-center w-full hover:bg-me-gray"
                onClick={() => {
                  handleOpenAdd(ad);
                }}
              >
                <h2 className="text-base">{ad.title}</h2>
                <div className="flex items-center">
                  <IconButton
                    size="small"
                    onClick={(e) => {
                      e.stopPropagation();
                      setCurrent(ad);
                      setOpen({ ...defaultOpen, del: true });
                    }}
                  >
                    <DeleteIcon />
                  </IconButton>
                  <IconButton
                    size="small"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleOpenAdd(ad);
                    }}
                  >
                    <EditNoteIcon />
                  </IconButton>
                </div>
              </div>
            ))}
          </li>
        </ul>
      )}
      <Modal
        open={open.add}
        title="Add"
        onClose={() => handleCloseModal()}
        Content={<AddAds ads={current} onClose={handleCloseModal} />}
      />
      <ModalConfirmByClick
        loading={loading}
        open={open.del}
        title="To Delete"
        onClose={handleCloseModal}
        onConfirm={handleDelete}
      />
    </Wrapper>
  );
}
