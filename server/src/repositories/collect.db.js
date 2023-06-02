import { v4 } from "uuid";
import { arrtributesHandler } from "../libs";

export const makeCollectsDb = (db) => {
  const findOne = (payload, attributes = { includes: [], excludes: [] }) =>
    new Promise(async (resolve, reject) => {
      try {
        const rows = await db.Collect.findOne({ where: payload, attributes });
        resolve(rows?.dataValues);
      } catch (error) {
        reject(null);
      }
    });
  const findById = (id, attributes = { includes: [], excludes: [] }) =>
    new Promise(async (resolve, reject) => {
      try {
        const rows = await db.Collect.findByPk(id);
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
        const { rows } = await db.Collect.findAndCountAll({
          order: [["createdAt", "DESC"]],
          offset: (pagination.page - 1) * pagination.size,
          limit: pagination.size,
        });

        const filterData = arrtributesHandler.filters(rows, attributes);
        const count = await db.Collect.count();
        const amount =
          count === 0 || count - pagination.page * pagination.size <= 0
            ? 0
            : count - pagination.page * pagination.size;

        resolve({
          collects: filterData,
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
    pagination = { page: 1, size: 10 },
    attributes = { includes: [], excludes: [] }
  ) =>
    new Promise(async (resolve, reject) => {
      try {
        const { rows } = await db.Collect.findAndCountAll({
          where: conditions,
          order: [["createdAt", "DESC"]],
          offset: (pagination.page - 1) * pagination.size,
          limit: pagination.size,
        });

        const filterData = arrtributesHandler.filters(rows, attributes);
        const count = await db.Collect.count();
        const amount =
          count === 0 || count - pagination.page * pagination.size <= 0
            ? 0
            : count - pagination.page * pagination.size;

        resolve({
          collects: filterData,
          max_total: count,
          pagination: {
            page: pagination.page,
            size: pagination.size,
            amount,
          },
        });
      } catch (error) {
        reject(null);
      }
    });

  const create = (payload) =>
    new Promise(async (resolve, reject) => {
      try {
        payload["id"] = v4();
        const newCollect = await db.Collect.create(payload, {
          fields: Object.keys(payload),
        });

        const filterData = arrtributesHandler.filter(newCollect?.dataValues);

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

        await db.Collect.update(order, {
          where: whereCondition,
        });

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
        await db.Collect.destroy({ where: { id } });

        resolve({});
      } catch (error) {
        reject(null);
      }
    });
  const deleteByConditions = (whereCondition) =>
    new Promise(async (resolve, reject) => {
      try {
        const recordDeleted = await db.Collect.destroy({
          where: whereCondition,
        });

        resolve(recordDeleted);
      } catch (error) {
        reject(null);
      }
    });

  const getMaxRows = () =>
    new Promise(async (resolve, reject) => {
      try {
        const count = await db.Collect.count();

        resolve(count);
      } catch (error) {
        reject(null);
      }
    });
  const countRowsWithConditions = (whereCondition) =>
    new Promise(async (resolve, reject) => {
      try {
        const count = await db.Collect.count({
          where: whereCondition,
        });

        resolve(count);
      } catch (error) {
        reject(null);
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
  });
};
