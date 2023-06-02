import clsx from "clsx";
import React from "react";

interface Props {
  children?: React.ReactNode;
  render?: () => React.ReactNode;
  className?: string | React.CSSProperties;
}

const List: React.FC<Props> = ({children, render, className}) => {
  return (
    <div className={clsx([`flex flex-col items-start w-full`, className])}>
      <div className="list">{render ? render() : children}</div>
    </div>
  );
};

export default List;
