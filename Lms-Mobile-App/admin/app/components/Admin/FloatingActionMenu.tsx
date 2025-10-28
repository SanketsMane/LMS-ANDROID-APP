"use client";
import React, { FC, useState } from "react";
import { Fab, Zoom, SpeedDial, SpeedDialAction, SpeedDialIcon } from "@mui/material";
import { Add as AddIcon, Person as PersonIcon, VideoCall as VideoIcon, BarChart as ChartIcon, Settings as SettingsIcon } from "@mui/icons-material";
import { useRouter } from "next/navigation";

interface Props {}

const FloatingActionMenu: FC<Props> = () => {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const actions = [
    {
      icon: <VideoIcon />,
      name: "Create Course",
      action: () => router.push("/admin/create-course"),
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: <PersonIcon />,
      name: "Add User",
      action: () => router.push("/admin/users"),
      color: "from-purple-500 to-pink-500",
    },
    {
      icon: <ChartIcon />,
      name: "Analytics",
      action: () => router.push("/admin/courses-analytics"),
      color: "from-green-500 to-emerald-500",
    },
    {
      icon: <SettingsIcon />,
      name: "Settings",
      action: () => router.push("/admin/hero"),
      color: "from-orange-500 to-red-500",
    },
  ];

  return (
    <div className="fixed bottom-6 right-6 z-[9999]">
      <SpeedDial
        ariaLabel="Quick Actions"
        sx={{
          "& .MuiFab-primary": {
            background: "linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)",
            "&:hover": {
              background: "linear-gradient(135deg, #2563eb 0%, #7c3aed 100%)",
            },
          },
        }}
        icon={<SpeedDialIcon />}
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        open={open}
        direction="up"
      >
        {actions.map((action) => (
          <SpeedDialAction
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
            onClick={() => {
              action.action();
              setOpen(false);
            }}
            sx={{
              "& .MuiFab-primary": {
                background: `linear-gradient(135deg, ${action.color.split(" ")[1]} 0%, ${action.color.split(" ")[3]} 100%)`,
                color: "white",
                "&:hover": {
                  transform: "scale(1.1)",
                  boxShadow: "0 8px 25px rgba(0,0,0,0.3)",
                },
              },
            }}
          />
        ))}
      </SpeedDial>
    </div>
  );
};

export default FloatingActionMenu;