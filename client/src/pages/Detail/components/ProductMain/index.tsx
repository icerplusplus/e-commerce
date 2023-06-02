import React, {useCallback, useEffect, useMemo, useRef, useState} from "react";
import {IProduct} from "@/types";
import clsx from "clsx";
import {Divider, Rate} from "antd";
import {Colors, currency, fallback} from "../../../../libs";
import {NewBadge} from "@/assets";
import {BiMinus, BiPlus} from "react-icons/bi";
import {Button, List, Section} from "@/components";
import {addToCart} from "@/stores/reducer";
import {useAppDispatch} from "@/hooks";

import "./index.css";

interface Props {
  data: IProduct;
}

interface ThumbnailSliderProps {
  thumbnails: string[];
  onItemChange?: (index: number) => void;
  onItemSelected?: (index: number) => void;
  onSlide?: boolean | true;
  duration?: 2000 | 4000 | number;
}

const filterAttributes = (product: IProduct) => {
  const thumbnails =
    product?.thumbnails && product?.thumbnails?.length > 1
      ? [product.thumbnails[0]]
      : [fallback];
  product.thumbnails = thumbnails;

  delete product?.short_description;
  delete product?.description;
  delete product?.quantity_sold;
  delete product?.quantity_in_stock;
  delete product?.rating_average;
  delete product?.review_count;
  delete product?.category_data;
  delete product?.information;
  delete product?.createdAt;
  delete product?.updatedAt;
  return product;
};

const ThumbnailSlider: React.FC<ThumbnailSliderProps> = ({
  thumbnails,
  onItemChange,
  onItemSelected,
  onSlide,
  duration,
}) => {
  const thumbnailActiveRef = useRef<number>(0);

  const intervalSlideRef = useRef<any>(-1);
  const nextThumbnail = () => {
    // Reset interval
    if (intervalSlideRef.current) clearInterval(intervalSlideRef.current);
    if (onSlide) {
      const intervalSlideId = setInterval(() => {
        const indexNext =
          thumbnailActiveRef.current < thumbnails?.length - 1
            ? thumbnailActiveRef.current + 1
            : 0;
        onItemChange?.(indexNext);
        thumbnailActiveRef.current = indexNext;
      }, duration ?? 2000);
      intervalSlideRef.current = intervalSlideId;
    }
  };

  const onItemClick = useCallback(
    (index: number) => {
      // replace thumbnail selected
      thumbnailActiveRef.current = index;

      // show thumbnail in parent component
      onItemSelected?.(index);

      // Continue to slide next thumbnail
      nextThumbnail();
    },
    [thumbnailActiveRef],
  );

  useEffect(() => {
    // run the firse time of slides
    nextThumbnail();

    // clear interval id when this component be unmount to prepare for new interval
    return () =>
      intervalSlideRef.current && clearInterval(intervalSlideRef.current);
  }, [thumbnails, thumbnailActiveRef.current]);

  return (
    <List className="py-2">
      {thumbnails?.map((thumbnail, idx) => {
        return (
          <div
            key={thumbnail}
            className={clsx([
              `max-w-[64px] 
                max-h-[64px] 
                cursor-pointer`,
            ])}
            onClick={() => onItemClick(idx)}
          >
            <img
              className={clsx([
                `object-cover 
              w-[64px] 
              rounded `,
                thumbnailActiveRef.current === idx &&
                  `border-solid 
                border-[1px] 
                border-main`,
              ])}
              src={thumbnail}
              alt={thumbnail}
            />
          </div>
        );
      })}
    </List>
  );
};

