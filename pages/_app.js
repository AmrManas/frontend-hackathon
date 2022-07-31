import "../styles/globals.css";
import Link from "next/link";

import "antd/dist/antd.css";
// import { Layout } from "antd";
import Sidebars from "../components/Layouts/Sidebars";
import React, { useEffect, useState } from "react";
import TopBar from "../components/Layouts/TopBar";
import {
  LaptopOutlined,
  NotificationOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Breadcrumb, Layout, Menu } from "antd";
import axios from "axios";
import { hostUrl } from "../hostUrl";
import { useAtom } from "jotai";
import { userCurrent } from "../store/currentUser";

function MyApp({ Component, pageProps, ...appProps }) {
  const [loading, setLoading] = useState(false);
  const [, setUser] = useAtom(userCurrent);
  const callCurrentUser = () => {
    console.log(
      'localStorage.getItem("accessToken"),',
      localStorage.getItem("accessToken")
    );
    setLoading(true);
    const headers = {
      accessToken: localStorage.getItem("accessToken"),
    };
    console.log("headers", headers);
    axios
      .get(
        `${hostUrl}/user/me`,

        {
          headers: {
            accessToken: localStorage.getItem("accessToken"),
          },
        }
      )
      .then((res) => {
        console.log(res);
        setUser(res?.data);
        // if (res?.data?.success) {
        setLoading(false);
        //   localStorage.setItem("accessToken", res?.data?.accessToken);
        //   localStorage.setItem("refreshToken", res?.data?.refreshToken);
        //   router.push(`/`);
        // }
      })
      .catch((err) => {
        if (err) {
          setLoading(false);
        }
      });
  };
  useEffect(() => {
    if (localStorage.getItem("accessToken")) {
      callCurrentUser();
    }
  }, []);
  if (
    [
      `/user/signup`,
      "/user/login",
      "/user/otpverification",
      "/intime",
    ].includes(appProps.router.pathname)
  )
    return <Component {...pageProps} />;
  const SidebarArray = [
    {
      name: "Dashboard",
      link: "/dashboard",
      // icon: <MdDashboard />
    },
    {
      name: "Project",
      link: "/",
      // icon: <MdDashboard />
    },
    {
      name: "Timesheet",
      link: "/timeEntries",
      // icon: <MdDashboard />
    },
    {
      name: "Mark Attendance",
      link: "/MarkAttendance",
      // icon: <MdDashboard />
    },
    {
      name: "Screenshot",
      link: "/",
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
