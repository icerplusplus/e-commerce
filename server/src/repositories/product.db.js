import { v4 } from "uuid";
import { arrtributesHandler } from "../libs";
import { Op } from "sequelize";
import { Filters } from "../utils/helpers";

export const makeProductsDb = (db) => {
  // findOne, findAll, ...
  const findOne = (payload, attributes = { includes: [], excludes: [] }) =>
    new Promise(async (resolve, reject) => {
      try {
        const rows = await db.Product.findOne({
          where: payload,
          include: [{ model: db.ProductInfo, as: "information" }],
          attributes: attributes,
        });
        resolve(rows?.dataValues);
      } catch (error) {
        console.log(error);
        reject(null);
      }
    });
  const findById = (id, attributes = { includes: [], excludes: [] }) =>
    new Promise(async (resolve, reject) => {
      try {
        const rows = await db.Product.findByPk(id, {
          include: [
            { model: db.Category, as: "category_data" },
            { model: db.ProductInfo, as: "information" },
          ],
        });
        if (!rows) {
          return resolve(null);
        }
        const filterData = arrtributesHandler.filter(
          rows?.dataValues,
          attributes
        );

        resolve(filterData);
      } catch (error) {
        console.log(error);
        reject(null);
      }
    });
  const findAll = (
    pagination = { page: 1, size: 10 },
    attributes = { includes: [], excludes: [] }
  ) =>
    new Promise(async (resolve, reject) => {
      try {
        const { rows } = await db.Product.findAndCountAll({
          order: [["createdAt", "DESC"]],
          offset: (pagination.page - 1) * pagination.size,
          limit: pagination.size,
          include: [
            { model: db.Category, as: "category_data" },
            { model: db.ProductInfo, as: "information" },
          ],
        });

        const filterData = arrtributesHandler.filters(rows, attributes);

        const count = await getMaxRows();

        const amount =
          count === 0 || count - pagination.page * pagination.size <= 0
            ? 0
            : count - pagination.page * pagination.size;

        resolve({
          products: filterData,
          max_total: count,
          pagination: {
            page: pagination.page,
            size: pagination.size,
            amount,
          },
        });
      } catch (error) {
        console.log(error);
        reject(null);
      }
    });
  const findByConditions = (
    conditions,
    pagination,
    attributes = { includes: [], excludes: [] }
  ) =>
    new Promise(async (resolve, reject) => {
      try {
        delete conditions?.includes;
        delete conditions?.excludes;

        const orderBy = conditions?.orderBy?.map((item) => {
          return [item?.key.toString(), item?.option.toString()];
        });
        const order = conditions?.orderBy
          ? {
              order: [orderBy, ["createdAt", "DESC"]],
            }
          : {
              order: [["createdAt", "DESC"]],
            };
        const paginate = pagination && {
          offset: (pagination.page - 1) * pagination.size,
          limit: pagination?.size,
        };

        const { rows } = await db.Product.findAndCountAll({
          where: conditions,
          ...order,
          ...paginate,
          include: [
            { model: db.Category, as: "category_data" },
            { model: db.ProductInfo, as: "information" },
          ],
        });

        const filterData = arrtributesHandler.filters(rows, attributes);

        if (pagination) {
          const count = await getMaxRows(conditions);
          const amount =
            count === 0 || count - pagination.page * pagination.size <= 0
              ? 0
              : count - pagination.page * pagination.size;
          resolve({
            products: filterData,
            max_total: count,
            pagination: {
              page: pagination.page,
              size: pagination.size,
              amount,
            },
          });
        } else {
          resolve({
            items: filterData,
          });
        }
      } catch (error) {
        console.log(error);
        reject(null);
      }
    });

  const create = (payload) =>
    new Promise(async (resolve, reject) => {
      try {
        payload["id"] = v4();
        const newProduct = await db.Product.create(
          {
            ...payload,
            thumbnails: JSON.stringify(payload.thumbnails),
          },
          {
            fields: Object.keys(payload),
            attributes: {
              excludes: ["category_id"],
            },
          }
        );

        const filterData = arrtributesHandler.filter({
          ...newProduct?.dataValues,
          thumbnails: JSON.parse(newProduct?.dataValues.thumbnails),
        });

        resolve(filterData);
      } catch (error) {
        console.log(error);
        reject(null);
      }
    });

  const update = (payload, whereCondition = {}) =>
    new Promise(async (resolve, reject) => {
      try {
        // Remove id arrtribute in object
        const { id, ...order } = payload;

        await db.Product.update(
          {
            ...order,
            thumbnails: JSON.stringify(payload.thumbnails),
          },
          {
            where: whereCondition,
          }
        );

        // Filter arrtributes
        const filterData = arrtributesHandler.filter(payload);

        resolve(filterData);
      } catch (error) {
        reject(null);
      }
    });

  const deleteById = (id) =>
    new Promise(async (resolve, reject) => {
      try {
        await db.Product.destroy({ where: { id } });

        resolve({});
      } catch (error) {
        reject(null);
      }
    });
  const deleteByConditions = (whereCondition) =>
    new Promise(async (resolve, reject) => {
      try {
        const recordDeleted = await db.Product.destroy({
          where: whereCondition,
        });

        resolve(recordDeleted);
      } catch (error) {
        reject(null);
      }
    });

  const getMaxRows = (conditions = {}, orderBy = undefined) =>
    new Promise(async (resolve, reject) => {
      try {
        if (Object.keys(conditions).length > 0) {
          const { count } = await db.Product.findAndCountAll({
            where: conditions,
            ...orderBy,
          });

          console.log("count: ", count);
          resolve(count);
        } else {
          const count = await db.Product.count();

          resolve(count);
        }
      } catch (error) {
        reject(null);
      }
    });
  const countRowsWithConditions = (whereCondition) =>
    new Promise(async (resolve, reject) => {
      try {
        const count = await db.Product.count({
          where: whereCondition,
        });

        resolve(count);
      } catch (error) {
        reject(null);
      }
    });

  const filters = (condition) =>
    new Promise(async (resolve, reject) => {
      try {
        // console.log("conditon: ", condition);
        const brands = condition._brands.length > 0 && {
          brand_name: {
            [Op.in]: condition._brands,
          },
        };
        const rating =
          condition._rating < 0
            ? [0, 5]
            : condition._rating < 5
            ? [condition._rating, condition._rating + 0.99]
            : [5, 5];

        const price = condition._priceRangeEnd > 0 && {
          [Op.or]: [
            {
              sale_price: {
                [Op.between]: [
                  condition._priceRangeStart,
                  condition._priceRangeEnd,
                ],
              },
            },
            {
              root_price: {
                [Op.between]: [
                  condition._priceRangeStart,
                  condition._priceRangeEnd,
                ],
              },
            },
          ],
        };

        const whereClauses = {
          category_id: condition?._category_id,
          ...Filters.whereClause(condition._filterBy),
          rating_average: {
            [Op.between]: rating,
          },
          ...price,
          ...brands,
        };

        const orderByClauses = Filters.orderByClause(condition._filterBy);

        // pagination

        const { rows } = await db.Product.findAndCountAll({
          where: whereClauses,
          ...orderByClauses,
          offset: (condition._page - 1) * condition._size,
          limit: condition?._size,
          include: [
            { model: db.Category, as: "category_data" },
            { model: db.ProductInfo, as: "information" },
          ],
        });

        const filterData = arrtributesHandler.filters(rows);

        const count = await getMaxRows(whereClauses, orderByClauses);
        const amount =
          count === 0 || count - condition._page * condition._size <= 0
            ? 0
            : count - condition._page * condition._size;
        resolve({
          products: filterData,
          max_total: count,
          pagination: {
            page: condition._page,
            size: condition._size,
            amount,
          },
        });
      } catch (error) {
        console.log(error);
        reject(error);
      }
    });
  return Object.freeze({
    findById,
    findOne,
    findAll,
    findByConditions,
    create,
    update,
    deleteById,
    deleteByConditions,
    getMaxRows,
    countRowsWithConditions,
    filters,
  });
};
