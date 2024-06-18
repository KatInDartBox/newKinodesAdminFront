import LoadingBtn from "@/src/components/loadingBtn";
import { isDate } from "@/src/utils/date/isDate";
import { Form } from "@/src/utils/hookForm/form";
import InputForm from "@/src/utils/hookForm/inputForm";
import { yupResolver } from "@hookform/resolvers/yup";
import { addDays } from "date-fns";
import { format } from "date-fns/format";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { object, string } from "yup";
import { admErrStore } from "./store";

type tProps = {
  onClose: () => void;
};
const schema = object({
  date: string().required(),
});

export function Flush({ onClose }: tProps) {
  const [info, setInfo] = useState("");
  const { loading, flush } = admErrStore();
  const { control, setValue, formState, getValues } = useForm({
    defaultValues: {
      date: "",
    },
    resolver: yupResolver(schema),
    mode: "onChange",
  });

  const setDate = (date: Date) => {
    setValue("date", format(date, "yyyy-MM-dd"));
  };
  const handleFlush = async () => {
    const v = getValues();
    if (!isDate(new Date(v.date))) {
      setInfo("not date");
      return;
    } else {
      setInfo("");
      await flush(new Date(v.date));
    }
    onClose();
    // await flush(v.date)
  };
  return (
    <>
      <Form control={control} formState={formState}>
        <InputForm wrapperClassName="w-full mb-3" name="date" />
      </Form>
      <div className="flex items-center">
        <LoadingBtn
          onClick={() => setDate(addDays(new Date(), -15))}
          color="info"
          txt="0.5 month"
        />
        <LoadingBtn
          onClick={() => setDate(addDays(new Date(), -30))}
          color="info"
          txt="month"
        />
        <LoadingBtn
          onClick={() => setDate(addDays(new Date(), -45))}
          color="info"
          txt="1.5 month"
        />
      </div>
      <p className="text-me-gold">{info}</p>

      <div className="flex justify-between mt-3">
        <div />

        <LoadingBtn
          onClick={handleFlush}
          color="success"
          variant="contained"
          isLoading={loading}
          txt="flush"
        />
      </div>
    </>
  );
}
