import "../styles/globals.css";

import "antd/dist/antd.css";
import { Layout, Spin } from "antd";
import { useEffect, useState } from "react";
import axios from "axios";
import { hostUrl } from "../hostUrl";
import TopBar from "../components/Layouts/TopBar";
import Sidebars from "../components/Layouts/Sidebars";

function MyApp({ Component, pageProps, ...appProps }) {
  const [loading, setLoading] = useState(false);
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
    [`/user/signup`, "/user/login", "/user/otpverification"].includes(
      appProps.router.pathname
    )
  )
    return <Component {...pageProps} />;

  return (
    <>
      <Layout>
        <div className="">
          <TopBar />
          <div className="flex bg-white">
            <Sidebars />
            <Spin spinning={loading}>
              {" "}
              <Component {...pageProps} />
            </Spin>
          </div>
        </div>
      </Layout>
    </>
  );
}

export default MyApp;
