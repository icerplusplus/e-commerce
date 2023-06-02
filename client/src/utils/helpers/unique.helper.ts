export const arrayHandler = {
  uniqueArray: (arrayData: [], key: string) =>
    arrayData.filter(
      (item, index, self) =>
        index === self.findIndex((t) => t[key] && t[key] === item[key]),
    ),
  uniqueStrings: (arrayData: []) =>
    arrayData.filter(
      (item, index, self) => index === self.findIndex((t) => t && t === item),
    ),
};
