import React, {useState} from "react";
import {ICartReducer} from "@/types";
import {useAppDispatch} from "@/hooks";
import {Button, Section} from "@/components";
import {RiDeleteBinLine} from "react-icons/ri";
import CartItem from "./CartItem";
import {currency} from "../../../libs";
import {getTotal, removeAllItemsInCart, updateAllState} from "@/stores/reducer";

interface Props {
  data: ICartReducer;
}

const CartTable: React.FC<Props> = ({data}) => {
  const [allChecked, setAllChecked] = useState(false);
  const ditpatch = useAppDispatch();

  const isAllItemsChecked =
    data?.products?.filter((item) => !item.state).length === 0;

  const handleRemoveAll = () => ditpatch(removeAllItemsInCart());
  const handleChangeStateOfProducts = (value: any) => {
    setAllChecked(value);

    // handle update all state of products in cart
    ditpatch(updateAllState(value));

    //reset total price
    ditpatch(getTotal());
  };

  return (
    <Section className="md:flex md:items-center md:justify-center md:bg-transparent">
      <div className={`flex flex-col md:flex-row justify-between`}>
        {/* Left side  */}
        <div className="flex flex-col skt__container">
          {/* Header */}
          <div className="md:grid md:grid-cols-[388px_170px_120px_120px_30px] items-center w-full md:mb-2 pb-4 md:p-4 bg-white rounded">
            <div className="flex flex-row gap-3">
              <input
                type="checkbox"
                className="w-[18px] h-[18px]"
                onChange={(e) => handleChangeStateOfProducts(e.target.checked)}
                checked={isAllItemsChecked}
              />
              <span className="text-sm">Tất cả ({data?.size} sản phẩm)</span>
            </div>
            <span className="text-[13px] hidden md:block">Đơn giá</span>
            <span className="text-[13px] hidden md:block">Số lượng</span>
            <span className="text-[13px] hidden md:block">Thành tiền</span>
            <div className="hidden md:flex md:justify-end md:items-center">
              <RiDeleteBinLine
                className="w-[18px] h-[18px] cursor-pointer right-0 text-[#9e9d9d]"
                onClick={handleRemoveAll}
              />
            </div>
          </div>
          {/* Products list  */}
          {data?.products?.map((product) => (
            <CartItem
              data={product}
              checked={product.state || allChecked}
              key={product?.id}
            />
          ))}
        </div>
        {/* Right side  */}
        <div className="skt__container rounded md:ml-3 w-full flex flex-col">
          {/* Total form  */}
          <div className="bg-white md:px-4 py-4 border-b border-solid border-t-0 border-l-0 border-r-0 border-[#e7e7e7] rounded-t">
            <div className="flex flex-row justify-between text-sm text-[#333333] mb-3">
              <span>Tạm tính</span>
              <span>{currency(data?.tmpTotal || 0)}</span>
            </div>
            <div className="flex flex-row justify-between text-sm text-[#333333]">
              <span>Giảm giá</span>
              <span>{currency(data?.discount || 0)}</span>
            </div>
          </div>
          <div className="bg-white md:px-4 py-4 rounded-b">
            <div className="flex flex-row justify-between text-sm text-[#333333] whitespace-nowrap space-x-3">
              <span>Tổng tiền</span>
              <span className="flex flex-col">
                <p className="text-red text-base text-right font-semibold mb-1 whitespace-nowrap">
                  {data?.total === 0
                    ? "Vui lòng chọn sản phẩm"
                    : currency(data?.total || 0)}
                </p>
                <span className="text-xs text-right">
                  (Đã bao gồm VAT nếu có)
                </span>
              </span>
            </div>
          </div>
          <Button title={`Mua hàng (${data.quantityBuy})`} />
        </div>
      </div>
    </Section>
  );
};

export default CartTable;
