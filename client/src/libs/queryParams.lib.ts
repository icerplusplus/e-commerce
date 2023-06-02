export const objectToQueryParams = (obj: any) =>
  Object.keys(obj)
    ?.map((key) => key.concat("=", obj[key].toString()))
    ?.join("&");
