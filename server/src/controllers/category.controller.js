import { categoryService } from "../services";

export const categoryController = {
  findAll: categoryService.findAll,
  findById: categoryService.findById,
  findByConditions: categoryService.findByConditions,
  create: categoryService.create,
  update: categoryService.update,
  deleteById: categoryService.deleteById,
  deleteByConditions: categoryService.deleteByConditions,
};
