import React, { useEffect, useState } from "react";
import { Avatar, Button, Col, Divider, message, Row, Spin, Tabs } from "antd";
import axios from "axios";
import { hostUrl } from "../../hostUrl";
import Image from "next/image";
import moment from "moment";
import { useAtom } from "jotai";
import { userCurrent } from "../../store/currentUser";
// import { io } from "socket.io-client";

// socket = io(`${hostUrl}/user/me/k`);

const MarkAttendance = () => {
  const [loading, setLoading] = useState(false);
  const [count, setCount] = useState(0);
  const [data, setData] = useState({});
  const [isIntimeTime, setIsIntimeTime] = useState({});
  const [user, setUser] = useAtom(userCurrent);
  console.log("user", user);
  const getAttendence = () => {
    setLoading(true);
    const headers = {
      accessToken: localStorage.getItem("accessToken"),
    };
    console.log("headers", headers);
    axios
      .get(`${hostUrl}/user/getTime`, {
        headers: {
          id: localStorage.getItem("accessToken"),
        },
      })
      .then((res) => {
        console.log(res);
        setIsIntimeTime({ ...res?.data });
        setLoading(false);
      })
      .catch((err) => {
        if (err) {
          setLoading(false);
        }
      });
  };
  useEffect(() => {
    if (!isIntimeTime?.enabled) {
      setTimeout(() => {
        getAttendence();
        setCount(count + 1);
      }, 3000);
    }
  }, [count]);

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
    <div className=" my-20">
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
                  {/* <Image src={data?.data} alt="..." width={200} height={200} /> */}
                  <Avatar
                    src={data?.data}
                    size={450}
                    shape="square"
                    style={{ background: "#34bdeb" }}
                  />
                </div>
              </div>
              <div className="px-20 mb-5">
                {!user?.user?.inTime && !user?.user?.outTime ? (
                  <Button
                    type="primary"
                    style={{ width: "100%" }}
                    className=""
                    size="large"
                    onClick={() =>
                      axios
                        .put(
                          `${hostUrl}/user/updateTime`,
                          {
                            inTime: moment()?.toISOString(),
                          },
                          {
                            headers: {
                              id: btoa(user?.user?._id),
                            },
                          }
                        )
                        .then((res) => {
                          if (res) {
                            message.success(
                              `Your in time is successfully saved`
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
                                    accessToken:
                                      localStorage.getItem("accessToken"),
                                  },
                                }
                              )
                              .then((res) => {
                                setUser(res?.data);

                                setLoading(false);
                              })
                              .catch((err) => {
                                if (err) {
                                  setLoading(false);
                                }
                              });
                          }
                        })
                        .catch((err) => {
                          if (err) {
                          }
                        })
                    }
                    disabled={!isIntimeTime?.enabled}
                  >
                    In time
                  </Button>
                ) : (
                  user?.user?.inTime && (
                    <Button
                      type="primary"
                      style={{ width: "100%" }}
                      className=""
                      size="large"
                      disabled={user?.user?.outTime}
                      onClick={() =>
                        axios
                          .put(
                            `${hostUrl}/user/updateTime`,
                            {
                              outTime: moment()?.toISOString(),
                            },
                            {
                              headers: {
                                id: btoa(user?.user?._id),
                              },
                            }
                          )
                          .then((res) => {
                            if (res) {
                              message.success(
                                `Your out time is successfully saved`
                              );
                              setLoading(true);
                              const headers = {
                                accessToken:
                                  localStorage.getItem("accessToken"),
                              };
                              console.log("headers", headers);
                              axios
                                .get(
                                  `${hostUrl}/user/me`,

                                  {
                                    headers: {
                                      accessToken:
                                        localStorage.getItem("accessToken"),
                                    },
                                  }
                                )
                                .then((res) => {
                                  setUser(res?.data);

                                  setLoading(false);
                                })
                                .catch((err) => {
                                  if (err) {
                                    setLoading(false);
                                  }
                                });
                            }
                          })
                          .catch((err) => {
                            if (err) {
                            }
                          })
                      }
                    >
                      Out time
                    </Button>
                  )
                )}
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
