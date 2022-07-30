import "../styles/globals.css";

import "antd/dist/antd.css";
<<<<<<< HEAD
import { Spin } from "antd";
import { useEffect, useState } from "react";
import axios from "axios";
import { hostUrl } from "../hostUrl";

function MyApp({ Component, pageProps }) {
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
  return (
    <Spin spinning={loading}>
      {" "}
      <Component {...pageProps} />
    </Spin>
=======
import { Layout } from "antd";
import Sidebars from "../components/Layouts/Sidebars";
import TopBar from "../components/Layouts/TopBar";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Layout>
        <div>
          <TopBar />
          <div className="flex bg-white">
            <Sidebars />
            <Component {...pageProps} />
          </div>
        </div>
      </Layout>
    </>
>>>>>>> b721a74d280683b32f921a030d11bd4519fe6331
  );
}

export default MyApp;
