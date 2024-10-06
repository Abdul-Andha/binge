"use client";
// Want to make any page under this folder (protected) not be accessible by non-users
import React from "react";
import { useState, useEffect } from "react";
import { handleLogout } from "./actions";
import { useRouter } from "next/navigation";
import { Layout, Menu, Avatar } from "antd";
import Navbar from "../components/Navbar";
import {
  UserOutlined,
  SettingOutlined,
  RiseOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { useUserContext } from "../context/userAuth";
import { PlaybackControls } from "./components/playback-controls";
const { Sider, Content } = Layout;
const imageURL =
  "https://img.icons8.com/?size=100&id=4CvT2ue9OxHQ&format=png&color=000000";

export default function ProtectedLayout({ children }) {
  const [mobile, setMobile] = useState(false);
  const router = useRouter();
  const { user, setUser } = useUserContext();

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

  useEffect(() => {
    console.log(user);
    if (user === null) {
      router.push("/login");
    }
  }, [user, router]);

  return (
    user && (
      <Layout
        style={{display: "flex", flexDirection: "column"}}
        className="overflow-hidden min-h-screen bg-white"
        hasSider
      >
        <Navbar router={router} />
        <Content style={{width:"100%", height:"calc(100vh-20px)"}} className="bg-white">
          {children}
          <PlaybackControls />
        </Content>
      </Layout>
    )
  );
}
