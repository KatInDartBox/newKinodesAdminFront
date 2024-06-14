import {
  Controller,
  Control,
  FieldValues,
  Path,
  FormState,
  UseFormTrigger,
} from "react-hook-form";
import startCase from "lodash/startCase";
import { getFieldErr } from "./errors";
import { ReactNode } from "react";
import Tags from "@/src/components/tags";

import { TextFieldProps } from "@mui/material";
// import useIsMobile from "../hooks/useIsMobile";

export type tPropsSelectForm<T extends FieldValues> = {
  control?: Control<T, any>;
  labelWidth?: string;
  labelName?: ReactNode;
  name: Path<T>;
  wrapperClassName?: string;
  req?: boolean;
  formState?: FormState<T>;
  col?: boolean;
  hideLabel?: boolean;
  trigger: UseFormTrigger<T>;
} & TextFieldProps;

export default function TagForm<T extends FieldValues>({
  name,
  control,
  labelWidth = "128px",
  labelName = "",
  wrapperClassName = "",
  col,
  req = false,
  formState,
  hideLabel = false,
  trigger,
  ...other
}: tPropsSelectForm<T>) {
  if (!labelName) {
    labelName = startCase(name);
    if (req) labelName += "*";
  }

  if (!wrapperClassName) wrapperClassName = "mb-3";

  return (
    <>
      <Controller
        name={name}
        control={control}
        render={({ field }) => {
          return (
            <div className={wrapperClassName}>
              <div
                className={`flex flex-col items-start ${
                  !col ? "md:flex-row  md:items-center md:justify-between" : ""
                }`}
              >
                {!hideLabel && (
                  <label style={{ width: labelWidth }}>{labelName}</label>
                )}
                <Tags
                  {...other}
                  {...field}
                  wrapperClassName="w-full"
                  placeholder="press enter to add tags"
                  onChange={(e) => {
                    field.onChange(e.target.value);
                    trigger(name);
                  }}
                  error={!!getFieldErr(formState, name)}
                  errMsg={getFieldErr(formState, name)}
                />
                {/*    
                 
                */}
              </div>
            </div>
          );
        }}
      />
    </>
  );
}
