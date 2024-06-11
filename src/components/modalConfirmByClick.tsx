import { pickRnd } from "@/src/utils/array/pick";
import { ALPHABET_UP, NUMBER } from "@/src/utils/constance";
import { getRndPwd } from "@/src/utils/password/rndPwd";
import { ReactNode } from "react";
import LoadingBtn from "./loadingBtn";
import Modal, { tModal } from "./modal";

type tConfirmByClick = {
  disabled?: boolean;
  loading?: boolean;
  info?: ReactNode;
  rndLen?: number;
  onConfirm: () => void;
  className?: string;
};

type tProps = Omit<tModal, "Content"> & tConfirmByClick;

const pull = ALPHABET_UP + NUMBER + "!@#$%^&";
function get2code(len: number): { c1: string; c2: string } {
  const c1 = getRndPwd(len, pull);
  const c2 = getRndPwd(len, pull);

  if (c1 === c2) {
    return get2code(len);
  } else {
    return { c1, c2 };
  }
}

export default function ModalConfirmByClick({
  info,
  onConfirm,
  rndLen = 3,
  ...others
}: tProps) {
  return (
    <>
      <Modal
        {...others}
        Content={
          <ConfirmByClick info={info} onConfirm={onConfirm} rndLen={rndLen} />
        }
      />
    </>
  );
}
export function ConfirmByClick({
  info,
  rndLen = 3,
  onConfirm,
  className = "",
  loading = false,
  disabled = false,
}: tConfirmByClick) {
  if (!info) {
    info = "Select the botton that has the following code:";
  }
  const { c1, c2 } = get2code(rndLen);
  const code = pickRnd([c1, c2]);

  const handleChoose = (str: string) => {
    if (str === code) {
      onConfirm();
    }
  };
  return (
    <div className={className}>
      <div>{info}</div>
      <p className="text-xl text-center text-me-gold my-3">{code}</p>
      <div className="w-full flex justify-between">
        <LoadingBtn
          txt={c1}
          onClick={() => handleChoose(c1)}
          variant="contained"
          size="small"
          color="warning"
          isLoading={loading}
          disabled={disabled}
        />
        <LoadingBtn
          onClick={() => handleChoose(c2)}
          variant="contained"
          size="small"
          color="info"
          txt={c2}
          isLoading={loading}
          disabled={disabled}
        />
      </div>
    </div>
  );
}
