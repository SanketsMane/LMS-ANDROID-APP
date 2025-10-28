"use client";
import AdminProtected from "@/app/hooks/adminProtected";
import Heading from "@/app/utils/Heading";
import React from "react";
import AdminLayout from "../../components/Admin/AdminLayout";
import EditFaq from "../../components/Admin/Customization/EditFaq";

type Props = {};

const page = (props: Props) => {
  return (
    <div>
      <AdminProtected>
        <Heading
          title="Elearning - FAQ Management"
          description="ELearning is a platform for students to learn and get help from teachers"
          keywords="Programming,MERN,Redux,Machine Learning"
        />
        <AdminLayout 
          title="FAQ Management"
          description="Create and manage frequently asked questions for your platform."
          showFloatingMenu={false}
        >
          <EditFaq />
        </AdminLayout>
      </AdminProtected>
    </div>
  );
};

export default page;
