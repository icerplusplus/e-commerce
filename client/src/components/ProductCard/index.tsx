import {Divider} from "antd";
import {fallback} from "../../libs";
import {IProduct} from "../../types";
import {StarFilled} from "@ant-design/icons";
import currencyFormatter from "currency-formatter";
import {useAppNavigate} from "../../hooks";

import "./index.css";

interface Props {
  data: IProduct;
}

const ProductCard: React.FC<Props> = ({data}) => {
  const {changeToPage} = useAppNavigate();
  const thumbnail = data?.thumbnails ? data?.thumbnails[0] : fallback;
  const price =
    data?.discount_rate !== 0 ? (
      <>
        <span>
          {currencyFormatter.format(data?.sale_price || 0, {locale: "vn-VN"})}
        </span>
        <span className="p-1 text-[14px]">-{data?.discount_rate}%</span>
      </>
    ) : (
      currencyFormatter.format(data?.root_price || 0, {locale: "vn-VN"})
    );

  return (
    <div
      className="
        product-card 
        bg-white 
        rounded-md
      "
      onClick={() => changeToPage(`/product/detail/${data?.id}`)}
    >
      <img src={thumbnail} alt={data?.title} className="product-thumnail" />
      <div className="info">
        <span className="product-title truncates">{data?.title}</span>
        <div>
          <span className="items-center justify-center">
            {data?.rating_average} <StarFilled className="star" size={13} />
          </span>
          <Divider type="vertical" />
          <span className="product-sold">Đã bán: {data?.quantity_sold}</span>
        </div>
        <div className="product-price">{price}</div>
      </div>
    </div>
  );
};

export default ProductCard;
