import isEmpty from "lodash/isEmpty";
import isObject from "lodash/isObjectLike";
import { FieldValues, FormState } from "react-hook-form";
import {
    ArraySchema,
    ObjectSchema,
    ValidateOptions,
    ValidationError
} from "yup";

export function getFieldErr<T extends FieldValues>(
  formState?: FormState<T>,
  field?: string,
): string {
  if (!formState?.isDirty) return "";

  return (formState?.errors[field || ""]?.message as string) || "";
}

export function getFormObjErrs<T extends FieldValues>(
  formState: FormState<T>,
): string[] {
  const errors = formState.errors;
  const r: string[] = [];
  Object.keys(errors).forEach((key) => {
    const value = errors[key];
    if (!!value && !Array.isArray(value) && isObject(value)) {
      //@ts-ignore
      const msg = (value[key]?.message || "") as string;
      r.push(msg);
    }
  });
  return r;
}

export function getErrorFromFieldArray(
  schema: ArraySchema<Object[] | undefined, Object, "", "">,
  value: any,
  opt?: ValidateOptions<Object>,
) {
  let r: string[] = [];
  if (!opt) opt = {};

  try {
    const _ = schema.validateSync(value, {
      strict: false,
      abortEarly: false,
      ...opt,
    });
  } catch (err) {
    const errors = err as ValidationError;
    const inner = errors.inner || [];

    const errObj: { [key: string]: 1 } = {};
    const errArr: string[] = [];

    inner.forEach((err) => {
      const msg = err?.message || "";
      const errPath = err?.path || ".";
      const path = errPath.split(".")[1];
      if (!!path) {
        if (errObj[path] !== 1) {
          errObj[path] = 1;
          errArr.push(msg);
        }
      }
    });

    r = errArr;
  }
  return r;

  // const r: string[] = [];
  // const obj: { [key: string]: 1 } = {};
  // errArr.forEach((err) => {
  //   if (!!err) {
  //     Object.keys(err).forEach((key) => {
  //       const value = err[key];
  //       if (obj[key] !== 1) {
  //         r.push(value?.message || "");
  //         obj[key] = 1;
  //       }
  //     });
  //   }
  // });
  // return r;
}

export function isFormErrFromErrors<T extends FieldValues>(
  formState: FormState<T>,
) {
  const errors = formState.errors;
  // console.log("is form err: ", formState, errors);
  return formState.isDirty && !isEmpty(errors);
}

export function isFormErr<T extends FieldValues>(formState: FormState<T>) {
  return !(formState.isValid && formState.isDirty);
}

export function getFormValidation<T extends Object>(
  schema: ObjectSchema<T>,
  formValue: any,
) {
  try {
    // console.log("validate form value", formValue);
    const v = schema.validateSync(formValue);
    // console.log("validate v", v);
    return true;
  } catch (error) {
    // console.log("validate error", error);

    return false;
  }
}
