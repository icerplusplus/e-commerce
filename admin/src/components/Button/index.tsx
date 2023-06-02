import React from "react";
import { LoadingOutlined } from "@ant-design/icons";
import { Colors } from "../../libs";

import "./index.css";

interface Props {
  children?: React.ReactNode;
  title?: string;
  icon?: React.ReactNode;
  isLoading?: boolean | true;
  type?:
    | "primary"
    | "secondary"
    | "milk"
    | "orange"
    | "blue"
    | "dark-blue"
    | "green"
    | "dark"
    | "dark-green";
  showBorder?: boolean | true;
  onClick?: void | Promise<void>;
}

const Button: React.FC<Props> = ({
  children,
  title,
  icon,
  isLoading,
  type,
  showBorder,
  onClick,
  ...props
}) => {
  const style = {
    backgroundColor: Colors?.[type] ?? Colors?.primary,
    border: !showBorder && "none",
  };

  return (
    <button className="btn" style={style} onClick={onClick} {...props}>
      {icon && <span>{icon}</span>}
      {isLoading && <span>{<LoadingOutlined className="btn-icon" />}</span>}
      <span>{children ?? title?.toString().toUpperCase()}</span>
    </button>
  );
};

export default Button;
