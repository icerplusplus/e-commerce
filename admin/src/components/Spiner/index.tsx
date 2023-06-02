import React from "react";
import "./index.css";
import { Spin } from "antd";

const Spiner = () => {
  return (
    <div className="spin">
      <Spin size="large" />
    </div>
  );
};

export default Spiner;
