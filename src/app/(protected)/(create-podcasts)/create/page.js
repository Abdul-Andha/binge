"use client"
import { Form, Switch, Input, Button } from "antd";
import { useRouter } from "next/navigation";

export default function CreatePodcast() {
  const router = useRouter();

  function handleSubmit(values){
    router.push(`/livestream?role=${values.host ? "host" :  "audience"}&channelName=${values.channelName}`)
  }

  return (
    <div className="w-full h-screen flex items-center justify-center">
        <Form
        onFinish={handleSubmit}
        labelCol={{ span: 16 }}
        wrapperCol={{ span: 16 }}
        layout={"vertical"}
        style={{ maxWidth: 450 }}
      >
        <Form.Item
          label="Channel Name"
          name="channelName"
          layout="vertical"
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Host"
          name="host"
          layout="vertical"
        >
          <Switch />
        </Form.Item>
        <Button type="primary" htmlType="submit">
          {"Create"}
        </Button>
      </Form>
    </div>
  );
}
