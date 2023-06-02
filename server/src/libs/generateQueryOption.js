export const queryOption = {
  insert: (option) => {
    const keys = Object.keys(option).join(", ");
    const values = Object.values(option);
    const questionCharaters = Object.keys(option).fill("?").join(", ");

    return { keys, values, tmpValues: questionCharaters };
  },
  select: (option) => {
    const values = Object.values(option);
    const keys = Object.keys(option)
      .map((key) => key + " = ?")
      .join(" AND ");

    return { keys, values };
  },
};
