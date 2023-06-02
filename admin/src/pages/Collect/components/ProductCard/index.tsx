import { Divider } from "antd";
import { fallback } from "../../../../libs";
import { ProductType } from "../../../types";
import { StarFilled } from "@ant-design/icons";
import currencyFormatter from "currency-formatter";
import { useDrag } from "react-dnd";

import "./index.css";

const ProductCard = ({ data }: { data: ProductType }) => {
  const thumbnail = data?.thumbnails[0] ? data?.thumbnails[0] : fallback;
  const price =
    data?.discount_rate !== 0 ? (
      <>
        <span>
          {currencyFormatter.format(data?.sale_price || 0, { locale: "vn-VN" })}
        </span>
        <span className="p-1 text-small">-{data?.discount_rate}%</span>
      </>
    ) : (
      currencyFormatter.format(data?.root_price || 0, { locale: "vn-VN" })
    );

  const [{ opacity }, dragRef] = useDrag(
    () => ({
      type: "element",
      item: { id: data?.id },
      collect: (monitor) => ({
        opacity: monitor.isDragging() ? 0.5 : 1,
      }),
    }),
    []
  );

  return (
    <div className="product-card" ref={dragRef} style={{ opacity }}>
      <img src={thumbnail} alt={data?.title} className="product-thumnail" />
      <div className="info">
        <span className="product-title truncate">{data?.title}</span>
        <div>
          <span>
            {data?.rating_average} <StarFilled className="star" size={13} />
          </span>
          <Divider type="vertical" />
          <span className="product-sold">{data?.quantity_sold} sold</span>
        </div>
        <div className="product-price">{price}</div>
      </div>
    </div>
  );
};

export default ProductCard;
