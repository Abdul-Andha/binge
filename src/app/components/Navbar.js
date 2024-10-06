import React, { useState } from "react";
import { redirect } from "next/navigation";
import { handleLogout } from "../(protected)/actions";
import { Button, Drawer, Menu } from "antd";
import {
  LogoutOutlined,
  MenuOutlined,
  UploadOutlined,
  SearchOutlined,
  PlayCircleOutlined
} from "@ant-design/icons";
import { useRouter } from "next/navigation";
const imageURL =
  "https://img.icons8.com/?size=100&id=4CvT2ue9OxHQ&format=png&color=000000";

const items = [
  {
    key: "0",
    icon: <SearchOutlined />,
    label: "Listen to podcasts",
  },
  {
    key: "1",
    icon: <UploadOutlined />,
    label: "Upload new podcast",
  },
  {
    key: "2",
    icon: <PlayCircleOutlined />,
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
    <div className="w-full h-5 flex flex-row justify-between mb-10">
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