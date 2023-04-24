import { useState } from "react";
import { TfiFacebook, FcGoogle, GrClose } from "../../libs/icon";
import Login from "./Login";
import "./index.css";
import Register from "./Register";

type Props = {
  togglePopup: () => void;
};

function Auth({ togglePopup }: Props) {
  const [showPassword, setShowPassword] = useState(false);
  const [isOpenning, setIsOpenning] = useState(true);

  const closePopup = () => {
    togglePopup();
  };

  return (
    <section className="popup__login">
      <div className="__container__ popup__box">
        <div className="popup__item">
          <div className="popup__item__left">
            <div className="left__contents">
              {isOpenning ? (
                <Login
                  showPassword={showPassword}
                  setShowPassword={setShowPassword}
                  isOpenning={isOpenning}
                  setIsOpenning={setIsOpenning}
                  togglePopup={togglePopup}
                />
              ) : (
                <Register
                  showPassword={showPassword}
                  setShowPassword={setShowPassword}
                  isOpenning={isOpenning}
                  setIsOpenning={setIsOpenning}
                />
              )}

              <div className="social__login">
                <span className="or">Hoặc tiếp tục bằng</span>
                <span className="social__list">
                  <span className="fb__icon social__icon">
                    <TfiFacebook />
                  </span>
                  <span className="gg__icon social__icon">
                    <FcGoogle />
                  </span>
                </span>
                <span className="conditional">
                  Bằng việc tiếp tục, bạn đã chấp nhận điều khoản sử dụng
                </span>
              </div>
            </div>
          </div>
          <div className="popup__item__right">
            <div className="right__contents">
              <img
                alt="mua sắm ngay"
                src="https://salt.tikicdn.com/ts/upload/eb/f3/a3/25b2ccba8f33a5157f161b6a50f64a60.png"
              />
              <p>Mua sắm tại Agnes Shop</p>
              <span>Siêu ưu đãi mỗi ngày</span>
            </div>
          </div>
        </div>
        <span className="close__icon" onClick={closePopup}>
          <GrClose />
        </span>
      </div>
    </section>
  );
}

export default Auth;
