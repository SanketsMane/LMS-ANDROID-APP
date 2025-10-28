"use client";
import AdminProtected from "@/app/hooks/adminProtected";
import Heading from "@/app/utils/Heading";
import React from "react";
import AdminLayout from "../../components/Admin/AdminLayout";
import EditCategories from "../../components/Admin/Customization/EditCategories";

type Props = {};

const page = (props: Props) => {
  return (
    <div>
      <AdminProtected>
        <Heading
          title="Elearning - Categories Management"
          description="ELearning is a platform for students to learn and get help from teachers"
          keywords="Programming,MERN,Redux,Machine Learning"
        />
        <AdminLayout 
          title="Categories Management"
          description="Create and manage course categories for better organization."
          showFloatingMenu={false}
        >
          <EditCategories />
        </AdminLayout>
      </AdminProtected>
    </div>
  );
};

export default page;
