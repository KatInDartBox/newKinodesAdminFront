import Search from "@/src/components/search";
import AddIcon from "@mui/icons-material/Add";
import IconButton from "@mui/material/IconButton";
import Wrapper from "../../components/wrapper";

export default function Errors() {
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
        <IconButton disabled>
          <AddIcon />
        </IconButton>
      </div>

      <ul>
        <li>error</li>
      </ul>
    </Wrapper>
  );
}
