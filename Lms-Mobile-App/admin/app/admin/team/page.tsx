"use client";
import AdminProtected from "@/app/hooks/adminProtected";
import Heading from "@/app/utils/Heading";
import React from "react";
import AllUsers from "../../components/Admin/Users/AllUsers";
import AdminLayout from "../../components/Admin/AdminLayout";

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
        <AdminLayout 
          title="Team Management" 
          description="Manage your admin team members and their roles"
        >
          <AllUsers isTeam={true} />
        </AdminLayout>
      </AdminProtected>
    </div>
  );
};

export default page;
