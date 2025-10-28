"use client";
import React, { ReactNode } from "react";
import AdminSidebar from "./sidebar/AdminSidebar";
import DashboardHeader from "./DashboardHeader";
import { useSidebar } from "../../contexts/SidebarContext";

interface AdminLayoutProps {
  children: ReactNode;
  title?: string;
  description?: string;
  showFloatingMenu?: boolean;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ 
  children, 
  title,
  description,
  showFloatingMenu = true 
}) => {
  const { isCollapsed } = useSidebar();
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-black">
      {/* Fixed Sidebar */}
      <AdminSidebar />
      
      {/* Main Content - adjusted for fixed sidebar */}
      <div className={`${isCollapsed ? 'ml-16' : 'ml-64'} min-h-screen transition-all duration-300`}>
        {/* Header */}
        <DashboardHeader />
        
        {/* Page Content */}
        <div className="p-6">
          {/* Page Title Section */}
          {title && (
            <div className="mb-6">
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                {title}
              </h1>
              {description && (
                <p className="text-gray-600 dark:text-gray-400 mt-1">
                  {description}
                </p>
              )}
            </div>
          )}
          
          {/* Main Content Area */}
          <div>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;