export const ProductMain: React.FC<Props> = ({data}) => {
  const [thumbnailActive, setThumbnailActive] = useState<number>(0);
  const [quantityBuy, setQuantityBuy] = useState<number>(1);

  const onThumbnailChange = (idx: number) => setThumbnailActive(idx);
  const onItemSelected = (idx: number) => setThumbnailActive(idx);

  // store
  const dispatch = useAppDispatch();

  const cartActions = {
    handleIncreasing: () => setQuantityBuy(quantityBuy + 1),
    handleDescreasing: () => quantityBuy > 1 && setQuantityBuy(quantityBuy - 1),
    handleAddToCart: () => {
      // filter data to cart item

      const product = {
        ...data,
        state: false,
        quantity: quantityBuy,
        price:
          data.sale_price && data.sale_price > 0
            ? data.sale_price
            : data.root_price,
        discount: data.discount,
      };

      // TODO: ADD PRODUCT TO CART
      dispatch(addToCart(filterAttributes(product)));
    },
  };

  useEffect(() => setQuantityBuy(1), []);

  if (!data) return <>Skeleton</>;

  return (
    <Section className="md:flex md:flex-row">
      {/* Left section - Product silder images */}
      <div
        className={`
          w-full
          p-4
        bg-white
          rounded-l-md
          lg:w-[40%]`}
      >
        <img
          src={data?.thumbnails?.[thumbnailActive]}
          className={`
            object-cover
            w-full 
            lg:w-[444px] 
            lg:h-[444px]
          `}
          alt={data?.title}
        />
        <ThumbnailSlider
          thumbnails={data?.thumbnails ?? []}
          onItemChange={onThumbnailChange}
          onItemSelected={onItemSelected}
          onSlide
          duration={4000}
        />
      </div>
      {/* Right section - Product infomation */}
      <div
        className={`
            p-4
            bg-white 
            rounded-r-md
            lg:w-[60%] 
        `}
      >
        {/* Brand name of product */}
        <span className="text-sm">
          Thương hiệu: <span className="text-main">{data?.brand_name}</span>
        </span>
        {/* Product name */}
        <h1
          className={`
            text-prod
            text-2xl 
            font-light 
            break-words 
            py-2
        `}
        >
          {data?.title}
        </h1>
        {/* Avg rating */}
        <div
          className={`
            text-sm 
            font-light 
            space-x-2 
            pb-2
            flex 
            items-center 
          `}
        >
          <Rate disabled value={data?.rating_average} style={styles.star} />
          <span>({data?.review_count} đánh giá)</span>
          <Divider type="vertical" className="text-slate-700" />
          <span>Đã bán {data?.quantity_sold}</span>
        </div>

        {/* Prices infomation of product */}
        <div className=" bg-[#fafafa] rounded p-4">
          <div className="flex space-x-2 pb-2">
            <div
              className={clsx([
                `text-3xl 
                  font-semibold`,
                data?.discount_rate && data?.discount_rate > 0
                  ? "text-red"
                  : "text-black",
              ])}
            >
              <span>{currency(data?.sale_price || 0)}</span>
            </div>
            <div
              className={`
                flex-row 
                items-end 
                text-sm 
                space-x-2 
                font-semibold
                ${data?.discount_rate === 0 ? "hidden " : "flex "}
              `}
            >
              <span className="line-through text-[#808089] font-medium">
                {currency(data?.root_price || 0)}
              </span>
              <span className="text-red">-{data?.discount_rate}%</span>
            </div>
          </div>
          <div className="flex flex-row space-x-2">
            <div
              className={`
                flex 
                justify-center 
                items-center 
                gap-1 
                py-1 
                px-2 
                bg-[#f2f0fe] 
                text-sm 
                font-semibold 
                text-[#7263f3] 
                border-[#402de1] 
                border-[0.3px] 
                border-dashed 
                rounded
              `}
            >
              <img
                src="https://frontend.tikicdn.com/_desktop-next/static/img/fire_icon.svg"
                alt=""
                className=""
              />
              May mắn giảm thêm {currency(15000)}
            </div>
            <div className="flex items-center">
              <img src={NewBadge} alt="new-icon" className="max-w-[42px]" />
            </div>
          </div>
        </div>

        {/* Quantity product handler */}
        <div className="text-[15px] py-4">
          <div>Số lượng</div>
          <div className="flex py-2">
            <div
              className={`
                cursor-pointer 
                border-solid 
                border-[0.7px] 
                border-[#ececec] 
                rounded-l 
                w-8 
                h-8 
                flex 
                justify-center 
                items-center
              `}
              onClick={cartActions.handleDescreasing}
            >
              <BiMinus
                className={`
                    w-6 
                    h-6 
                    font-thin  
                    ${quantityBuy === 1 && "opacity-20 cursor-not-allowed"}
                `}
              />
            </div>
            <div
              className={`
                border-solid 
                border-[0.7px] 
                border-[#ececec] 
                w-10 
                h-8 
                flex 
                justify-center 
                items-center
              `}
            >
              <input
                className={`
                  outline-none 
                  border-none 
                  w-6 h-6 
                  text-center 
                  text-lg
                `}
                type={"text"}
                value={quantityBuy}
                readOnly
              />
            </div>
            <div
              className={`
                cursor-pointer 
                border-solid 
                border-[0.7px] 
                border-[#ececec] 
                rounded-r 
                w-8 
                h-8 
                flex 
                justify-center 
                items-center
              `}
            >
              <BiPlus
                className=" w-6 h-6"
                onClick={cartActions.handleIncreasing}
              />
            </div>
          </div>
        </div>
        {/* Add to cart button */}
        <div className="lg:max-w-[250px]">
          <Button
            key="add"
            onClick={cartActions.handleAddToCart}
            title="Thêm vào giỏ hàng"
          />
        </div>
      </div>
    </Section>
  );
};

const styles = {
  star: {
    color: Colors.star,
    marginRight: "0.5rem",
    fontSize: "17px",
  },
};
