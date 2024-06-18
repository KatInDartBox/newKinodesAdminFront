import MyImage from "@/src/components/myImg";
import { format } from "date-fns/format";
import { admUserStore } from "./store";

export default function AdmUserForm() {
  const { current, companies } = admUserStore();

  // if (!current) return <>{current}</>;

  // console.log("adm err form: ", current);

  return (
    <div>
      <pre>{JSON.stringify(current, null, 2)}</pre>
      <ul>
        {companies.map((ls) => (
          <li
            style={{
              borderBottom: "1px solid grey",
            }}
            key={ls.id}
            className="cursor-pointer px-3 py-2 flex justify-between items-center w-full hover:bg-me-gray"
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
                <h2 className="text-base text-me-gold uppercase">{ls.name}</h2>
                <p className="text-xs">{ls.id}</p>
                <p className="text-xss">
                  {ls.role + ": " + format(ls.updated_at, "yyyy-MM-dd")}
                </p>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
