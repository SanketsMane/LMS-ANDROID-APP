'use client'
import AdminProtected from '@/app/hooks/adminProtected'
import Heading from '@/app/utils/Heading'
import React from 'react'
import AdminLayout from "../../components/Admin/AdminLayout";
import AllUsers from "../../components/Admin/Users/AllUsers";

type Props = {}

const page = (props: Props) => {
  return (
    <div>
      <AdminProtected>
        <Heading
          title="Elearning - Users Management"
          description="ELearning is a platform for students to learn and get help from teachers"
          keywords="Programming,MERN,Redux,Machine Learning"
        />
        <AdminLayout 
          title="Users Management"
          description="Manage all registered users, admins, and instructors in your platform."
          showFloatingMenu={false}
        >
          <AllUsers />
        </AdminLayout>
      </AdminProtected>
    </div>
  )
}

export default page