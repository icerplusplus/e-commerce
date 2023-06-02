import { collectDb } from "../repositories";
import { responseHandler } from "../middlewares";

export const collectService = {
  findAll: (req, res) =>
    new Promise(async (resolve, reject) => {
      try {
        const collects = await collectDb.findAll({
          page: parseInt(req.query.page || 1),
          size: parseInt(req.query.size || 10),
        });

        resolve(responseHandler.success(res, collects, "Ok"));
      } catch (error) {
        reject(responseHandler.internalServerError(res));
      }
    }),
  findById: (req, res) =>
    new Promise(async (resolve, reject) => {
      try {
        const collect = await collectDb.findById(req.params.id);

        if (!collect)
          return resolve(responseHandler.notFound(res, "Collect not found!"));

        resolve(responseHandler.success(res, collect, "Ok"));
      } catch (error) {
        reject(responseHandler.internalServerError(res));
      }
    }),
  findByConditions: (req, res) =>
    new Promise(async (resolve, reject) => {
      try {
        const collects = await collectDb.findByConditions(
          req.body,
          {
            page: parseInt(req.query.page || 1),
            size: parseInt(req.query.size || 10),
          },
          { excludes: ["category_id"] }
        );

        if (!collects) {
          return resolve(responseHandler.notFound(res, "Collects not found!"));
        }

        resolve(responseHandler.success(res, collects, "Ok"));
      } catch (error) {
        reject(responseHandler.internalServerError(res));
      }
    }),
  create: (req, res) =>
    new Promise(async (resolve, reject) => {
      try {
        const newCollect = await collectDb.create(req.body);

        resolve(responseHandler.success(res, newCollect, "Ok"));
      } catch (error) {
        reject(responseHandler.internalServerError(res));
      }
    }),
  update: (req, res) =>
    new Promise(async (resolve, reject) => {
      try {
        const collectExist = await collectDb.findById(req.body.id);
        if (!collectExist)
          return resolve(responseHandler.notFound(res, "Collect not found!"));

        const updatedCollect = await collectDb.update(req.body, {
          id: req.body.id,
        });

        if (!updatedCollect)
          return resolve(
            responseHandler.unprocessableEntity(
              res,
              "Progessing have been error"
            )
          );

        resolve(responseHandler.success(res, updatedCollect, "Ok"));
      } catch (error) {
        reject(responseHandler.internalServerError(res));
      }
    }),
  deleteById: (req, res) =>
    new Promise(async (resolve, reject) => {
      try {
        const collectExist = await collectDb.findById(req.params.id);
        if (!collectExist)
          return resolve(responseHandler.notFound(res, "Collect not found!"));

        await collectDb.deleteById(req.params.id);
        resolve(responseHandler.success(res, {}, "Collect have been removed!"));
      } catch (error) {
        reject(responseHandler.internalServerError(res));
      }
    }),
  deleteByConditions: (req, res) =>
    new Promise(async (resolve, reject) => {
      try {
        const countNumber = await collectDb.countRowsWithConditions(req.body);
        if (countNumber === 0)
          return resolve(
            responseHandler.notFound(res, "'Where conditions' not exactly!")
          );

        await collectDb.deleteByConditions(req.body);
        resolve(
          responseHandler.success(res, {}, "Collects have been removed!")
        );
      } catch (error) {
        reject(responseHandler.internalServerError(res));
      }
    }),
};
