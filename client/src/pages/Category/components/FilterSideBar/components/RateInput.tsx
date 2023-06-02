import {Rate} from 'antd';
import React from 'react';

interface Props {
  filterByRating: (value: number) => void;
}

const RateInput: React.FC<Props> = ({filterByRating}) => {
  return (
    <div className="p-3 rounded-l-sm border-b border-divider">
      <div className="text-[#38383d] text-sm font-bold pb-3">Đánh giá</div>
      {[5, 4, 3].map((rate: number) => (
        <div
          className="py-1 flex flex-row items-center cursor-pointer"
          key={`rating-${rate}`}
          onClick={() => filterByRating(rate)}
        >
          <Rate disabled value={rate} className="text-xs text-star" />
          <span className="ml-2 text-xs font-semibold">từ {rate} sao</span>
        </div>
      ))}
    </div>
  );
};

export default RateInput;
