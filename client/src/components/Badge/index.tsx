import React from "react";
import { AiOutlineShoppingCart } from "../../libs/icon";

function Badge() {
  return (
    <span className="relative inline-block">
      <AiOutlineShoppingCart className="w-8 h-8 text-white" />
      <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-yellow-300 rounded-full">
        0
      </span>
    </span>
  );
}

export default Badge;
