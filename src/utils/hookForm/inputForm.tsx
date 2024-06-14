import {
  Controller,
  Control,
  FieldValues,
  Path,
  FormState,
} from "react-hook-form";
import MuiInput, { InputProps } from "@mui/material/Input";
import startCase from "lodash/startCase";
import { getFieldErr } from "./errors";
import get from "lodash/get";
import debounce from "lodash/debounce";
import {
  CSSProperties,
  FormEvent,
  forwardRef,
  ReactNode,
  Ref,
  useId,
} from "react";

// import { TextField, TextFieldProps } from "@mui/material";
// import useIsMobile from "../hooks/useIsMobile";

export type tPropsInputForm<T extends FieldValues> = {
  control?: Control<T, any>;
  labelWidth?: string;
  labelName?: ReactNode;
  name: Path<T>;
  wrapperClassName?: string;
  wrapperStyle?: CSSProperties;
  req?: boolean;
  formState?: FormState<T>;
  col?: boolean;
  onSearching?: (input: string) => void;
  hideLabel?: boolean;
  hideErr?: boolean;
} & InputProps;

export default function InputForm<T extends FieldValues>({
  name,
  control,
  labelWidth = "128px",
  labelName = "",
  wrapperClassName = "",
  wrapperStyle = {},
  req = false,
  formState,
  onSearching = () => {},
  hideLabel = false,
  hideErr = false,
  ...other
}: tPropsInputForm<T>) {
  if (!labelName) {
    labelName = startCase(name);
    if (req) labelName += "*";
  }
  if (wrapperClassName === "") wrapperClassName = "mb-3";

  const handleSearch = debounce(onSearching, 1200, { trailing: true });
  return (
    <>
      <Controller
        name={name}
        control={control}
        render={({ field }) => {
          return (
            <div style={wrapperStyle} className={wrapperClassName}>
              <LabelInput_
                hideLabel={hideLabel}
                labelName={labelName}
                labelWidth={labelWidth}
                onInput={(e: FormEvent<InnerHTML>) => {
                  handleSearch(get(e, "target.value", ""));
                }}
                {...other}
                {...field}
                error={!!getFieldErr(formState, name)}
              />
              <div className="text-me-gold text-xs text-end">
                {!hideErr && getFieldErr(formState, name)}
              </div>
            </div>
          );
        }}
      />
    </>
  );
}

type tLabelInput = {
  labelWidth?: string;
  labelName?: ReactNode;
  formState?: any;
  hideLabel?: boolean;
  fullWidthInput?: boolean;
  col?: boolean;
} & InputProps;

const LabelInput_ = forwardRef(function (
  {
    labelWidth = "128px",
    labelName = "",
    formState,
    hideLabel = false,
    fullWidthInput = true,
    col,
    ...others
  }: tLabelInput,
  ref: Ref<HTMLDivElement>,
) {
  const inputCls = `${fullWidthInput ? "w-full" : ""} ${
    others.disabled ? "pointer-events-none" : ""
  }`;
  const inputId = useId();

  return (
    <div
      className={`flex flex-col w-full ${
        col ? "" : " md:items-center md:justify-between md:flex-row "
      } `}
    >
      {!hideLabel && (
        <label htmlFor={inputId} style={{ width: col ? "100%" : labelWidth }}>
          {labelName}
        </label>
      )}
      <MuiInput
        id={inputId}
        type="text"
        fullWidth
        color="info"
        className={inputCls}
        inputProps={{
          className: "px-2",
        }}
        autoComplete="off" //
        ref={ref}
        {...others}
        disabled={false}
      />
    </div>
  );
});

export const LabelInput = LabelInput_;
