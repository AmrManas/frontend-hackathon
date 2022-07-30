import "../styles/globals.css";

import "antd/dist/antd.css";
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
  );
}

export default MyApp;
