import { authService } from "../services";

export const authController = {
  login: authService.login,
  register: authService.register,
  logout: authService.logout,
  refreshToken: authService.refreshToken,
};
