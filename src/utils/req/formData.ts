import keysIn from "lodash/keysIn";

export function toJson(form: FormData) {
  let obj = {} as { [key: string]: any };
  form.forEach((v, k) => {
    obj[k] = v;
  });
  return obj;
}

export function toFormData(obj: { [key: string]: any }) {
  let formData = new FormData();
  keysIn(obj).forEach((k) => {
    formData.append(k, obj[k]);
  });
  return formData;
}
