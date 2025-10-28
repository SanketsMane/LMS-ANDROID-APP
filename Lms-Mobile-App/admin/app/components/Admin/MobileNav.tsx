"use client";
import React, { FC, useState } from "react";
import { Drawer, IconButton, List, ListItem, ListItemIcon, ListItemText } from "@mui/material";
import { Menu as MenuIcon, Close as CloseIcon } from "@mui/icons-material";
import {
  HomeOutlinedIcon,
  PeopleOutlinedIcon,
  ReceiptOutlinedIcon,
  BarChartOutlinedIcon,
  MapOutlinedIcon,
  GroupsIcon,
  OndemandVideoIcon,
  VideoCallIcon,
  WebIcon,
  QuizIcon,
  WysiwygIcon,
  ManageHistoryIcon,
  ExitToAppIcon,
} from "./sidebar/Icon";
import Link from "next/link";
import Image from "next/image";
import avatarDefault from "../../../public/assests/avatar.png";
import { useSelector } from "react-redux";
import { useTheme } from "next-themes";
import Cookies from "js-cookie";

interface Props {
  selected: string;
  setSelected: (value: string) => void;
}

const MobileNav: FC<Props> = ({ selected, setSelected }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useSelector((state: any) => state.auth);
  const { theme } = useTheme();

  const logoutHandler = async () => {
    Cookies.remove("access_token");
    Cookies.remove("refresh_token");
    window.location.reload();
  };

  const menuItems = [
    { title: "Dashboard", to: "/admin", icon: <HomeOutlinedIcon /> },
    { title: "Users", to: "/admin/users", icon: <GroupsIcon /> },
    { title: "Invoices", to: "/admin/invoices", icon: <ReceiptOutlinedIcon /> },
    { title: "Create Course", to: "/admin/create-course", icon: <VideoCallIcon /> },
    { title: "Live Courses", to: "/admin/courses", icon: <OndemandVideoIcon /> },
    { title: "Hero", to: "/admin/hero", icon: <WebIcon /> },
    { title: "FAQ", to: "/admin/faq", icon: <QuizIcon /> },
    { title: "Categories", to: "/admin/categories", icon: <WysiwygIcon /> },
    { title: "Manage Team", to: "/admin/team", icon: <PeopleOutlinedIcon /> },
    { title: "Courses Analytics", to: "/admin/courses-analytics", icon: <BarChartOutlinedIcon /> },
    { title: "Orders Analytics", to: "/admin/orders-analytics", icon: <MapOutlinedIcon /> },
    { title: "Users Analytics", to: "/admin/users-analytics", icon: <ManageHistoryIcon /> },
  ];

  return (
    <>
      {/* Mobile Menu Button */}
      <div className="lg:hidden fixed top-4 left-4 z-[999999]">
        <IconButton
          onClick={() => setIsOpen(true)}
          className="backdrop-blur-xl bg-white/80 dark:bg-gray-900/80 border border-white/20 dark:border-white/10 shadow-xl hover:shadow-2xl transition-all duration-200"
        >
          <MenuIcon className="text-gray-700 dark:text-gray-300" />
        </IconButton>
      </div>

      {/* Mobile Drawer */}
      <Drawer
        anchor="left"
        open={isOpen}
        onClose={() => setIsOpen(false)}
        className="lg:hidden"
        PaperProps={{
          className: "w-80 backdrop-blur-xl bg-white/90 dark:bg-gray-900/90 border-r border-white/20 dark:border-white/10",
        }}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-white/20 dark:border-white/10">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">E</span>
              </div>
              <h3 className="text-lg font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                ELearning
              </h3>
            </div>
            <IconButton
              onClick={() => setIsOpen(false)}
              className="p-2 hover:bg-white/10 dark:hover:bg-white/5 rounded-full"
            >
              <CloseIcon className="text-gray-600 dark:text-gray-300" />
            </IconButton>
          </div>

          {/* Profile Section */}
          <div className="p-4 border-b border-white/20 dark:border-white/10">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <Image
                  alt="profile-user"
                  width={48}
                  height={48}
                  src={user?.avatar ? user.avatar.url : avatarDefault}
                  className="rounded-full ring-2 ring-white/20 dark:ring-white/10"
                />
                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white dark:border-gray-900"></div>
              </div>
              <div>
                <p className="font-semibold text-gray-900 dark:text-white">{user?.name}</p>
                <p className="text-sm text-gray-600 dark:text-gray-400 capitalize">{user?.role}</p>
              </div>
            </div>
          </div>

          {/* Navigation Items */}
          <div className="flex-1 overflow-y-auto py-4">
            <List className="space-y-1 px-2">
              {menuItems.map((item) => (
                <ListItem
                  key={item.title}
                  component={Link}
                  href={item.to}
                  onClick={() => {
                    setSelected(item.title);
                    setIsOpen(false);
                  }}
                  className={`rounded-xl transition-all duration-200 ${
                    selected === item.title
                      ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg"
                      : "hover:bg-white/10 dark:hover:bg-white/5"
                  }`}
                >
                  <ListItemIcon
                    className={`min-w-0 mr-3 ${
                      selected === item.title
                        ? "text-white"
                        : "text-gray-600 dark:text-gray-400"
                    }`}
                  >
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText
                    primary={item.title}
                    className={`${
                      selected === item.title
                        ? "text-white"
                        : "text-gray-700 dark:text-gray-300"
                    }`}
                  />
                </ListItem>
              ))}
            </List>
          </div>

          {/* Logout Button */}
          <div className="p-4 border-t border-white/20 dark:border-white/10">
            <ListItem
              onClick={() => {
                setSelected("Logout");
                logoutHandler();
              }}
              className="rounded-xl hover:bg-red-500/10 transition-all duration-200 cursor-pointer"
            >
              <ListItemIcon className="min-w-0 mr-3 text-red-500">
                <ExitToAppIcon />
              </ListItemIcon>
              <ListItemText
                primary="Logout"
                className="text-red-500 font-medium"
              />
            </ListItem>
          </div>
        </div>
      </Drawer>
    </>
  );
};

export default MobileNav;