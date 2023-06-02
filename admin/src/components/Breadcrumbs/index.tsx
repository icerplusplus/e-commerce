import React from "react";
import { useLocation } from "react-router-dom";
import { Breadcrumb } from "antd";

const Breadcrumbs: React.FC = () => {
  const location = useLocation();

  const items = location?.pathname
    ?.split("/")
    .filter((path) => path !== "")
    .map((path) => ({
      title: path.replace(path.charAt(0), path.charAt(0).toUpperCase()),
    }));

  return <Breadcrumb style={{ margin: "16px 0" }} items={items} />;
};

export default Breadcrumbs;
