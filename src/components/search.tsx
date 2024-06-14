import IconX from "@mui/icons-material/Close";
import IconSearch from "@mui/icons-material/ManageSearch";
import IconLoading from "@mui/icons-material/RotateRight";
import Input from "@mui/material/Input";

import {
    ChangeEventHandler,
    KeyboardEventHandler,
    useRef,
    useState,
} from "react";

type tProps = {
  validInputLen?: number;
  onSearch: (input: string) => void;
  onClear: () => void;
  loading?: boolean;
  placeholder?: string;
  className?: string;
  onChange?: (input: string) => void;
};
export default function Search({
  validInputLen = 2, //
  onSearch,
  onClear,
  loading = false,
  className = "",
  placeholder = "search...",
  onChange = () => {},
}: tProps) {
  const [input, setInput] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const v = e.target.value;
    setInput(v);
    onChange(v);
  };
  const isVal = () => {
    return input.length >= validInputLen;
  };
  const handleClear = () => {
    setInput("");
    inputRef.current?.focus();
    onClear();
  };
  const handleSearch = () => {
    onSearch(input);
  };
  const handleEnter: KeyboardEventHandler<HTMLInputElement> = (e) => {
    const key = e.key;
    if (key === "Enter" && isVal()) {
      handleSearch();
      inputRef.current?.blur();
    }
  };
  // loading = true;
  return (
    <Input
      color="info"
      error={input.length > 0 && !isVal()}
      inputRef={inputRef}
      endAdornment={
        //
        <span className="flex items-center ">
          <IconX
            style={{ width: 16, height: 16 }}
            onClick={handleClear}
            className={`mx-2 cursor-pointer`}
          />
          {loading ? (
            <IconLoading
              style={{ width: 16, height: 16 }}
              className="animate-spin"
            />
          ) : (
            <IconSearch
              style={{ width: 18, height: 18 }}
              onClick={handleSearch}
              className={`${isVal() ? "cursor-pointer" : "text-me-disabled"}`}
            />
          )}
        </span>
      } //
      className={`px-2 ${className} ${
        loading && "pointer-events-none opacity-70"
      }`}
      placeholder={placeholder}
      onChange={handleChange}
      value={input}
      onKeyDown={handleEnter}
    />
  );
}
