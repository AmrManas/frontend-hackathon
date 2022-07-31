import React, { useState } from "react";
import {
  Alert,
  Form,
  Input,
  Button,
  Row,
  Col,
  notification,
  message,
} from "antd";
import Logo from "../../../images/logo.jpg";
import MainLogo from "../../../images/main-logo.png";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import Image from "next/image";
import Link from "next/link";
import axios from "axios";
import { hostUrl } from "../../../hostUrl";
import { useRouter } from "next/router";
import { useAtom } from "jotai";
import { userCurrent } from "../../../store/currentUser";

const Login = ({}) => {
  const [form] = Form.useForm();
  const [error, setError] = useState(false);
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [, setUser] = useAtom(userCurrent);
  const verifyLogin = (value) => {
    setLoading(true);
    axios
      .post(
        `${hostUrl}/auth/login`,
        {},
        {
          headers: {
            apiKey: btoa(`${value?.email}:${value?.password}`),
          },
        }
      )
      .then((res) => {
        if (res?.data?.success) {
          setLoading(false);
          localStorage.setItem("accessToken", res?.data?.accessToken);
          localStorage.setItem("refreshToken", res?.data?.refreshToken);
          router.push(`/MarkAttendance`);

          const headers = {
            accessToken: localStorage.getItem("accessToken"),
          };

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

              //   localStorage.setItem("accessToken", res?.data?.accessToken);
              //   localStorage.setItem("refreshToken", res?.data?.refreshToken);
              //   router.push(`/`);
              // }
            });
        }
      })
      .catch((err) => {
        if (err) {
          setError(true);
          setLoading(false);
        }
      });
  };
  return (
    <div className="h-screen">
      <Row className="w-full">
        <Col xs={0} sm={0} md={12} lg={12} xl={12} className="h-full w-full">
          <div className="h-screen">
            <Image src={Logo} alt="..." style={{ height: "100%" }} />
          </div>
        </Col>
        <Col xs={24} sm={24} md={12} lg={12} xl={12} className="h-full w-full">
          <div className="bg-[#dfd8cc0d]">
            <div className="">
              <div>
                <div className="flex items-center h-screen">
                  <div className="max-w-sm mx-auto ">
                    <div className="">
                      <div className="flex justify-center items-center text-5xl font-bold">
                        <div className="">
                          <Image src={MainLogo} alt="..." />
                        </div>
                      </div>
                      <div className="my-6">
                        <div className="font-bold text-4xl text-center text-gray-900">
                          Welcome back!
                        </div>
                        <div className="text-gray-900 text-base text-center text-sm font-medium ">
                          Enter your email address and password to log in
                        </div>
                      </div>
                      <div className="">
                        {error && (
                          <div className="my-2">
                            <Alert
                              message="Invalid email address or password!"
                              type="error"
                              showIcon
                              closable
                            />
                          </div>
                        )}
                        <Form
                          hideRequiredMark
                          autoComplete="off"
                          form={form}
                          colon={false}
                          layout="vertical"
                          onFinish={verifyLogin}
                        >
                          <Form.Item
                            name="email"
                            label={<span className="text-gray-900">Email</span>}
                            rules={[
                              {
                                type: "email",
                                message: "Please enter a valid email address!",
                              },
                              {
                                required: true,
                                message: "Email can't be blank!",
                              },
                            ]}
                          >
                            <Input size="large" />
                          </Form.Item>
                          <Form.Item
                            rules={[
                              {
                                required: true,
                                message: "Password can't be blank!",
                              },
                            ]}
                            name="password"
                            label={
                              <span className="text-gray-900">Password</span>
                            }
                          >
                            <Input.Password
                              size="large"
                              iconRender={(visible) =>
                                visible ? (
                                  <EyeTwoTone />
                                ) : (
                                  <EyeInvisibleOutlined />
                                )
                              }
                            />
                          </Form.Item>
                          <Button
                            type="primary"
                            block
                            size="large"
                            htmlType="submit"
                            loading={loading}
                          >
                            Login
                          </Button>
                          <div className="mt-5 text-center">
                            {"Don't Have an Account"}?{" "}
                            <Link href={"/user/signup"}>
                              <a>
                                <span className="underline font-medium text-[#40a9ff]">
                                  Signup
                                </span>
                              </a>
                            </Link>
                          </div>
                          {/* <div className="text-center mt-4 ">
                                  <Link
                                    to="/user/forgotpassword"
                                    className="text-white"
                                  >
                                    Forgot Password ?
                                  </Link>
                                </div> */}
                        </Form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default Login;
