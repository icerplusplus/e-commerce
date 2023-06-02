import {useState} from 'react';
import {TfiFacebook, FcGoogle, GrClose} from '../../libs/icon';
import Login from './Login';
import Register from './Register';

import './index.css';

enum AuthType {
  LOGIN = 'LOGIN',
  REGISTER = 'REGISTER',
}

interface Props {
  toggle: () => void; // show or hide the auth form
}

const Auth: React.FC<Props> = ({toggle}) => {
  const [formType, setFormType] = useState<string>(AuthType.LOGIN);

  const toggleFormType = () => {
    if (formType === AuthType.LOGIN) setFormType(AuthType.REGISTER);
    else setFormType(AuthType.LOGIN);
  };

  return (
    <section className={`popup__login`}>
      <div className="__container__ popup__box">
        <div className="popup__item">
          <div className="popup__item__left">
            <div className="left__contents">
              {formType === AuthType.LOGIN ? (
                <Login changeForm={toggleFormType} closeAuthForm={toggle} />
              ) : (
                <Register changeForm={toggleFormType} closeAuthForm={toggle} />
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
        {/* TODO: Close form */}
        <span className="close__icon" onClick={toggle}>
          <GrClose />
        </span>
      </div>
    </section>
  );
};

export default Auth;
