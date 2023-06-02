import React from 'react';

const AddressInput = () => {
  return (
    <div className="p-3 rounded-l-sm border-b border-divider">
      <div className="text-[#38383d] text-sm font-bold pb-3">
        Địa chỉ nhận hàng
      </div>
      <div className="text-[12px] whitespace-nowrap underline mb-1">
        Q. 1, P. Bến Nghé, Hồ Chí Minh
      </div>
      <div className="text-xs text-blue-500 font-bold cursor-pointer">
        Đổi địa chỉ
      </div>
    </div>
  );
};

export default AddressInput;
