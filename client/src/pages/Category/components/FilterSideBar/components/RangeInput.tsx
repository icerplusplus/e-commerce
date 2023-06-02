import React, {useRef, useState} from 'react';
import {BiMinus} from 'react-icons/bi';

interface Props {
  filters: any;
  filterByPriceRange: (start: number, end: number) => void;
}

const RangeInput: React.FC<Props> = ({filters, filterByPriceRange}) => {
  const priceRangeStart = useRef<number>(filters._priceRangeStart);
  const [priceRangeEnd, setPriceRangeEnd] = useState<number>(
    filters._priceRangeEnd,
  );

  const onPriceRangeStartChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);

    if (value && value !== 0 && value >= 1000) {
      priceRangeStart.current = value;
      setPriceRangeEnd(value * 10);
    } else {
      priceRangeStart.current = 0;
      setPriceRangeEnd(0);
    }
  };

  const onPriceRangeEndChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (!value) setPriceRangeEnd(0);
    else setPriceRangeEnd(value);
  };

  const onPriceRangeSumit = (start: number, end: number) => {
    priceRangeEnd > 0 && filterByPriceRange(start, end);
  };

  return (
    <div className="p-3 rounded-l-sm border-b border-divider">
      <div className="text-[#38383d] text-sm font-bold pb-3">Giá</div>
      <div className="max-w-[200px] mb-2">
        <div className="mb-2 text-[12px] text-[#808089] ">Chọn khoảng giá</div>
        <div className="flex flex-row justify-between items-center ">
          <input
            type="number"
            min={0}
            defaultValue={priceRangeStart.current}
            onChange={onPriceRangeStartChange}
            className="max-w-[5rem] text-[12px] p-2 rounded-md border-solid border-[0.5px] border-[#c0c0c0] outline-none"
          />
          <BiMinus className="text-[#c0c0c0]" />
          <input
            type="number"
            min={0}
            value={priceRangeEnd}
            onChange={onPriceRangeEndChange}
            onBlur={(e) => !e.target.value && setPriceRangeEnd(0)}
            className="max-w-[5rem] text-[12px] p-2 rounded-md border-solid border-[0.5px] border-[#c0c0c0] outline-none "
          />
        </div>
      </div>
      <button
        className="rounded outline-none border-[0.5px] border-main bg-white text-main text-xs w-full p-1 cursor-pointer hover:text-white hover:bg-main hover:shadow-button"
        onClick={() =>
          onPriceRangeSumit(priceRangeStart.current, priceRangeEnd)
        }
      >
        Áp dụng
      </button>
    </div>
  );
};

export default RangeInput;
