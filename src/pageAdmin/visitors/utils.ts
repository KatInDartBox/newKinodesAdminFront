export function pkName(path: string) {
  const names = path.split("accounting/server/");
  const name = names[1] || path;
  return name.slice(-45);
}

export function filePath(path: string) {
  const names = path.split("/home/postgres/projects/go/src/kinodes/server/");
  const name = names[1] || path;
  return name.slice(-45);
}
