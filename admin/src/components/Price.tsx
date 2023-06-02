import React from "react";
import currencyFormatter from "currency-formatter";
import { Divider } from "antd";
import { clsx } from "clsx";

interface Props {
  rootValue: number | string;
  saleValue?: number | string;
}

const Price: React.FC<Props> = ({ rootValue, saleValue }) => {
  return (
    <>
      <span className="text-italic">Price: </span>
      <span
        className={clsx([
          saleValue === 0
            ? "text-bold text-red"
            : "text-italic text-lineThrough",
        ])}
      >
        {currencyFormatter.format(rootValue, { locale: "vn-VN" })}
      </span>
      {saleValue !== 0 && (
        <>
          <Divider type="vertical" />

          <span className="text-bold text-red">
            {currencyFormatter.format(saleValue || 0, { locale: "vn-VN" })}
          </span>
        </>
      )}
    </>
  );
};

export default Price;
