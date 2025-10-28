"use client";
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface SidebarContextType {
  isCollapsed: boolean;
  setIsCollapsed: (collapsed: boolean) => void;
  sidebarWidth: string;
  mainContentMargin: string;
}

const SidebarContext = createContext<SidebarContextType | undefined>(undefined);

export const useSidebar = () => {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error('useSidebar must be used within a SidebarProvider');
  }
  return context;
};

interface SidebarProviderProps {
  children: ReactNode;
}

export const SidebarProvider: React.FC<SidebarProviderProps> = ({ children }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  
  const sidebarWidth = isCollapsed ? "64px" : "280px";
  const mainContentMargin = isCollapsed ? "64px" : "280px";

  return (
    <SidebarContext.Provider 
      value={{
        isCollapsed,
        setIsCollapsed,
        sidebarWidth,
        mainContentMargin
      }}
    >
      {children}
    </SidebarContext.Provider>
  );
};