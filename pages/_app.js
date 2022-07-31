import "../styles/globals.css";
import Link from "next/link";

import "antd/dist/antd.css";
// import { Layout } from "antd";
import Sidebars from "../components/Layouts/Sidebars";
import React from "react";
import TopBar from "../components/Layouts/TopBar";
import {
  LaptopOutlined,
  NotificationOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Breadcrumb, Layout, Menu } from "antd";

function MyApp({ Component, pageProps }) {
  const SidebarArray = [
    {
      name: "Dashboard",
      link: "/dashboard",
      // icon: <MdDashboard />
    },
    {
      name: "Project",
      link: "/project",
      // icon: <MdDashboard />
    },
    {
      name: "Timesheet",
      link: "/timeEntries",
      // icon: <MdDashboard />
    },
    {
      name: "Screenshot",
      link: "/screenshot",
      // icon: <MdDashboard />
    },
    {
      name: "Break",
      link: "/break",
      // icon: <MdDashboard />
    },
  ];
  const { Header, Content, Sider } = Layout;
  const items1 = ["1", "2", "3"].map((key) => ({
    key,
    label: `nav ${key}`,
  }));
  SidebarArray.map((item, index) => {
    const key = String(index + 1);

    return (
      <>
        <Link herf={item?.link}>{item?.name}</Link>
      </>
    );
  });
  return (
    <>
      <Layout>
        {/* <Header className="header">
          <div className="logo" />
          {/* <Menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={["2"]}
            items={items1}
          /> */}
        {/* </Header> */}
        <TopBar />
        <Layout>
          <Sider width={200} className="site-layout-background">
            <Menu
              mode="inline"
              // defaultSelectedKeys={["1"]}
              // defaultOpenKeys={["dashboard"]}
              style={{
                height: "100%",
                borderRight: 0,
              }}
            >
              {SidebarArray?.map((item) => (
                <Menu.Item key={item?.link}>
                  <Link href={item?.link}>{item?.name}</Link>
                </Menu.Item>
              ))}
            </Menu>
          </Sider>
          {/* <Sidebars /> */}
          <Layout
            style={{
              padding: "0 24px 24px",
            }}
          >
            {/* <Content
              className="site-layout-background"
              style={{
                padding: 24,
                margin: 0,
                minHeight: 280,
              }}
            > */}
            <div className="100vh">
              <Component {...pageProps} />
            </div>
            {/* </Content> */}
          </Layout>
        </Layout>
      </Layout>
      {/* <Layout>
        <div>
          <TopBar />
          <div className="flex bg-white">
            <Sidebars />
            <Component {...pageProps} />
          </div>
        </div>
      </Layout> */}
    </>
  );
}

export default MyApp;
