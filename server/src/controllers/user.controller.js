import { userService } from "../services";

export const userController = {
  findAll: userService.findAll,
  findByConditions: userService.findByConditions,
  findById: userService.findById,
  create: userService.create,
  update: userService.update,
  deleteById: userService.deleteById,
  deleteByConditions: userService.deleteByConditions,
  updatePassword: userService.updatePassword,
  refreshToken: userService.refreshToken,
};
