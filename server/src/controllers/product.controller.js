import { productService } from "../services";

export const productController = {
  findAll: productService.findAll,
  findById: productService.findById,
  findByConditions: productService.findByConditions,
  create: productService.create,
  update: productService.update,
  deleteById: productService.deleteById,
  deleteByConditions: productService.deleteByConditions,
  filters: productService.filters,

  // product infos
  findInfoByProductId: productService.findInfoByProductId,
  findInfoById: productService.findInfoById,
  createInfoForProductId: productService.createInfoForProductId,
  updateInfoById: productService.updateInfoById,
  deleteInfoByConditional: productService.deleteInfoByConditional,
};
