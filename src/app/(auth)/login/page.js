"use client";
import { login } from "./actions";
import { useState } from "react";
import { Button, Form, Input } from "antd";
import { useRouter } from "next/navigation";
import { useUserAuth } from "@/app/context/userAuth";

export default function Login() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const router = useRouter();
  const { user, setUser } = useUserAuth();

  const handleSubmit = async (values) => {
    setLoading(true);
    try {
      const data = await login(values);
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
      <h1 className="text-2xl font-semibold">Login</h1>
      <Form
        onFinish={handleSubmit}
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 16 }}
        layout={"vertical"}
        style={{ maxWidth: 450 }}
      >
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
          {loading ? "Loading..." : "Login"}
        </Button>
      </Form>
      {error && <p>Error: {error.message}</p>}
      {user && <p>Signed in as {user.email}</p>}
    </div>
  );
}
