import { v4 } from "uuid";
import { arrtributesHandler } from "../libs";

export const makeProductInfosDb = (db) => {
  // findOne, findAll, ...

  const findById = (id, attributes = { includes: [], excludes: [] }) =>
    new Promise(async (resolve, reject) => {
      try {
        const rows = await db.ProductInfo.findByPk(id);
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

  const findByConditions = (
    conditions,
    attributes = { includes: [], excludes: [] }
  ) =>
    new Promise(async (resolve, reject) => {
      try {
        const { rows } = await db.ProductInfo.findAndCountAll({
          where: conditions,
          order: [["createdAt", "DESC"]],
        });

        const count = await db.ProductInfo.count();
        const filterData = arrtributesHandler.filters(rows, attributes);

        resolve({
          infos: filterData,
        });
      } catch (error) {
        console.log(error);
        reject(null);
      }
    });

  const update = (payload, whereCondition = {}) =>
    new Promise(async (resolve, reject) => {
      try {
        // Remove id arrtribute in object

        await db.ProductInfo.update(
          { ...payload, updatedAt: new Date() },
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
  const deleteByConditions = (whereCondition) =>
    new Promise(async (resolve, reject) => {
      try {
        const recordDeleted = await db.ProductInfo.destroy({
          where: whereCondition,
        });

        resolve(recordDeleted);
      } catch (error) {
        reject(null);
      }
    });

  const findOne = (payload, attributes = { includes: [], excludes: [] }) =>
    new Promise(async (resolve, reject) => {
      try {
        const rows = await db.ProductInfo.findOne({
          where: payload,
          attributes: attributes,
        });
        resolve(rows?.dataValues);
      } catch (error) {
        console.log(error);
        reject(null);
      }
    });
  const findAll = (attributes = { includes: [], excludes: [] }) =>
    new Promise(async (resolve, reject) => {
      try {
        const { count, rows } = await db.ProductInfo.findAndCountAll({
          order: [["createdAt", "DESC"]],
        });

        const filterData = arrtributesHandler.filters(rows, attributes);

        resolve({
          infos: filterData,
        });
      } catch (error) {
        console.log(error);
        reject(null);
      }
    });
  const create = (payload) =>
    new Promise(async (resolve, reject) => {
      try {
        payload["id"] = v4();
        const newProduct = await db.ProductInfo.create(payload, {
          fields: Object.keys(payload),
        });

        const filterData = arrtributesHandler.filter(newProduct?.dataValues);

        resolve(filterData);
      } catch (error) {
        console.log(error);
        reject(null);
      }
    });

  const deleteById = (id) =>
    new Promise(async (resolve, reject) => {
      try {
        await db.ProductInfo.destroy({ where: { id } });

        resolve({});
      } catch (error) {
        reject(null);
      }
    });

  const getMaxRows = () =>
    new Promise(async (resolve, reject) => {
      try {
        const count = await db.ProductInfo.count();
        resolve(count);
      } catch (error) {
        reject(null);
      }
    });
  const countRowsWithConditions = (whereCondition) =>
    new Promise(async (resolve, reject) => {
      try {
        const count = await db.ProductInfo.count({
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
