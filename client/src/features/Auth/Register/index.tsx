import React from 'react';
import {FormTypes, useAuthenticate, useHookForm} from '../../../hooks';
import {Input} from '../../../components';

interface Props {
  changeForm: () => void;
  closeAuthForm: () => void;
}

const Register: React.FC<Props> = ({changeForm, closeAuthForm}) => {
  const {errors, handleSubmit, register} = useHookForm({
    type: FormTypes.Login,
  });

  // custom hook: authenticate
  const {registerHandler} = useAuthenticate();
  const onSubmit = async (data: any) =>
    await registerHandler({data, callback: closeAuthForm});

  return (
    <>
      <div className="title">
        <h4>Tạo tài khoản</h4>
        <p>Vui lòng điền đầy đủ thông tin</p>
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
          name="password"
          register={register}
          error={errors.password}
        />

        <button className="submit" type="submit">
          Đăng ký
        </button>
      </form>
      <div className="toggle__method">
        <span>
          Đã có tài khoản?
          <p onClick={changeForm}> Đăng nhập ngay</p>
        </span>
      </div>
    </>
  );
};

export default Register;
