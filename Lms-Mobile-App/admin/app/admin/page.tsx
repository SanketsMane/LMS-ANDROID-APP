"use client";
import React from "react";
import Heading from "../utils/Heading";
import AdminProtected from "../hooks/adminProtected";
import AdminLayout from "../components/Admin/AdminLayout";
import DashboardWidgets from "../components/Admin/Widgets/DashboardWidgets";

type Props = {};

const page = (props: Props) => {
  return (
    <div>
      <AdminProtected>
        <Heading
          title="Elearning - Admin"
          description="ELearning is a platform for students to learn and get help from teachers"
          keywords="Programming,MERN,Redux,Machine Learning"
        />
        <AdminLayout>
          <DashboardWidgets open={false} />
        </AdminLayout>
      </AdminProtected>
    </div>
  );
};

export default page;
