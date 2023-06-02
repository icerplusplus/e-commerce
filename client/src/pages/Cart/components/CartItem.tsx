import React, {useEffect, useState} from 'react';
import {IProduct} from '@/types';
import {useAppDispatch, useAppNavigate} from '@/hooks';
import {NewBadge} from '@/assets';
import {currency} from '../../../libs';
import {BiMinus} from 'react-icons/bi';
import {BsPlus} from 'react-icons/bs';
import {RiDeleteBinLine} from 'react-icons/ri';
import {
  getTotal,
  removeCartItemById,
  updateQuantityById,
  updateStateOfItem,
} from '@/stores/reducer';

interface Props {
  data?: IProduct;
  checked: boolean | false;
}

const CartItem: React.FC<Props> = ({data, checked}) => {
  const {changeToPage} = useAppNavigate();
  const dispatch = useAppDispatch();
  const [itemIsChecked, setItemIsChecked] = useState(checked);

  const handleIncreasing = () => {
    const info = {
      id: data?.id,
      quantity: data?.quantity ? data?.quantity + 1 : 1,
    };
    dispatch(updateQuantityById(info));

    //reset total price
    dispatch(getTotal());
  };

  const handleDescreasing = () => {
    if (data?.quantity && data?.quantity > 1) {
      const info = {id: data.id, quantity: data.quantity - 1};
      dispatch(updateQuantityById(info));

      //reset total price
      dispatch(getTotal());
    }
  };

  const handleRemoveProductById = (id: string | number) => {
    dispatch(removeCartItemById(id));
    //reset total price
    dispatch(getTotal());
  };

  const handleUpdateStateOfProduct = (id: string | number, state: boolean) => {
    setItemIsChecked(state);
    dispatch(updateStateOfItem({id, state}));
    dispatch(getTotal());
  };

  useEffect(() => {
    setItemIsChecked(checked);
  }, [checked]);

  return (
    <div className="md:grid md:grid-cols-[388px_170px_120px_120px_30px] py-2 md:py-12 md:px-4 bg-white rounded my-1">
      <div className="flex flex-row justify-between items-center space-x-4">
        <input
          type="checkbox"
          className="min-w-[18px] min-h-[18px] md:mr-2"
          checked={itemIsChecked}
          // onClick={() => }
          onChange={(e) =>
            handleUpdateStateOfProduct(data?.id || '', e.target.checked)
          }
          readOnly
        />
        <img
          src={data?.thumbnails?.[0]}
          alt={data?.title}
          className="max-w-[78px] max-h-[80x] md:mx-2"
        />
        <div className="flex flex-col md:pr-4 space-y-2">
          <p
            className="text-[13px] leading-5 text-[#242424] text-ellipsis line-clamp-2 cursor-pointer hover:text-blue"
            onClick={() => {
              changeToPage(`/product/detail/${data?.id}`);
            }}
          >
            {data?.title}
          </p>
          <div className="md:hidden">
            <span className="text-red font-semibold mr-1">
              {data?.sale_price && data?.sale_price > 0
                ? currency(data?.sale_price)
                : currency(data?.root_price || 0)}
            </span>

            {data?.sale_price && data?.sale_price > 0 && (
              <del className="text-xs line-through text-[#999999] font-medium">
                {currency(data?.root_price || 0)}
              </del>
            )}
          </div>
          <div className="flex flex-row justify-between space-x-2">
            <div className="flex justify-center items-center gap-1 py-1 px-2 bg-[#f2f0fe] text-xs font-semibold text-[#7263f3] border-[#402de1] border-[0.3px] border-dashed rounded">
              <img
                src="https://frontend.tikicdn.com/_desktop-next/static/img/fire_icon.svg"
                alt=""
              />
              <span className="whitespace-nowrap">
                Thương hiệu của {data?.brand_name}
              </span>
            </div>
            <div className="hidden md:flex md:items-center">
              <img src={NewBadge} alt="new-icon" className="max-w-[42px]" />
            </div>
          </div>
          <div className="flex pt-2 w-full md:hidden">
            <div
              className={`cursor-pointer border-solid border-[1px] border-[#cacaca] rounded-l w-[26px] h-[26px] flex justify-center items-center z-[1]`}
              onClick={handleDescreasing}
            >
              <BiMinus
                className={`w-[18px] h-[23px] ${
                  data?.quantity === 1 ? 'opacity-20 cursor-not-allowed' : ''
                }`}
              />
            </div>
            <div className="border-solid border-[1px] border-[#cacaca] w-8 h-[26px] flex justify-center items-center z-[2]">
              <input
                className=" w-6 outline-none border-none text-center text-[15px]"
                type={'text'}
                value={data?.quantity} // quantityBuy
                readOnly
              />
            </div>
            <div
              className="cursor-pointer border-solid border-[1px] border-[#cacaca] rounded-r w-[26px] h-[26px]  flex justify-center items-center z-[1]"
              onClick={handleIncreasing}
            >
              <BsPlus className="w-[23px] h-[23px] " />
            </div>
            <div
              className="flex items-center justify-end w-full cursor-pointer"
              onClick={() => handleRemoveProductById(data?.id ?? '')}
            >
              <span className="text-[13px] text-blue-500">Xóa</span>
            </div>
          </div>
        </div>
      </div>
      <div className="hidden md:flex md:items-center">
        <span className="text-[13px] text-[#242424] font-semibold mr-1">
          {data?.sale_price && data?.sale_price > 0
            ? currency(data?.sale_price)
            : currency(data?.root_price || 0)}
        </span>

        {data?.discount !== 0 && (
          <del className="text-[11px] line-through text-[#999999] font-medium">
            {currency(data?.root_price || 0)}
          </del>
        )}
      </div>
      <div className="hidden md:flex md:items-center">
        <div className="text-[15px] py-4">
          <div className="flex py-2 ">
            <div
              className={`cursor-pointer border-solid border-[1px] border-[#cacaca] rounded-l w-[26px] h-[26px] flex justify-center items-center z-[1]`}
              onClick={handleDescreasing}
            >
              <BiMinus
                className={`w-[18px] h-[23px] ${
                  data?.quantity === 1 ? 'opacity-20 cursor-not-allowed' : ''
                }`}
              />
            </div>
            <div className="border-solid border-[1px] border-[#cacaca] w-8 h-[26px] flex justify-center items-center z-[2]">
              <input
                className=" w-6 outline-none border-none text-center text-[15px]"
                type={'text'}
                value={data?.quantity} // quantityBuy
                readOnly
              />
            </div>
            <div
              className="cursor-pointer border-solid border-[1px] border-[#cacaca] rounded-r w-[26px] h-[26px]  flex justify-center items-center z-[1]"
              onClick={handleIncreasing}
            >
              <BsPlus className="w-[23px] h-[23px] " />
            </div>
          </div>
        </div>
      </div>
      <div className="hidden md:flex md:items-center">
        <span className="text-[13px] text-red font-semibold">
          {data?.sale_price && data?.sale_price > 0
            ? currency(data?.sale_price * (data?.quantity || 1))
            : currency((data?.root_price || 0) * (data?.quantity || 1))}
        </span>
      </div>
      <div className="hidden md:flex md:items-center md:justify-end ">
        <RiDeleteBinLine
          className="w-[18px] h-[18px] cursor-pointer text-[#9e9d9d]"
          onClick={() => handleRemoveProductById(data?.id ?? '')}
        />
      </div>
    </div>
  );
};

export default CartItem;
