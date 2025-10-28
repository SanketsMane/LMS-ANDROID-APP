"use client";
import { ThemeSwitcher } from "@/app/utils/ThemeSwitcher";
import {
  useGetAllNotificationsQuery,
  useUpdateNotificationStatusMutation,
} from "@/redux/features/notifications/notificationsApi";
import React, { FC, useEffect, useState } from "react";
import { IoMdNotificationsOutline } from "react-icons/io";
import socketIO from "socket.io-client";
import { format } from "timeago.js";
const ENDPOINT = process.env.NEXT_PUBLIC_SOCKET_SERVER_URI || "";
const socketId = socketIO(ENDPOINT, { transports: ["websocket"] });

type Props = {
  open?: boolean;
  setOpen?: any;
};

const DashboardHeader: FC<Props> = ({ open, setOpen }) => {
  const { data, refetch } = useGetAllNotificationsQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });
  const [updateNotificationStatus, { isSuccess }] =
    useUpdateNotificationStatusMutation();
  const [notifications, setNotifications] = useState<any>([]);
  const [audio] = useState<any>(
    typeof window !== "undefined" &&
      new Audio(
        "https://res.cloudinary.com/dkg6jv4l0/video/upload/v1716750964/notification_jvwqd0.mp3"
      )
  );

  const playNotificationSound = () => {
    audio.play();
  };

  useEffect(() => {
    if (data) {
      setNotifications(
        data.notifications.filter((item: any) => item.status === "unread")
      );
    }
    if (isSuccess) {
      refetch();
    }
    audio.load();
  }, [data, isSuccess,audio]);

  useEffect(() => {
    socketId.on("newNotification", (data) => {
      refetch();
      playNotificationSound();
    });
  }, []);

  const handleNotificationStatusChange = async (id: string) => {
    await updateNotificationStatus(id);
  };

  return (
    <div className="w-full flex items-center justify-end p-6 backdrop-blur-xl bg-gray-50/95 dark:bg-gray-900/95 border-b border-gray-200/60 dark:border-gray-700/60 sticky top-0 z-[9999999] shadow-sm">
      {/* Right Section */}
      <div className="flex items-center space-x-4">
        {/* Search Bar */}
        <div className="hidden lg:flex items-center space-x-2 bg-white/90 dark:bg-gray-800/90 rounded-full px-4 py-2 border border-gray-300/50 dark:border-gray-600/50 shadow-sm">
          <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            placeholder="Search..."
            className="bg-transparent border-none outline-none text-sm text-gray-700 dark:text-gray-300 placeholder-gray-500 w-40"
          />
        </div>

        {/* Theme Switcher */}
        <div className="p-2 rounded-full bg-white/90 dark:bg-gray-800/90 border border-gray-300/50 dark:border-gray-600/50 hover:bg-white dark:hover:bg-gray-800 transition-all duration-200 shadow-sm">
          <ThemeSwitcher />
        </div>

        {/* Notifications */}
        <div className="relative">
          <button
            onClick={() => setOpen(!open)}
            className="relative p-3 rounded-full bg-white/90 dark:bg-gray-800/90 border border-gray-300/50 dark:border-gray-600/50 hover:bg-white dark:hover:bg-gray-800 transition-all duration-200 group shadow-sm"
          >
            <IoMdNotificationsOutline className="text-xl text-gray-700 dark:text-gray-300 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200" />
            {notifications && notifications.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-gradient-to-r from-red-500 to-pink-500 rounded-full w-5 h-5 text-xs flex items-center justify-center text-white font-medium animate-pulse">
                {notifications.length > 9 ? '9+' : notifications.length}
              </span>
            )}
          </button>

          {/* Enhanced Notifications Panel */}
          {open && (
            <div className="absolute right-0 top-16 w-96 max-h-[70vh] overflow-hidden backdrop-blur-xl bg-white/95 dark:bg-gray-900/95 border border-gray-300/50 dark:border-gray-600/50 rounded-2xl shadow-2xl z-[1000000000] animate-in slide-in-from-top-2 duration-200">
              {/* Header */}
              <div className="p-6 border-b border-gray-200/50 dark:border-gray-700/50">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Notifications
                  </h3>
                  <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full text-sm font-medium">
                    {notifications?.length || 0} new
                  </span>
                </div>
              </div>

              {/* Notifications List */}
              <div className="max-h-96 overflow-y-auto">
                {notifications && notifications.length > 0 ? (
                  notifications.map((item: any, index: number) => (
                    <div
                      key={index}
                      className="p-4 border-b border-gray-100/50 dark:border-gray-800/50 hover:bg-gray-50/80 dark:hover:bg-gray-800/50 transition-all duration-200 group"
                    >
                      <div className="flex items-start justify-between space-x-3">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center space-x-2 mb-1">
                            <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                            <h4 className="text-sm font-medium text-gray-900 dark:text-white truncate">
                              {item.title}
                            </h4>
                          </div>
                          <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                            {item.message}
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-500 mt-2">
                            {format(item.createdAt)}
                          </p>
                        </div>
                        <button
                          onClick={() => handleNotificationStatusChange(item._id)}
                          className="px-3 py-1 text-xs bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full hover:bg-blue-200 dark:hover:bg-blue-900/50 transition-all duration-200 opacity-0 group-hover:opacity-100"
                        >
                          Mark read
                        </button>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="p-8 text-center">
                    <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center">
                      <IoMdNotificationsOutline className="w-8 h-8 text-gray-400" />
                    </div>
                    <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-1">
                      No notifications
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      You're all caught up!
                    </p>
                  </div>
                )}
              </div>

              {/* Footer */}
              {notifications && notifications.length > 0 && (
                <div className="p-4 border-t border-gray-200/50 dark:border-gray-700/50">
                  <button className="w-full py-2 text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium transition-colors duration-200">
                    View all notifications
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DashboardHeader;
