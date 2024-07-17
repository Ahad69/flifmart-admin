import { Button, Checkbox, Form, Input } from "antd";
import axios from "axios";
import Cookies from "js-cookie";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { useState } from "react";

const Login = () => {
  const router = useRouter();
  const [err, setError] = useState("");

  const onFinish = async (values) => {
    try {
      await axios
        .post("https://flifmart-backend-v2.vercel.app/api/auth/login", values)
        .then((data) => {
          if (data.data.message == "success") {
            if (data?.data?.user?.role == "superAdmin") {
              Cookies.set("token", data.data.token);
              if (router.asPath == "/") {
                router.push(`/dashboard`);
              } else {
                setTimeout(() => {
                  router.reload(router?.asPath);
                }, 500);
              }
            } else {
              setError("Only admin has the access");
            }
          } else {
            setError("Something Error");
          }
        });
    } catch (error) {
      console.log(error);
      setError("Something Error");
    }
  };

  return (
    <div className="h-screen flex justify-center items-center">
      <Head>
        <title>Admin Panel</title>
      </Head>

      <Form
        className="w-96 bg-gray-100 p-10 mb-24"
        name="basic"
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 16,
        }}
        style={{
          maxWidth: 700,
        }}
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        autoComplete="off"
      >
        <img className="w-6/12 m-auto pb-10" src="/logo.png" />
        <Form.Item
          label="Username"
          name="email"
          rules={[
            {
              required: true,
              message: "Please input your username!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <button
            className="bg-red-400 py-1 px-5 text-white font-bold rounded "
            htmlType="submit"
          >
            Login
          </button>
          {err && <p className="text-red-400">{err}</p>}
        </Form.Item>
      </Form>
    </div>
  );
};

export default Login;

// 01712 398605
