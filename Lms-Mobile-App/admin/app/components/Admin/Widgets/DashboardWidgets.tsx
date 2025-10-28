import React, { FC, useEffect, useState } from "react";
import UserAnalytics from "../Analytics/UserAnalytics";
import { BiBorderLeft } from "react-icons/bi";
import { PiUsersFourLight } from "react-icons/pi";
import { Box, CircularProgress } from "@mui/material";
import OrdersAnalytics from "../Analytics/OrdersAnalytics";
import AllInvoices from "../Order/AllInvoices";
import {
  useGetOrdersAnalyticsQuery,
  useGetUsersAnalyticsQuery,
} from "@/redux/features/analytics/analyticsApi";
import { useGetAllCoursesQuery } from "@/redux/features/courses/coursesApi";
import { useGetAllOrdersQuery } from "@/redux/features/orders/ordersApi";

type Props = {
  open?: boolean;
  value?: number;
};

const CircularProgressWithLabel: FC<Props> = ({ open, value }) => {
  return (
    <Box sx={{ position: "relative", display: "inline-flex" }}>
      <CircularProgress
        variant="determinate"
        value={value}
        size={45}
        color={value && value > 99 ? "info" : "error"}
        thickness={4}
        style={{ zIndex: open ? -1 : 1 }}
      />
      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: "absolute",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      ></Box>
    </Box>
  );
};

