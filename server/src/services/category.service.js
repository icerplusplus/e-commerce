import { categoryDb } from "../repositories";
import { responseHandler } from "../middlewares";

export const categoryService = {
  findAll: (req, res) =>
    new Promise(async (resolve, reject) => {
      try {
        let categories;
        if (req.query.all) {
          categories = await categoryDb.findAllNoPagination();
        } else {
          categories = await categoryDb.findAll({
            page: parseInt(req.query.page || 1),
            size: parseInt(req.query.size || 10),
          });
        }

        resolve(responseHandler.success(res, categories, "Ok"));
      } catch (error) {
        reject(responseHandler.internalServerError(res));
      }
    }),
  findById: (req, res) =>
    new Promise(async (resolve, reject) => {
      try {
        const category = await categoryDb.findById(req.params.id);

        if (!category)
          return resolve(responseHandler.notFound(res, "Category not found!"));

        resolve(responseHandler.success(res, category, "Ok"));
      } catch (error) {
        reject(responseHandler.internalServerError(res));
      }
    }),
  findByConditions: (req, res) =>
    new Promise(async (resolve, reject) => {
      try {
        const categories = await categoryDb.findByConditions(req.body, {
          page: parseInt(req.query.page || 1),
          size: parseInt(req.query.size || 10),
        });

        if (!categories) {
          return resolve(
            responseHandler.notFound(res, "Categories not found!")
          );
        }

        resolve(responseHandler.success(res, categories, "Ok"));
      } catch (error) {
        reject(responseHandler.internalServerError(res));
      }
    }),
  create: (req, res) =>
    new Promise(async (resolve, reject) => {
      try {
        const newCategory = await categoryDb.create(req.body);

        resolve(responseHandler.success(res, newCategory, "Ok"));
      } catch (error) {
        reject(responseHandler.internalServerError(res));
      }
    }),
  update: (req, res) =>
    new Promise(async (resolve, reject) => {
      try {
        const categoryExist = await categoryDb.findById(req.body.id);
        if (!categoryExist)
          return resolve(responseHandler.notFound(res, "Category not found!"));

        const updatedCategory = await categoryDb.update(req.body, {
          id: req.body.id,
        });

        if (!updatedCategory)
          return resolve(
            responseHandler.unprocessableEntity(
              res,
              "Progessing have been error"
            )
          );

        resolve(responseHandler.success(res, updatedCategory, "Ok"));
      } catch (error) {
        console.log(error);
        reject(responseHandler.internalServerError(res));
      }
    }),
  deleteById: (req, res) =>
    new Promise(async (resolve, reject) => {
      try {
        const categoryExist = await categoryDb.findById(req.params.id);
        if (!categoryExist)
          return resolve(responseHandler.notFound(res, "Category not found!"));

        await categoryDb.deleteById(req.params.id);
        resolve(
          responseHandler.success(res, {}, "Category have been removed!")
        );
      } catch (error) {
        reject(responseHandler.internalServerError(res));
      }
    }),
  deleteByConditions: (req, res) =>
    new Promise(async (resolve, reject) => {
      try {
        const countNumber = await categoryDb.countRowsWithConditions(req.body);
        if (countNumber === 0)
          return resolve(
            responseHandler.notFound(res, "'Where conditions' not exactly!")
          );

        await categoryDb.deleteByConditions(req.body);
        resolve(
          responseHandler.success(res, {}, "Categories have been removed!")
        );
      } catch (error) {
        reject(responseHandler.internalServerError(res));
      }
    }),
};
