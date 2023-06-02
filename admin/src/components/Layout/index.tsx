import React from "react";
import { App, Layout, theme } from "antd";
import Breadcrumbs from "../../components/Breadcrumbs";
import Sidebar from "../Sidebar";
import { Router } from "../../configs";

function Layyout() {
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const { Header, Content, Footer } = Layout;

  return (
    <App>
      <Layout style={{ minHeight: "100vh", overflowY: "hidden" }}>
        <Sidebar />
        <Layout className="site-layout">
          <Header style={{ padding: 0, background: colorBgContainer }} />
          <Content style={{ margin: "0 16px" }}>
            <Breadcrumbs />
            <div
              style={{
                padding: 24,
                minHeight: "100%",
                background: colorBgContainer,
              }}
            >
              {/* Router  */}
              <Router />
            </div>
          </Content>
          <Footer style={{ textAlign: "center" }}>
            Icer Shop Admin Dashboard created by Icer Plus Plus
          </Footer>
        </Layout>
      </Layout>
    </App>
  );
}

export default Layyout;
