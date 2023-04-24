import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import YupPassword from "yup-password";
import { useDispatch } from "react-redux";
import { registerAction } from "../../../libs";

YupPassword(yup);

const requiredField = () => yup.string().required();
const password = () =>
  requiredField()
    .min(
      8,
      "Password must contain 8 or more characters with at least one of each: uppercase, lowercase, number and special"
    )
    .minLowercase(1, "Password must contain at least 1 lower case letter")
    .minUppercase(1, "Password must contain at least 1 upper case letter")
    .minNumbers(1, "Password must contain at least 1 number")
    .minSymbols(1, "Password must contain at least 1 special character");

const registerSchema = yup
  .object({
    username: yup
      .string()
      .required()
      .min(8, "Username is too short - should be 8 chars minimum."),
    email: yup.string().email().required(),
    password: password(),
  })
  .required();

type Props = {
  showPassword: boolean;
  setShowPassword: React.Dispatch<React.SetStateAction<boolean>>;
  isOpenning: boolean;
  setIsOpenning: React.Dispatch<React.SetStateAction<boolean>>;
};

function Register(props) {
  const { showPassword, setShowPassword, isOpenning, setIsOpenning } = props;
  const [topSize, setTopSize] = useState(45);
  const dispatch = useDispatch();

  const toggleLoginAction = () => {
    setIsOpenning(!isOpenning);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(registerSchema),
  });

  const onRegisterSubmit = async (data) => {
    console.log("user: ", data);

    await registerAction(data, dispatch, toggleLoginAction);
  };

  useEffect(() => {
    if (errors.email?.message) setTopSize(45);
    else setTopSize(40);
    if (errors.username?.message) setTopSize(50);
    else setTopSize(45);
    if (errors.password?.message) setTopSize(40);

    if (errors.email?.message && errors.password?.message) setTopSize(45);
    if (
      errors.email?.message &&
      errors.username?.message &&
      errors.password?.message
    )
      setTopSize(50);
  }, [
    errors.username?.message,
    errors.email?.message,
    errors.password?.message,
  ]);

  return (
    <>
      <div className="title">
        <h4>Tạo tài khoản</h4>
        <p>Vui lòng điền đầy đủ thông tin</p>
      </div>
      <form className="auth__form" onSubmit={handleSubmit(onRegisterSubmit)}>
        <input
          className="username"
          type="text"
          name="username"
          placeholder="Tên người dùng"
          {...register("username")}
        />
        {errors.username?.message ? (
          <span className="err__input">{errors.username?.message}</span>
        ) : (
          <></>
        )}
        <input
          className="username"
          type="text"
          name="email"
          placeholder="Địa chỉ email, ex: abc@gmail.com"
          {...register("email")}
        />
        {errors.email?.message ? (
          <span className="err__input">{errors.email?.message}</span>
        ) : (
          <></>
        )}
        <input
          className="password"
          type={showPassword ? "text" : "password"}
          name="password"
          placeholder="Mật khẩu"
          {...register("password")}
        />
        {errors.password?.message ? (
          <span className="err__input">{errors.password?.message}</span>
        ) : (
          <></>
        )}
        <span
          style={{
            top: `${topSize}%`,
          }}
          onClick={() => {
            setShowPassword(!showPassword);
          }}
          className="statusPassword"
        >
          {!showPassword ? "Hiện" : "Ẩn"}
        </span>
        <button className="submit" type="submit">
          Đăng ký
        </button>
      </form>
      <div className="toggle__method">
        <span>
          Đã có tài khoản?
          <p onClick={toggleLoginAction}> Đăng nhập ngay</p>
        </span>
      </div>
    </>
  );
}

export default Register;
