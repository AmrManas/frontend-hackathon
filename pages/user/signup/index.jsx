import { Button, Form, Input, message } from "antd";
import Image from "next/image";
import React, { useState } from "react";
import Logo from "../../../images/logo.jpg";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import Link from "next/link";
import axios from "axios";
import { hostUrl } from "../../../hostUrl";
import { useRouter } from "next/router";

export const FormLabel = ({ children }) => {
  return <span className="font-medium text-gray-900">{children}</span>;
};
const Signup = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const registerUser = (values) => {
    setLoading(true);
    axios
      .post(
        `${hostUrl}/auth/register`,
        {},
        {
          headers: {
            payload: btoa(
              `${values?.name}:${values?.email?.toLowerCase()}:${
                values?.password
              }`
            ),
          },
        }
      )
      .then((res) => {
        console.log(res);
        if (res?.data?.success) {
          setLoading(false);
          router.push(
            `/user/otpverification?email=${values?.email?.toLowerCase()}&&otptoken=${
              res?.data?.otptoken
            }`
          );
          message.success("Verification code successfully sent");
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
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                Sign up!
              </h1>
              <p>Please fill this form to create an account</p>
            </div>
            <Form form={form} onFinish={registerUser}>
              <FormLabel>Name</FormLabel>
              <Form.Item
                name="name"
                rules={[
                  {
                    required: true,
                    whitespace: true,
                    message: "Please enter name",
                  },
                ]}
              >
                <Input
                  size="large"
                  type="text"
                  placeholder="Enter your name"
                  autoComplete="off"
                />
              </Form.Item>
              <FormLabel>Email</FormLabel>
              <Form.Item
                name="email"
                rules={[
                  {
                    required: true,
                    whitespace: true,
                    message: "Email can't be blank!",
                  },
                  {
                    message: "Please enter a valid email address!",
                    pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  },
                ]}
              >
                <Input
                  size="large"
                  type="text"
                  placeholder="Enter your email"
                  autoComplete="off"
                />
              </Form.Item>
              <FormLabel>Password</FormLabel>
              <Form.Item
                name="password"
                rules={[
                  {
                    required: true,
                    message: "Please input your password!",
                  },
                ]}
              >
                <Input.Password
                  size="large"
                  autoComplete="off"
                  placeholder="Enter your password"
                  iconRender={(visible) =>
                    visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                  }
                />
              </Form.Item>
              <FormLabel>Confirm password</FormLabel>
              <Form.Item
                name="confirmPassword"
                rules={[
                  {
                    required: true,
                    message: "Please confirm your password!",
                  },
                  () => ({
                    validator(_, value) {
                      if (
                        value?.length === 0 ||
                        form?.getFieldValue("password") === value
                      )
                        return Promise.resolve();
                      // eslint-disable-next-line prefer-promise-reject-errors
                      return Promise.reject(
                        "The two passwords that you entered do not match!"
                      );
                    },
                  }),
                ]}
              >
                <Input.Password
                  size="large"
                  autoComplete="off"
                  placeholder="Enter your confirm password"
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
                Sign up
              </Button>
              <div className="mt-5 text-center">
                Already have an account?{" "}
                <Link href={"/user/login"}>
                  <a>
                    <span className="underline font-medium text-[#40a9ff]">
                      Login here..
                    </span>
                  </a>
                </Link>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
