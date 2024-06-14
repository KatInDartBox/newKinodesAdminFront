import LoadingBtn from "@/src/components/loadingBtn";
import { isFormErr } from "@/src/utils/hookForm/errors";
import { Form } from "@/src/utils/hookForm/form";
import InputForm from "@/src/utils/hookForm/inputForm";
import TagForm from "@/src/utils/hookForm/tagForm";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { object, string } from "yup";
import { adsStore, tAds } from "./store";

function yupMinMax(min: number, max: number) {
  return string()
    .min(min, "min " + min)
    .max(max, "max " + max);
}
const schema = object({
  img_url: yupMinMax(0, 255),
  href: yupMinMax(3, 255),
  title: yupMinMax(1, 30),
  desc: yupMinMax(1, 70),
  tags: yupMinMax(1, 255),
});

type tProps = {
  ads?: tAds;
  onClose?: () => void;
};
export default function AddAds({ ads, onClose }: tProps) {
  const { remove, loading, add, update } = adsStore();

  const { trigger, control, formState, getValues } = useForm({
    defaultValues: {
      img_url: ads?.img_url || "",
      href: ads?.href || "",
      title: ads?.title || "",
      desc: ads?.desc || "",
      tags: ads?.tags || "",
    },
    resolver: yupResolver(schema),
    mode: "onBlur",
  });

  const handleClose = () => {
    if (!!onClose) onClose();
  };

  const handleAdd = async () => {
    const v = getValues() as tAds;
    console.log("form value: ", getValues());
    if (!ads) {
      await add({
        ...v,
        id: "1",
        updated_at: new Date(),
      });
    } else {
      await update({
        ...v,
        id: ads.id,
        updated_at: new Date(),
      });
    }

    handleClose();
  };

  const handleDelete = async () => {
    if (!ads) return;
    await remove(ads.id);
    handleClose();
  };

  return (
    <div>
      <Form control={control} formState={formState}>
        <InputForm wrapperClassName="w-full mb-3" name="img_url" />
        <InputForm wrapperClassName="w-full mb-3" name="href" req />
        <InputForm
          // labelWidth="180px"
          wrapperClassName="w-full mb-3"
          name="title"
          req
        />
        <InputForm
          // labelWidth="180px"
          wrapperClassName="w-full mb-3"
          name="desc"
          req
        />
        <TagForm wrapperClassName="w-full mb-3" name="tags" trigger={trigger} />
      </Form>
      <div className="mt-5 flex items-center justify-between">
        {ads ? (
          <LoadingBtn
            onClick={handleDelete}
            variant="contained"
            color="error"
            size="small"
            txt="delete"
            isLoading={loading}
          />
        ) : (
          <div></div>
        )}

        <div className="flex items-center">
          <LoadingBtn
            className="!mr-2 "
            onClick={handleClose}
            variant="text"
            color="info"
            size="small"
            txt="cancel"
          />

          <LoadingBtn
            onClick={handleAdd}
            variant="contained"
            size="small"
            txt={ads ? "update" : "add"}
            disabled={isFormErr(formState)}
            isLoading={loading}
          />
        </div>
      </div>
    </div>
  );
}
