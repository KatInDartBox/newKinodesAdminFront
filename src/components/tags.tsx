import config from "@/src/config";
import { cssColor } from "@/src/mui/color";
import IconX from "@mui/icons-material/Cancel";
import IconAdd from "@mui/icons-material/LibraryAdd";
import { Tooltip } from "@mui/material";
import TextField, { TextFieldProps } from "@mui/material/TextField";
import { forwardRef, useRef, useState } from "react";

type tProps = {
  value?: string;
  onChange?: (e: { target: { value: string } }) => void;
  name?: string;
  addTagOnEnter?: boolean;
  tagDelimiter?: string;
  errMsg?: string;
  wrapperClassName?: string;
} & TextFieldProps;
/**
 * @description value string separate by ,
 *
 * @returns
 */
const Tags = forwardRef<HTMLDivElement, tProps>(function (
  {
    value = "",
    onChange,
    name = "",
    addTagOnEnter = true,
    tagDelimiter = ",",
    errMsg = "",
    wrapperClassName = "",
    ...others
  },
  ref,
) {
  const inputElm = useRef<HTMLDivElement>(null);
  const [input, setInput] = useState("");
  const [chips, setChips] = useState<string[]>(getChips(value, tagDelimiter));

  const goodChip = () => getCleanText(input, tagDelimiter).length >= 3;

  const _onChange = (_chips: string[]) => {
    if (typeof onChange === "function") {
      onChange({ target: { value: _chips.join(tagDelimiter) } });
    }
  };
  const handleAddChip = () => {
    const cleanTxt = getCleanText(input, tagDelimiter);
    const isExisted = chips.includes(cleanTxt);
    if (!isExisted) {
      const newChips = chips.concat([cleanTxt]);
      setChips(newChips);
      _onChange(newChips);
    }
    setInput("");
    inputElm.current?.focus();
  };
  const handleDelete = (txt: string) => {
    const newChips = chips.filter((preChip) => preChip !== txt);
    setChips(newChips);
    _onChange(newChips);
  };

  return (
    <div className={wrapperClassName}>
      <div className="flex items-center w-full relative">
        <TextField
          {...others}
          autoComplete="off"
          ref={ref}
          onKeyUp={(e) => {
            if (!addTagOnEnter) return;
            const k = e.key;
            if (k === "Enter") {
              handleAddChip();
            }
          }}
          name={name}
          inputRef={inputElm}
          color="info"
          value={input}
          onChange={(e) => {
            setInput(e.target.value);
          }}
          variant="standard"
          inputProps={{ className: "!pl-2 !pr-7 " }}
          className="w-full"
        />

        <Tooltip title="add tag">
          <span
            onClick={handleAddChip}
            className="absolute right-0 flex items-center justify-center"
          >
            <IconAdd
              fontSize="small"
              style={{
                width: 16,
                height: 16,
                color: `${!goodChip() ? cssColor.disabled : ""}`,
              }}
              className={`${
                goodChip() ? "cursor-pointer" : "pointer-events-none"
              }`}
            />
          </span>
        </Tooltip>
      </div>
      {!!others.error && (
        <div className="text-right">
          <span className="text-xs text-me-gold">{errMsg}</span>
        </div>
      )}
      {chips.length > 0 && (
        <div className="flex items-center flex-wrap w-full my-2">
          {chips.map((tag) => {
            return (
              <div
                key={tag}
                className="flex items-center mr-2 border border-me-white rounded-e-full rounded-s-full border-solid px-2"
              >
                <div className="mr-1 text-sm">{tag}</div>
                <IconX
                  style={{
                    width: 12,
                    height: 12,
                  }}
                  onClick={() => handleDelete(tag)}
                  className="cursor-pointer"
                />
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
});

export default Tags;

function getChips(txt: string, delimiter: string) {
  if (!txt) return [];
  return txt.split(delimiter);
}

function getCleanText(txt: string, delimiter: string = "") {
  let dirty = config.dirtyTxt;
  if (!dirty.includes(delimiter)) dirty += delimiter;
  const reg = new RegExp(`[${dirty}]`, "gi");
  return txt.replaceAll(reg, "").toLowerCase();
}
