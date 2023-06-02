export const pathHandler = {
  rootDirName: __dirname
    .split("\\")
    .filter((key) => key !== __dirname.split("\\").pop())
    .join("\\"),
};
