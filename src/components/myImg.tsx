import { HtmlHTMLAttributes } from "react";

type tProps = {
  size?: string | number;
  width?: string | number;
  height?: string | number;
  src: string;
  alt: string;
  className?: string;
  imgClassName?: string;
} & HtmlHTMLAttributes<HTMLDivElement>;
export default function MyImage({
  size = 24,
  width,
  height,
  src,
  alt,
  className = "",
  imgClassName = "",
  ...others
}: tProps) {
  width = width || size;
  height = height || size;
  // console.log({ width, height, size });
  return (
    <div
      style={{
        width,
        height,
        ...others.style,
      }}
      className={`flex items-center justify-center ${className}`}
    >
      <img
        className={`w-full h-auto ${imgClassName}`} //
        src={src || ""}
        alt={alt}
      />
    </div>
  );
}
