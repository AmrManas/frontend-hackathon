import { Button, Form, Input, message, notification } from "antd";
import Image from "next/image";
import React, { useState } from "react";
import Logo from "../../../images/logo.jpg";
import {
  EyeInvisibleOutlined,
  EyeTwoTone,
  SmileOutlined,
} from "@ant-design/icons";
import { useRouter } from "next/router";
import axios from "axios";
import { hostUrl } from "../../../hostUrl";

const OtpVerification = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const verifyOtp = (values) => {
    axios
      .post(
        `${hostUrl}/auth/verifyUser`,
        {},
        {
          headers: {
            payload: btoa(
              `${router.query?.email}:${values?.otp}:${router.query?.otptoken}`
            ),
          },
        }
      )
      .then((res) => {
        console.log(res);
        if (res?.data?.success) {
          setLoading(false);
          router.push(`/user/login`);
          notification.open({
            message: "User successfully verified",
            description: "Fill email and password for login",
            icon: <SmileOutlined style={{ color: "#108ee9" }} />,
          });
        }
      })
      .catch((err) => {
        if (err) {
          message.error("Something went wrong");
          setLoading(false);
        }
      });
  };
  return (
    <div className="h-screen flex">
      <div className="w-full">
        <Image src={Logo} alt="..." style={{}} />
      </div>
      <div className="w-full bg-[#dfd8cc0d]">
        <div className="flex items-center  h-screen">
          <div className="mx-auto w-[50%]">
            <div className="">
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white text-center mb-2">
                Verification Code
              </h1>
              <p className="text-center text-gray-500 font-medium">
                Please enter the verification code sent to{" "}
                <span>{"email"}</span>
              </p>
            </div>
            <Form onFinish={verifyOtp}>
              <Form.Item name="otp">
                <Input.Password
                  size="large"
                  autoComplete="off"
                  maxLength={4}
                  placeholder="Enter verification code"
                  iconRender={(visible) =>
                    visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
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
                Verify
              </Button>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OtpVerification;
