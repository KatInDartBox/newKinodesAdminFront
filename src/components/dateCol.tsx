import { format as formatFn } from "date-fns/format";
import { HTMLProps } from "react";

type tProps = {
  date: string | Date;
  className?: string;
} & HTMLProps<HTMLDivElement>;

export default function DateCol({ date, className = "", ...others }: tProps) {
  date = new Date(date);

  return (
    <div
      {...others}
      className={
        "w-16 h-16 shadow-me-black shadow-sm flex flex-col rounded-md text-center bg-me-blue py-1 " +
        `${className}`
      }
    >
      <div className="text-xss text-gray-400">
        {getFormat(date, "MMM yyyy")}
      </div>
      <div className="text-xl">{getFormat(date, "do")}</div>
      <div className="text-xss text-gray-400">{getFormat(date, "HH:mm")}</div>
    </div>
  );
}

export function getFormat(date: string | Date, format: string) {
  return formatFn(new Date(date), format);
}
