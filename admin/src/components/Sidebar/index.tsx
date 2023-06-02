import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Layout, Menu } from "antd";
import {
  DashboardOutlined,
  TeamOutlined,
  ProfileOutlined,
  LogoutOutlined,
  AppstoreOutlined,
  SmileOutlined,
  ApiOutlined,
  IdcardOutlined,
  SettingOutlined,
  StarOutlined,
} from "@ant-design/icons";
import "./index.css";

type MenuItem = Required<MenuProps>["items"][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[]
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem;
}
const menuItems: MenuItem[] = [
  getItem("Dashboard", "dashboard", <DashboardOutlined />),
  getItem("Products", "products", <ProfileOutlined />),
  getItem("Users", "users", <TeamOutlined />),
  getItem("Categories", "categories", <AppstoreOutlined />),
  getItem("Collects", "collects", <SmileOutlined />),
  getItem("Rates", "rates", <StarOutlined />),
  getItem("Routes", "routes", <ApiOutlined />),
  getItem("My Profiles", "profiles", <IdcardOutlined />),
  getItem("Settings", "settings", <SettingOutlined />),
  getItem("Logout", "logout", <LogoutOutlined />),
];

const Sidebar: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const { Sider } = Layout;
  const navigate = useNavigate();
  return (
    <Sider
      collapsible
      collapsed={collapsed}
      onCollapse={(value) => setCollapsed(value)}
    >
      <div
        style={{
          height: 32,
          margin: 16,
          background: "rgba(255, 255, 255, 0.2)",
        }}
      />
      <Menu
        theme="dark"
        defaultSelectedKeys={["dashboard"]}
        mode="inline"
        items={menuItems}
        onSelect={({ item, key, keyPath, selectedKeys, domEvent }) =>
          navigate(key)
        }
      />
    </Sider>
  );
};

export default Sidebar;
