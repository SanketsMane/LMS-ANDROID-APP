"use client";
import React, { FC, useEffect, useState } from "react";
import { Provider } from "react-redux";
import { store } from "../redux/features/store";
import { useLoadUserQuery } from "@/redux/features/api/apiSlice";
import Loader from "./components/Loader/Loader";
import socketIO from "socket.io-client";
import { SessionProvider } from "next-auth/react";
import { redirect } from "next/navigation";
import { SidebarProvider } from "./contexts/SidebarContext";
const ENDPOINT = process.env.NEXT_PUBLIC_SOCKET_SERVER_URI || "";
const socketId = socketIO(ENDPOINT, { 
  transports: ["websocket", "polling"],
  autoConnect: true,
  reconnection: true
});

interface ProvidersProps {
  children: any;
}

export function Providers({ children }: ProvidersProps) {
  return <Provider store={store}>{children}</Provider>;
}

export const Custom: FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isLoading, error, data } = useLoadUserQuery({});
  const [isMounted, setisMounted] = useState(false);

  useEffect(() => {
    socketId.on("connection", () => {});
    setisMounted(true);
  }, []);

  if (!isMounted) {
    return (
      <div>
        <SessionProvider>
          <Loader />
        </SessionProvider>
      </div>
    );
  }

  // Log the loading state and error for debugging
  console.log("Load user - isLoading:", isLoading, "error:", error, "data:", data);

  return (
    <SidebarProvider>
      <div>
        {isLoading ? (
          <SessionProvider>
            <Loader />
          </SessionProvider>
        ) : (
          <div>
            <SessionProvider>{children}</SessionProvider>
          </div>
        )}
      </div>
    </SidebarProvider>
  );
};
