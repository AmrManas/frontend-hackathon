import React, { useEffect, useState } from "react";
import { Avatar, Button, Col, Divider, Row, Spin, Tabs } from "antd";
import axios from "axios";
import { hostUrl } from "../../hostUrl";
// import { io } from "socket.io-client";

// socket = io(`${hostUrl}/user/me/k`);

const MarkAttendance = () => {
  const [loading, setLoading] = useState(false);
  const [count, setCount] = useState(0);
  const [data, setData] = useState({});
  // const getAttendenceQrCode = () => {
  //   setLoading(true);
  //   const headers = {
  //     accessToken: localStorage.getItem("accessToken"),
  //   };
  //   console.log("headers", headers);
  //   axios
  //     .get(
  //       `${hostUrl}/user/me/k`,

  //       {
  //         headers: {
  //           accessToken: localStorage.getItem("accessToken"),
  //         },
  //       }
  //     )
  //     .then((res) => {
  //       console.log(res);
  //       setLoading(false);
  //     })
  //     .catch((err) => {
  //       if (err) {
  //         setLoading(false);
  //       }
  //     });
  // };
  // useEffect(() => {
  //   setTimeout(() => {
  //     getAttendenceQrCode();
  //     setCount(count + 1);
  //   }, 5000);
  // }, [count]);

  const getAttendenceQrCode = () => {
    setLoading(true);
    const headers = {
      accessToken: localStorage.getItem("accessToken"),
    };
    console.log("headers", headers);
    axios
      .get(
        `${hostUrl}/user/generateQR`,

        {
          headers: {
            id: localStorage.getItem("accessToken"),
          },
        }
      )
      .then((res) => {
        console.log(res);
        setData({ ...res?.data });
        setLoading(false);
      })
      .catch((err) => {
        if (err) {
          setLoading(false);
        }
      });
  };
  useEffect(() => {
    getAttendenceQrCode();
  }, []);

  return (
    <div className="mx-60 my-20">
      <div className="">
        <h1 className="text-4xl font-medium text-[#1890ff]">Mark Attendance</h1>
      </div>
      <Divider />
      <div className="">
        <Row>
          <Col xl={7} lg={7} md={12} sm={18} xs={24}>
            <div className="main bg-white  shadow-md">
              <div className="flex justify-center items-center">
                <div className="">
                  <Avatar
                    src={data?.data}
                    size={200}
                    shape="square"
                    style={{ background: "#34bdeb" }}
                  />
                </div>
              </div>
              <div className="px-20 mb-5">
                <Button
                  type="primary"
                  style={{ width: "100%" }}
                  className=""
                  size="large"
                  disabled
                >
                  In time
                </Button>
              </div>
              <div className="flex  border-t pt-2 justify-between">
                <div className="flex">
                  <p className=" pl-4 pt-2 ml-1 text-sm font-semibold text-gray-600">
                    Email
                  </p>
                </div>

                <div className="flex ">
                  <p className="mt-2 mr-4 " style={{ fontWeight: "500" }}>
                    joshanpreet.singh@simbaquartz.com
                  </p>
                </div>
              </div>
              <div className="flex border-t pt-4 justify-between border-b">
                <div className="flex">
                  <p className="pl-4 ml-1 text-sm font-medium text-gray-600 font-semibold">
                    Phone
                  </p>
                </div>
                <div className=" editphone  flex">
                  <p className="mr-4 mt-1" style={{ fontWeight: "500" }}>
                    9878907054
                  </p>
                </div>
              </div>
              <div className="flex border-t pt-4 justify-between border-b">
                <div className="flex">
                  <p className="pl-4 ml-1 text-sm font-medium text-gray-600 font-semibold">
                    Address
                  </p>
                </div>
                <div className=" editphone  flex">
                  <p className="mr-4 mt-1" style={{ fontWeight: "500" }}>
                    --
                  </p>
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default MarkAttendance;
