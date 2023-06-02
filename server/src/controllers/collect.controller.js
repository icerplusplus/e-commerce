import { collectService } from "../services";

export const collectController = {
  findAll: collectService.findAll,
  findById: collectService.findById,
  findByConditions: collectService.findByConditions,
  create: collectService.create,
  update: collectService.update,
  deleteById: collectService.deleteById,
  deleteByConditions: collectService.deleteByConditions,
};
