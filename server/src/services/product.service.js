import { productDb, productInfosDb } from "../repositories";
import { responseHandler } from "../middlewares";

export const productService = {
  // PRODUCT INFOS
  findInfoByProductId: (req, res) =>
    new Promise(async (resolve, reject) => {
      try {
        const infos = await productInfosDb.findByConditions(
          { product_id: req.params.id },
          { excludes: ["createdAt", "updatedAt"] }
        );

        resolve(responseHandler.success(res, infos, "Ok"));
      } catch (error) {
        reject(responseHandler.internalServerError(res));
      }
    }),
  findInfoById: (req, res) =>
    new Promise(async (resolve, reject) => {
      try {
        const info = await productInfosDb.findById(req.params.id);

        if (!info)
          return resolve(responseHandler.notFound(res, "Info not found!"));

        resolve(responseHandler.success(res, info, "Ok"));
      } catch (error) {
        reject(responseHandler.internalServerError(res));
      }
    }),
  createInfoForProductId: (req, res) =>
    new Promise(async (resolve, reject) => {
      try {
        const productIdExist = await productDb.findById(req.body.product_id);
        if (!productIdExist)
          return resolve(responseHandler.notFound(res, "Product id invalid!"));

        const codeInfoExist = await productInfosDb.findByConditions({
          code: req.body.code,
        });

        if (codeInfoExist?.infos.length > 0)
          return resolve(responseHandler.conflict(res, "Code info exist!"));

        const newInfo = await productInfosDb.create(req.body);

        resolve(responseHandler.success(res, newInfo, "Ok"));
      } catch (error) {
        console.log(error);
        reject(responseHandler.internalServerError(res));
      }
    }),
  updateInfoById: (req, res) =>
    new Promise(async (resolve, reject) => {
      try {
        const infoExist = await productInfosDb.findById(req.body.id);
        if (!infoExist)
          return resolve(responseHandler.notFound(res, "Info not found!"));
        const productIdExist = await productDb.findById(req.body.product_id);
        if (!productIdExist)
          return resolve(
            responseHandler.notFound(res, "Product id not found!")
          );

        const updatedInfo = await productInfosDb.update(req.body, {
          id: req.body.id,
        });

        if (!updatedInfo)
          return resolve(
            responseHandler.unprocessableEntity(
              res,
              "Progessing have been error"
            )
          );

        resolve(responseHandler.success(res, updatedInfo, "Ok"));
      } catch (error) {
        console.log(error);
        reject(responseHandler.internalServerError(res));
      }
    }),
  deleteInfoByConditional: (req, res) =>
    new Promise(async (resolve, reject) => {
      try {
        const countNumber = await productInfosDb.countRowsWithConditions(
          req.body
        );
        if (countNumber === 0)
          return resolve(
            responseHandler.notFound(res, "'Where conditions is not exactly!")
          );

        await productInfosDb.deleteByConditions(req.body);
        resolve(responseHandler.success(res, {}, "Infos have been removed!"));
      } catch (error) {
        reject(responseHandler.internalServerError(res));
      }
    }),

  // PRODUCTS
  findAll: (req, res) =>
    new Promise(async (resolve, reject) => {
      try {
        const products = await productDb.findAll(
          {
            page: parseInt(req.query.page || 1),
            size: parseInt(req.query.size || 10),
          },
          { excludes: ["category_id"] }
        );

        resolve(responseHandler.success(res, products, "Ok"));
      } catch (error) {
        reject(responseHandler.internalServerError(res));
      }
    }),
  findById: (req, res) =>
    new Promise(async (resolve, reject) => {
      try {
        const product = await productDb.findById(req.params.id);

        if (!product)
          return resolve(responseHandler.notFound(res, "Product not found!"));

        resolve(responseHandler.success(res, product, "Ok"));
      } catch (error) {
        reject(responseHandler.internalServerError(res));
      }
    }),
  findByConditions: (req, res) =>
    new Promise(async (resolve, reject) => {
      try {
        const condition = req.body;

        console.log("body: ", req.body);
        const products = await productDb.findByConditions(
          condition,
          !req.query.page
            ? null
            : {
                page: parseInt(req.query.page || 1),
                size: parseInt(req.query.size || 10),
              },
          {
            excludes: condition?.excludes ?? [],
            includes: condition?.includes ?? [],
          }
        );

        if (!products) {
          return resolve(responseHandler.notFound(res, "Products not found!"));
        }

        resolve(responseHandler.success(res, products, "Ok"));
      } catch (error) {
        reject(responseHandler.internalServerError(res));
      }
    }),
  filters: (req, res) => {
    new Promise(async (resolve, reject) => {
      try {
        const products = await productDb.filters(req.body);

        if (!products) {
          return resolve(
            responseHandler.unprocessableEntity(
              res,
              "Condition filter is not valid!"
            )
          );
        }

        resolve(responseHandler.success(res, products, "Ok"));
      } catch (error) {
        console.log(error);
        reject(error);
      }
    });
  },
  create: (req, res) =>
    new Promise(async (resolve, reject) => {
      try {
        const newProduct = await productDb.create(req.body);

        resolve(responseHandler.success(res, newProduct, "Ok"));
      } catch (error) {
        reject(responseHandler.internalServerError(res));
      }
    }),
  update: (req, res) =>
    new Promise(async (resolve, reject) => {
      try {
        const productExist = await productDb.findById(req.body.id);
        if (!productExist)
          return resolve(responseHandler.notFound(res, "Product not found!"));

        const updatedProduct = await productDb.update(req.body, {
          id: req.body.id,
        });

        if (!updatedProduct)
          return resolve(
            responseHandler.unprocessableEntity(
              res,
              "Progessing have been error"
            )
          );

        resolve(responseHandler.success(res, updatedProduct, "Ok"));
      } catch (error) {
        console.log(error);
        reject(responseHandler.internalServerError(res));
      }
    }),
  deleteById: (req, res) =>
    new Promise(async (resolve, reject) => {
      try {
        const productExist = await productDb.findById(req.params.id);
        if (!productExist)
          return resolve(responseHandler.notFound(res, "Product not found!"));

        await productDb.deleteById(req.params.id);
        resolve(responseHandler.success(res, {}, "Product have been removed!"));
      } catch (error) {
        reject(responseHandler.internalServerError(res));
      }
    }),
  deleteByConditions: (req, res) =>
    new Promise(async (resolve, reject) => {
      try {
        const countNumber = await productDb.countRowsWithConditions(req.body);
        if (countNumber === 0)
          return resolve(
            responseHandler.notFound(res, "'Where conditions' not exactly!")
          );

        await productDb.deleteByConditions(req.body);
        resolve(
          responseHandler.success(res, {}, "Products have been removed!")
        );
      } catch (error) {
        reject(responseHandler.internalServerError(res));
      }
    }),
};
