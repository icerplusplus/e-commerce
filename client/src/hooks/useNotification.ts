import {App} from 'antd';
import type {NotificationInstance} from 'antd/es/notification/interface';

let notification: NotificationInstance;

export const useNotification = () => {
  const staticFunction = App.useApp();
  notification = staticFunction.notification;
  return notification;
};
