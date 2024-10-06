import React, { useState } from "react";
import { redirect } from "next/navigation";
import { handleLogout } from "../(protected)/actions";
import { Button, Drawer, Menu } from "antd";
import {
  SettingOutlined,
  RiseOutlined,
  LogoutOutlined,
  MenuOutlined,
} from "@ant-design/icons";
import { useRouter } from "next/navigation";
const imageURL =
  "https://img.icons8.com/?size=100&id=4CvT2ue9OxHQ&format=png&color=000000";

const items = [
  {
    key: "0",
    icon: <SettingOutlined />,
    label: "Listen to podcasts",
  },
  {
    key: "1",
    icon: <RiseOutlined />,
    label: "Upload new podcast",
  },
  {
    key: "2",
    icon: <LogoutOutlined />,
    label: "Record",
  },
  {
    key: "3",
    icon: <LogoutOutlined />,
    label: "Logout",
  },
];

export default function Navbar({ router }) {
  const [open, setOpen] = useState(false);

  const handleMenuClick = (key) => {
    if (key === "0") {
      router.push("/home");
    } else if (key === "1") {
      router.push("/upload");
    } else if (key === "2") {
      router.push("/record");
    } else if (key === "3") {
      handleLogout(); // Implement your logout logic here
    } else {
      console.error("Unknown key:", key);
    }
  };
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };
  return (
    <div className="w-full min-h-5 m-auto flex flex-row justify-between mb-10">
      <div className="flex flex-row justify-center items-center gap-x-1.5 text-purple-800">
        <img src={imageURL} width={36} /> BINGE
      </div>
      <div>
        <Button variant="text" onClick={showDrawer}>
          <MenuOutlined />
        </Button>
        <Drawer title="Where to?" onClose={onClose} open={open}>
          <Menu
            theme="light"
            mode="inline"
            items={items.map((item) => ({
              key: item.key,
              icon: item.icon,
              label: item.label,
              onClick: () => handleMenuClick(item.key),
            }))}
          />
        </Drawer>
      </div>
    </div>
  );
}