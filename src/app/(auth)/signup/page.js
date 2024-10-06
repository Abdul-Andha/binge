"use client";
import { signup } from "./actions";
import { useState } from "react";
import { Button, Form, Input } from "antd";
import { useUserContext } from "@/app/context/userAuth";

export default function Signup() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { setUser } = useUserContext();

  const handleSubmit = async (values) => {
    setLoading(true);
    try {
      const data = await signup(values);
      setUser(data);
      setLoading(false);
      setError(null);
      router.push("/home")
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl font-semibold">Sign Up</h1>
      <Form
        onFinish={handleSubmit}
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 450 }}
        layout={"vertical"}
      >
        <Form.Item
          label="Name"
          name="name"
          layout="vertical"
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Email"
          name="email"
          layout="vertical"
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Password"
          name="password"
          layout="vertical"
        >
          <Input type="password" />
        </Form.Item>
        <Button type="primary" disabled={loading} htmlType="submit">
          {loading ? "Loading..." : "Register"}
        </Button>
      </Form>
      {error && <p>Error: {error.message}</p>}
    </div>
  );
}
