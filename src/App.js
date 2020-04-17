import React from "react";
import "./App.css";
import { Layout, Menu } from "antd";
import createHistory from 'history/createHashHistory';

import { HashRouter as Router, Route } from "react-router-dom";
import Department from "./pages/deployment/index";

const { Header, Content, Footer, Sider } = Layout;
const history = createHistory();

export default () => (
  <div id="components-layout-demo-responsive">
    <Layout>
      <Sider
        breakpoint="lg"
        collapsedWidth="0"
        onBreakpoint={(broken) => {
          console.log(broken);
        }}
        onCollapse={(collapsed, type) => {
          console.log(collapsed, type);
        }}
      >
        <div className="logo">activiti study</div>
        <Menu theme="dark" mode="inline" defaultSelectedKeys={["4"]} style={{height: 'calc(100vh - 100px)'}}>
          <Menu.Item key="deploymentView" onClick={() => {history.push("/deploymentView")}}>
            <span className="nav-text">
              流程实例
            </span>
          </Menu.Item>
          
        </Menu>
      </Sider>
      <Layout>
        <Header
          className="site-layout-sub-header-background"
          style={{ padding: 0 }}
        />
        <Content style={{ margin: "24px 16px 0" }}>
          <div
            className="site-layout-background"
            style={{ padding: 24, minHeight: 360, height: "calc(100vh - 160px)" }}
          >
            <Router>
            <Route path="/deploymentView" component={Department}/>
            </Router>
          </div>
        </Content>
        <Footer style={{ textAlign: "center" }}>
          create by tanghuibo
        </Footer>
      </Layout>
    </Layout>
  </div>
);
