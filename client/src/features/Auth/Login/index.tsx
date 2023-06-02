import React, {useState, useEffect} from 'react';

import {useAppDispatch, useAuthenticate, useHookForm} from '../../../hooks';
import {Button, Input} from '../../../components';
import {IAuthInfo} from '../../../types';

interface Props {
  changeForm: () => void;
  closeAuthForm: () => void;
}

const Login: React.FC<Props> = ({changeForm, closeAuthForm}) => {
  //TODO: customize the hook form
  const {errors, handleSubmit, register} = useHookForm({type: 'login'});

  // use hook custom
  const {loginHandler} = useAuthenticate();

  // form submit handler
  const onSubmit = async (data: any) =>
    await loginHandler({data: data, callback: closeAuthForm});

  return (
    <>
      <div className="title">
        <h4>Đăng nhập bằng email</h4>
        <p>Nhập email và mật khẩu</p>
      </div>
      <form className="auth__form" onSubmit={handleSubmit(onSubmit)}>
        <Input
          type="text"
          placeholder="Địa chỉ email, ex: abc@gmail.com"
          name="email"
          register={register}
          error={errors.email}
        />

        <Input
          type="password"
          placeholder="Mật khẩu"
          register={register}
          name="password"
          error={errors.password}
        />
        <Button type="submit">Đăng nhập</Button>
      </form>
      <div className="toggle__method">
        <span>
          <p>Quên mật khẩu</p>
        </span>
        <span>
          Chưa có tài khoản?
          <p onClick={() => changeForm()}>Tạo tài khoản</p>
        </span>
      </div>
    </>
  );
};

export default Login;
