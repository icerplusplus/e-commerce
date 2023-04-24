import React, { useEffect, useState } from "react";
import {
  AiOutlineAppstore,
  AiOutlineMenu,
  AiOutlineStar,
  BiSearchAlt,
  BiUser,
  CiLogin,
  IoMdArrowDropdown,
  RiBillLine,
  VscAccount,
} from "../../libs/icon";
import Badge from "../Badge";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { axiosRequestInterceptor } from "../../api";
import { Dropdown } from "antd";
import type { MenuProps } from "antd";
import { logoutAction } from "../../libs";
import LeftDrawer from "./LeftDrawer";

type Props = {
  togglePopup: () => void;
};

function Header({ togglePopup }: Props) {
  const [showOptions, setShowOptions] = useState(false);
  const [menuOptions, setMenuOptions] = useState<MenuProps["items"]>([]);
  const userInfo = useSelector((state) => state?.user || null);
  const cart = useSelector((state) => state?.cart);
  const accessToken = userInfo?.info?.accessToken;

  // drawer
  const [openDrawer, setOpenDrawer] = useState(false);

  // navigation
  const navigation = useNavigate();

  // store
  const dispatch = useDispatch();

  const toggleShowOptions = () => {
    setShowOptions(!showOptions);
  };

  const handleLogout = async () => {
    const interceptor = await axiosRequestInterceptor(userInfo, dispatch);
    try {
      await logoutAction(
        {
          headers: {
            token: `Bearer ${accessToken}`,
          },
        },
        dispatch,
        toggleShowOptions,
        interceptor
      );
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (userInfo.info?.username)
      setMenuOptions([
        {
          key: "orders",
          label: <p className="w-full">Đơn hàng của tôi</p>,
          icon: <RiBillLine />,
        },
        {
          key: "account",
          label: <p className="w-full">Tài khoản của tôi</p>,
          icon: <VscAccount />,
        },
        {
          key: "rates",
          label: <p className="w-full">Đánh giá sản phẩm</p>,
          icon: <AiOutlineStar />,
        },
        {
          key: "logout",
          label: (
            <p className="w-full" onClick={handleLogout}>
              Đăng xuất
            </p>
          ),
          icon: <CiLogin />,
        },
      ]);
  }, [userInfo]);

  return (
    <>
      <header className="bg-main w-full py-[2rem] px-[0.7rem] top-0 sticky z-10 lg:py-0 lg:px-0 lg:flex lg:flex-col lg:items-center lg:relative ">
        <div className="lg:flex lg:justify-between lg:gap-16 lg:py-[15px] lg:px-0 max-w-full lg:w-container w-full">
          <div className="flex flex-col lg:flex-row lg:w-full lg:justify-between">
            <div className="flex lg:block flex-row justify-between pb-2 lg:pb-0 w-full lg:w-fit">
              <div>
                <div className="flex flex-col">
                  <a href="/" className="">
                    <img
                      className="w-[60px] h-10"
                      src="https://salt.tikicdn.com/ts/upload/ae/f5/15/2228f38cf84d1b8451bb49e2c4537081.png"
                      alt="tiki-logo"
                    />
                  </a>
                  <a href="/" className="mt-1 hidden lg:block">
                    <img
                      src="https://salt.tikicdn.com/ts/upload/e5/1d/22/61ff572362f08ead7f34ce410a4a6f96.png"
                      alt="free-ship-badge"
                      width="83px"
                      height="12px"
                    />
                  </a>
                </div>
              </div>
              <div className="flex lg:hidden justify-center items-center text-white">
                <AiOutlineMenu size={24} onClick={() => setOpenDrawer(true)} />
              </div>
              <LeftDrawer
                menuOptions={menuOptions}
                openDrawer={openDrawer}
                setOpenDrawer={setOpenDrawer}
              />
            </div>
            <div className="flex flex-col lg:grow-[3] w-full">
              <div className="lg:flex flex-row w-full lg:justify-end">
                <div className="flex flex-row justify-center">
                  <div className=" w-full  relative block    lg:w-[626px]">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-2 md:hidden">
                      <BiSearchAlt size={23} className="text-slate-400" />
                    </span>
                    <div className="lg:flex lg:flex-col">
                      <input
                        type="text"
                        className="placeholder:text-slate-400 block w-full h-10 leading-10 text-[13px] outline-none border-none rounded-sm pl-[2.2rem] md:pl-2 pr-2  py-2 shadow-md "
                        placeholder="Tìm sản phẩm mong muốn..."
                        name="search"
                      />
                      <div className="mt-2 py-[0.2rem] relative hidden lg:block lg:text-[11px] lg:w-full">
                        <span className="w-fit lowercase text-white pr-[1rem]">
                          trái cây
                        </span>
                        <span className="w-fit lowercase text-white pr-[1rem]">
                          thịt, trứng
                        </span>
                        <span className="w-fit lowercase text-white pr-[1rem]">
                          rau củ quả
                        </span>
                        <span className="w-fit lowercase text-white pr-[1rem]">
                          sữa, bơ, phô mai
                        </span>
                        <span className="w-fit lowercase text-white pr-[1rem]">
                          hải sản
                        </span>
                        <span className="w-fit lowercase text-white pr-[1rem]">
                          gạo, mì ăn liền
                        </span>
                        <span className="w-fit lowercase text-white pr-[1rem]">
                          đồ uống, bia rượu
                        </span>
                        <span className="w-fit lowercase text-white pr-[1rem]">
                          bánh kẹo
                        </span>

                        <div className="lg:hidden lg:left-0 absolute top-0 right-0  mt-1 flex justify-center items-center text-white bg-main">
                          <AiOutlineAppstore size={30} />
                        </div>
                      </div>
                    </div>
                  </div>
                  <button className="hidden text-white cursor-pointer border-none outline-none bg-blue-500 md:flex justify-center items-center h-10 min-w-[120px] py-2.5 px-[15px] text-[13px] font-bold rounded-sm drop-shadow-md ">
                    <BiSearchAlt size={25} className="search-icon" />
                    <span>Tìm kiếm</span>
                  </button>
                </div>
                <div className="hidden lg:flex justify-center">
                  <div
                    className="flex flex-col justify-start cursor-pointer px-2.5 relative h-full"
                    onClick={() => {
                      !userInfo.info ? togglePopup() : toggleShowOptions();
                    }}
                  >
                    <Dropdown
                      menu={{ items: menuOptions }}
                      placement="bottomRight"
                      arrow
                      className="text-[1rem] "
                    >
                      <div className="flex flex-row h-1/2 w-full">
                        <BiUser color={"#fff"} size={35} />
                        <span className="flex flex-col items-start py-0.75 px-0.5 text-white h-full">
                          {/* <span className="text-[11px] ">Đăng nhập / Đăng ký</span> */}
                          {!userInfo.info ? (
                            <span className="text-[11px]">
                              Đăng nhập / Đăng ký
                            </span>
                          ) : (
                            <span className="text-[11px] ">Tài khoản</span>
                          )}

                          <p className="text-[13px] flex justify-center items-center">
                            {userInfo.info
                              ? userInfo.info?.username
                              : "Tài khoản"}
                            <IoMdArrowDropdown size={16} />
                          </p>
                        </span>
                      </div>
                    </Dropdown>
                  </div>
                  <div
                    className="relative flex justify-center cursor-pointer h-1/2"
                    onClick={() => {
                      // navigation("/your-cart");
                    }}
                  >
                    <Badge />

                    <span className="text-white text-xs font-extralight ml-[5px] mb-[3px]  flex items-end">
                      Giỏ hàng
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}

export default Header;
