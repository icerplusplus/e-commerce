import {useEffect} from 'react';
import {selectUserInfo, userAsyncThunks} from '@/stores/reducer';
import {IAuthInfo, IUserReducer} from '../types';
import {useAppDispatch, useAppSelector} from './useStore';
import {useNotification} from './useNotification';
import {Cookies} from '../utils/helpers';

interface AuthHandler<T> {
  data: T;
  callback?: () => void;
}

export const useAuthenticate = () => {
  // store
  const dispatch = useAppDispatch();
  const userStore: IUserReducer = useAppSelector(selectUserInfo);

  // use notification
  const notification = useNotification();

  const authActions = {
    loginHandler: async ({data, callback}: AuthHandler<IAuthInfo>) => {
      try {
        await dispatch(userAsyncThunks.login(data));
        callback?.();
      } catch (error) {
        console.log(error);
      }
    },
    registerHandler: async ({data, callback}: AuthHandler<IAuthInfo>) => {
      try {
        await dispatch(userAsyncThunks.register(data));
        callback?.();
      } catch (error) {
        console.log(error);
      }
    },
    logoutHandler: async () => {
      try {
        const id = userStore?.data && userStore?.data?.id;
        if (id) await dispatch(userAsyncThunks.logout(id));
      } catch (error) {
        console.log(error);
      }
    },
  };

  // const authNotificationHandler = () => {
  //   console.log('user store: ', userStore);
  //   if (userStore.isAuthenticateSuccess)
  //     notification.success({message: userStore.message});
  //   else if (userStore.isError)
  //     notification.error({message: userStore.message});
  // };

  // useEffect(() => {
  //   authNotificationHandler();
  // }, [userStore]);

  return {
    loginHandler: authActions.loginHandler,
    registerHandler: authActions.registerHandler,
    logoutHandler: authActions.logoutHandler,
  } as const;
};
