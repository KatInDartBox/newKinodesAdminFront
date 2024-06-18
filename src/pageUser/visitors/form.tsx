import { visitorStore } from "./store";

export default function AdmErrForm() {
  const { current } = visitorStore();

  // if (!current) return <>{current}</>;

  // console.log("adm err form: ", current);
  return (
    <div>
      <pre>{JSON.stringify(current, null, 2)}</pre>
    </div>
  );
}
