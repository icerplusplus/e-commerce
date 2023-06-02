import { Op } from "sequelize";

// Condition with Key types
export const whereClause = (key) => {
  let result;

  switch (key) {
    case "HOT":
      result = {
        quantity_sold: {
          [Op.gt]: 100,
        },
      };
      break;
    case "NEW":
      result = {
        createdAt: {
          [Op.gte]: new Date(new Date() - 7 * 24 * 60 * 60 * 1000),
        },
      };
      break;

    default:
      break;
  }
  return result;
};
export const orderByClause = (key) => {
  let result;

  switch (key) {
    case "ASC":
      result = {
        order: [["root_price", "ASC"]],
      };
      break;
    case "DESC":
      result = {
        order: [["root_price", "DESC"]],
      };
      break;
    default:
      break;
  }
  return result;
};
