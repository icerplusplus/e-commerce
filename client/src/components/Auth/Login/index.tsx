import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import YupPassword from "yup-password";
import { loginAction } from "../../../libs";

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

const loginSchema = yup
  .object({
    username: yup
      .string()
      .required()
      .min(8, "Username is too short - should be 8 chars minimum."),
    password: password(),
  })
  .required();

type Props = {
  showPassword: boolean;
  setShowPassword: React.Dispatch<React.SetStateAction<boolean>>;
  isOpenning: boolean;
  setIsOpenning: React.Dispatch<React.SetStateAction<boolean>>;
  togglePopup: () => void;
};

function Login(props: Props) {
  const {
    showPassword,
    setShowPassword,
    isOpenning,
    setIsOpenning,
    togglePopup,
  } = props;
  const [topSize, setTopSize] = useState(32);
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginSchema),
  });

  useEffect(() => {
    if (errors.username?.message) setTopSize(37);
    else setTopSize(32);
    if (errors.password?.message) setTopSize(28);

    if (errors.username?.message && errors.password?.message) setTopSize(35);
  }, [errors.username?.message, errors.password?.message]);

  const onLoginSubmit = async (data) => {
    console.log("user: ", data);

    await loginAction(data, dispatch, togglePopup);
  };

  return (
    <>
      <div className="title">
        <h4>Đăng nhập bằng email</h4>
        <p>Nhập email và mật khẩu</p>
      </div>
      <form className="auth__form" onSubmit={handleSubmit(onLoginSubmit)}>
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
          onClick={() => {
            setShowPassword(!showPassword);
          }}
          style={{
            top: `${topSize}%`,
          }}
          className="statusPassword"
        >
          {!showPassword ? "Hiện" : "Ẩn"}
        </span>
        <button className="submit" type="submit">
          Đăng nhập
        </button>
      </form>
      <div className="toggle__method">
        <span>
          <p>Quên mật khẩu</p>
        </span>
        <span>
          Chưa có tài khoản?
          <p
            onClick={() => {
              setIsOpenning(!isOpenning);
            }}
          >
            Tạo tài khoản
          </p>
        </span>
      </div>
    </>
  );
}

export default Login;