const DashboardWidgets: FC<Props> = ({ open }) => {
  const [ordersComparePercentage, setOrdersComparePercentage] = useState<any>();
  const [userComparePercentage, setuserComparePercentage] = useState<any>();
  const [totalRevenue, setTotalRevenue] = useState(0);

  const { data, isLoading } = useGetUsersAnalyticsQuery({});
  const { data: ordersData, isLoading: ordersLoading } =
    useGetOrdersAnalyticsQuery({});
  const { data: coursesData, isLoading: coursesLoading } =
    useGetAllCoursesQuery({});
  const { data: allOrders } = useGetAllOrdersQuery({});

  useEffect(() => {
    if (isLoading && ordersLoading) {
      return;
    } else {
      if (data && ordersData) {
        const usersLastTwoMonths = data.users.last12Months.slice(-2);
        const ordersLastTwoMonths = ordersData.orders.last12Months.slice(-2);

        if (
          usersLastTwoMonths.length === 2 &&
          ordersLastTwoMonths.length === 2
        ) {
          const usersCurrentMonth = usersLastTwoMonths[1].count;
          const usersPreviousMonth = usersLastTwoMonths[0].count;
          const ordersCurrentMonth = ordersLastTwoMonths[1].count;
          const ordersPreviousMonth = ordersLastTwoMonths[0].count;

          const usersPercentChange = usersPreviousMonth !== 0 ?
            ((usersCurrentMonth - usersPreviousMonth) / usersPreviousMonth) *
            100 : 100;

          const ordersPercentChange = ordersPreviousMonth !== 0 ?
            ((ordersCurrentMonth - ordersPreviousMonth) / ordersPreviousMonth) *
            100 : 100;

          setuserComparePercentage({
            currentMonth: usersCurrentMonth,
            previousMonth: usersPreviousMonth,
            percentChange: usersPercentChange,
          });

          setOrdersComparePercentage({
            currentMonth: ordersCurrentMonth,
            previousMonth: ordersPreviousMonth,
            percentChange: ordersPercentChange,
          });
        }
      }
    }

    // Calculate total revenue from all orders and courses
    if (allOrders && coursesData) {
      let revenue = 0;
      allOrders.orders.forEach((order: any) => {
        const course = coursesData.courses.find((course: any) => course._id === order.courseId);
        if (course) {
          revenue += course.price || 0;
        }
      });
      setTotalRevenue(revenue);
    }
  }, [isLoading, ordersLoading, data, ordersData, allOrders, coursesData]);

  return (
    <div className="p-6 space-y-6">
      {/* Stats Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Sales Card */}
        <div className="backdrop-blur-xl bg-white/80 dark:bg-gray-900/80 rounded-2xl border border-white/20 dark:border-white/10 p-6 shadow-xl hover:shadow-2xl transition-all duration-300 group">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl shadow-lg group-hover:scale-110 transition-transform duration-300">
                <BiBorderLeft className="text-white text-2xl" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Sales</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {ordersComparePercentage?.currentMonth || 0}
                </p>
              </div>
            </div>
            <div className="text-right">
              <div className="flex items-center space-x-1">
                <span className={`text-sm font-semibold ${
                  ordersComparePercentage?.percentChange > 0 
                    ? 'text-green-500' 
                    : 'text-red-500'
                }`}>
                  {ordersComparePercentage?.percentChange > 0 ? '+' : ''}
                  {ordersComparePercentage?.percentChange?.toFixed(1) || 0}%
                </span>
                <svg className={`w-4 h-4 ${
                  ordersComparePercentage?.percentChange > 0 
                    ? 'text-green-500 rotate-0' 
                    : 'text-red-500 rotate-180'
                }`} fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.293 7.707a1 1 0 010-1.414L10 1.586l4.707 4.707a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L6.707 7.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
              </div>
              <p className="text-xs text-gray-500">vs last month</p>
            </div>
          </div>
        </div>

        {/* Users Card */}
        <div className="backdrop-blur-xl bg-white/80 dark:bg-gray-900/80 rounded-2xl border border-white/20 dark:border-white/10 p-6 shadow-xl hover:shadow-2xl transition-all duration-300 group">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl shadow-lg group-hover:scale-110 transition-transform duration-300">
                <PiUsersFourLight className="text-white text-2xl" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">New Users</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {userComparePercentage?.currentMonth || 0}
                </p>
              </div>
            </div>
            <div className="text-right">
              <div className="flex items-center space-x-1">
                <span className={`text-sm font-semibold ${
                  userComparePercentage?.percentChange > 0 
                    ? 'text-green-500' 
                    : 'text-red-500'
                }`}>
                  {userComparePercentage?.percentChange > 0 ? '+' : ''}
                  {userComparePercentage?.percentChange?.toFixed(1) || 0}%
                </span>
                <svg className={`w-4 h-4 ${
                  userComparePercentage?.percentChange > 0 
                    ? 'text-green-500 rotate-0' 
                    : 'text-red-500 rotate-180'
                }`} fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.293 7.707a1 1 0 010-1.414L10 1.586l4.707 4.707a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L6.707 7.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
              </div>
              <p className="text-xs text-gray-500">vs last month</p>
            </div>
          </div>
        </div>

        {/* Revenue Card */}
        <div className="backdrop-blur-xl bg-white/80 dark:bg-gray-900/80 rounded-2xl border border-white/20 dark:border-white/10 p-6 shadow-xl hover:shadow-2xl transition-all duration-300 group">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl shadow-lg group-hover:scale-110 transition-transform duration-300">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                </svg>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Revenue</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  ${totalRevenue.toFixed(2)}
                </p>
              </div>
            </div>
            <div className="text-right">
              <div className="flex items-center space-x-1">
                <span className="text-sm font-semibold text-gray-500">0%</span>
                <svg className="w-4 h-4 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                </svg>
              </div>
              <p className="text-xs text-gray-500">vs last month</p>
            </div>
          </div>
        </div>

        {/* Courses Card */}
        <div className="backdrop-blur-xl bg-white/80 dark:bg-gray-900/80 rounded-2xl border border-white/20 dark:border-white/10 p-6 shadow-xl hover:shadow-2xl transition-all duration-300 group">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl shadow-lg group-hover:scale-110 transition-transform duration-300">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Courses</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {coursesData?.courses?.length || 0}
                </p>
              </div>
            </div>
            <div className="text-right">
              <div className="flex items-center space-x-1">
                <span className="text-sm font-semibold text-gray-500">0%</span>
                <svg className="w-4 h-4 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                </svg>
              </div>
              <p className="text-xs text-gray-500">vs last month</p>
            </div>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Analytics Chart */}
        <div className="lg:col-span-2 backdrop-blur-xl bg-white/80 dark:bg-gray-900/80 rounded-2xl border border-white/20 dark:border-white/10 p-6 shadow-xl">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">User Analytics</h3>
            <div className="flex items-center space-x-2">
              <button className="px-3 py-1 text-sm bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full hover:bg-blue-200 dark:hover:bg-blue-900/50 transition-all duration-200">
                Week
              </button>
              <button className="px-3 py-1 text-sm text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 transition-colors duration-200">
                Month
              </button>
              <button className="px-3 py-1 text-sm text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 transition-colors duration-200">
                Year
              </button>
            </div>
          </div>
          <UserAnalytics isDashboard={true} />
        </div>

        {/* Quick Actions & Recent Activity */}
        <div className="space-y-6">
          {/* Quick Actions */}
          <div className="backdrop-blur-xl bg-white/80 dark:bg-gray-900/80 rounded-2xl border border-white/20 dark:border-white/10 p-6 shadow-xl">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <button className="w-full flex items-center space-x-3 p-3 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 text-white hover:from-blue-600 hover:to-cyan-600 transition-all duration-200 group">
                <svg className="w-5 h-5 group-hover:scale-110 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                <span className="font-medium">Create Course</span>
              </button>
              <button className="w-full flex items-center space-x-3 p-3 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600 transition-all duration-200 group">
                <svg className="w-5 h-5 group-hover:scale-110 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                <span className="font-medium">Add User</span>
              </button>
              <button className="w-full flex items-center space-x-3 p-3 rounded-xl bg-gradient-to-r from-green-500 to-emerald-500 text-white hover:from-green-600 hover:to-emerald-600 transition-all duration-200 group">
                <svg className="w-5 h-5 group-hover:scale-110 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
                <span className="font-medium">View Analytics</span>
              </button>
            </div>
          </div>

          {/* Recent Transactions */}
          <div className="backdrop-blur-xl bg-white/80 dark:bg-gray-900/80 rounded-2xl border border-white/20 dark:border-white/10 p-6 shadow-xl">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Recent Transactions</h3>
              <button className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium">
                View all
              </button>
            </div>
            <AllInvoices isDashboard={true} />
          </div>
        </div>
      </div>

      {/* Orders Analytics */}
      <div className="backdrop-blur-xl bg-white/80 dark:bg-gray-900/80 rounded-2xl border border-white/20 dark:border-white/10 p-6 shadow-xl">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Orders Analytics</h3>
          <div className="flex items-center space-x-2">
            <span className="px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-full text-sm font-medium">
              Live
            </span>
          </div>
        </div>
        <OrdersAnalytics isDashboard={true} />
      </div>
    </div>
  );
};

export default DashboardWidgets;
