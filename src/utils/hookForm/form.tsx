import { Children, cloneElement } from "react";
import { Control, FieldValues, FormState } from "react-hook-form"
import { tPropsInputForm } from "./inputForm";


type tChild<T extends FieldValues> = React.ReactElement<tPropsInputForm<T>>
type tProps<T extends FieldValues> = {
  formState: FormState<T>;
  control: Control<T>;
  col?: boolean;
  children: tChild<T> | tChild<T>[];
  className?: string;
}
export function Form<T extends FieldValues>({ className = "", formState, control, col, children }: tProps<T>) {

  const childArr = Children.toArray(children)

  return <div className={className}>
    {Children.map(childArr, child => {
      if (col !== undefined) {
        return cloneElement(child as tChild<T>, {
          control,
          formState,
          col
        })
      }
      return cloneElement(child as tChild<T>, {
        control,
        formState
      })
    })}
  </div>

}