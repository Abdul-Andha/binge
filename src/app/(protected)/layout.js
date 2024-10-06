"use client";
// Want to make any page under this folder (protected) not be accessible by non-users
import React from "react";
import { useState, useEffect } from "react";
import { handleLogout } from "./actions";
import { useRouter } from "next/navigation";
import { Layout, Menu, Avatar } from "antd";
import {
  UserOutlined,
  SettingOutlined,
  RiseOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { useUserContext } from "../context/userAuth";

const { Sider, Content } = Layout;

const items = [
  {
    key: "2",
    icon: <SettingOutlined />,
    label: "Settings",
  },
  {
    key: "3",
    icon: <RiseOutlined />,
    label: "Trending",
  },
  {
    key: "4",
    icon: <LogoutOutlined />,
    label: "Logout",
  },
];

export default function ProtectedLayout({ children }) {
  const [mobile, setMobile] = useState(false);
  const router = useRouter();
  const { user, setUser } = useUserContext();

  if (user === null) {
    router.push("/login");
  }

  return (
    user && (
      <Layout className="overflow-hidden min-h-screen bg-white" hasSider>
        <Sider
          breakpoint="sm"
          collapsedWidth={0}
          className="SideNav h-screen fixed left-0 top-0 bottom-0"
          collapsible
          collapsed={mobile}
          onCollapse={() => setMobile(!mobile)}
          // Set Trigger to an icon
          trigger={
            <div
              className={`absolute bottom-2 ${mobile ? "left-6" : "left-52"
                } text-black`}
            >
              Close
            </div>
          }
        >
          <div className="flex flex-col max-w-[200px]">
            <div className="flex gap-2 m-4">
              <div className="min-w-[64px]">
                <Avatar size={64} icon={<UserOutlined />} />
              </div>
              <div className="flex flex-col gap-2 justify-center max-w-[100px]">
                <p className="text-lg text-black font-medium ">
                  {user.user_metadata.name}
                </p>
                <p className="text-sm text-black/70 truncate">{user.email}</p>
              </div>
            </div>
            <Menu
              theme="light"
              mode="inline"
              items={items}
              onClick={(info) => {
                if (info.key === "4") {
                  handleLogout();
                  setUser(null)
                }
              }}
            />
          </div>
        </Sider>
        <Layout
          style={{
            marginInlineStart: mobile ? 0 : 200,
          }}
        >
          <Content className="h-screen bg-white">{children}</Content>
          <div className="max-h-40 pb-10 bg-black"></div>
        </Layout>
      </Layout>
    )
  );
}
