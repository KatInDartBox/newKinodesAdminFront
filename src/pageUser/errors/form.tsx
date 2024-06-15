import { admErrStore } from "./store";

export default function AdmErrForm() {
  const { current } = admErrStore();

  if (!current) return <></>;

  return (
    <div>
      <pre>{JSON.stringify(current, null, 2)}</pre>
    </div>
  );
}
