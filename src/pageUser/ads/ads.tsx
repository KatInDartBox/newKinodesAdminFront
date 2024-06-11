import Modal from "@/src/components/modal";
import ModalConfirmByClick from "@/src/components/modalConfirmByClick";
import AddIcon from "@mui/icons-material/Add";
import EditNoteIcon from "@mui/icons-material/EditNote";
import DeleteIcon from "@mui/icons-material/Remove";
import IconButton from "@mui/material/IconButton";
import Input from "@mui/material/Input";
import { useState } from "react";
import Wrapper from "../../components/wrapper";
import { useInitUser } from "../store";
import AddAds from "./add";
import EditAds from "./edit";
import { ExAds } from "./store";

const defaultOpen = {
  add: false,
  edit: false,
  del: false,
};
export default function Ads() {
  const data = ExAds;
  const [open, setOpen] = useState(defaultOpen);
  const handleDelete = () => {
    setOpen({ ...defaultOpen });
  };

  useInitUser();

  return (
    <Wrapper className="h-full w-full overflow-y-auto">
      <div className="flex items-center justify-between px-3">
        <h1 className="text-base">Ads</h1>
        <Input
          style={{
            maxWidth: "450px",
          }}
          className="w-full"
          inputProps={{
            className: "!px-2 ",
          }}
          placeholder="search"
          color="info"
        />
        <IconButton onClick={() => setOpen({ ...defaultOpen, add: true })}>
          <AddIcon />
        </IconButton>
      </div>
      <ul>
        <li>
          {data.map((ad) => (
            <div
              style={{
                borderBottom: "1px solid grey",
              }}
              key={ad.id}
              className="px-3 flex justify-between items-center w-full hover:bg-me-gray"
            >
              <h2 className="text-base">{ad.title}</h2>
              <div className="flex items-center">
                <IconButton
                  size="small"
                  onClick={() => setOpen({ ...defaultOpen, del: true })}
                >
                  <DeleteIcon />
                </IconButton>
                <IconButton
                  size="small"
                  onClick={() => setOpen({ ...defaultOpen, edit: true })}
                >
                  <EditNoteIcon />
                </IconButton>
              </div>
            </div>
          ))}
        </li>
      </ul>
      <Modal
        open={open.add}
        title="Add"
        onClose={() => setOpen({ ...defaultOpen })}
        Content={<AddAds />}
      />
      <Modal
        open={open.edit}
        title="Edit"
        onClose={() => setOpen({ ...defaultOpen })}
        Content={<EditAds />}
      />
      <ModalConfirmByClick
        open={open.del}
        title="To Delete"
        onClose={() => setOpen({ ...defaultOpen })}
        onConfirm={handleDelete}
      />
    </Wrapper>
  );
}
