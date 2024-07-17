import Layout from "@/components/layout/layout";
import React from "react";
import { Button, Checkbox, Form, Input } from "antd";
import Swal from "sweetalert2";
import axios from "axios";
import Head from "next/head";
import { useRouter } from "next/router";

const AddUser = () => {
  const router = useRouter();
  const onFinish = async (values) => {
    try {
      values.role = "editor";
      await axios
        .post("https://flifmart-backend-v2.vercel.app/api/auth", values, {
          headers: {
            "content-type": "application/json",
          },
        })
        .then((res) =>
          Swal.fire({
            position: "top-center",
            icon: "success",
            title: "Your work has been saved",
            showConfirmButton: false,
            timer: 1500,
          })
        );
      setTimeout(() => {
        router.push("/user/users-list");
      }, 2000);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout>
      <Head>
        <title>Add User </title>
      </Head>
      <div className="bg-white m-5 p-5">
        <h1 className="text-2xl font-bold">Add User</h1>

        <Form
          name="basic"
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 16,
          }}
          style={{
            maxWidth: 600,
          }}
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          autoComplete="off"
        >
          <Form.Item
            label="First Name"
            name="firstName"
            rules={[
              {
                required: true,
                message: "Please input your First Name!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Last Name"
            name="lastName"
            rules={[
              {
                required: true,
                message: "Please input your Last Name!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Email"
            name="email"
            rules={[
              {
                required: true,
                message: "Please input your Email!",
              },
            ]}
          >
            <Input type="email" />
          </Form.Item>
          <Form.Item
            label="Password"
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your Password!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item label="Role" name="role">
            <Input defaultValue={"Editor"} readOnly />
          </Form.Item>

          <Form.Item
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    </Layout>
  );
};

export default AddUser;
