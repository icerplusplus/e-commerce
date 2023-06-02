import { App } from "antd";
import type { ModalStaticFunctions } from "antd/es/modal/confirm";

let modal: Omit<ModalStaticFunctions, "warn">;

export const useModal = () => {
  const staticFunction = App.useApp();
  modal = staticFunction.modal;

  return modal;
};
