'use client'
import AdminProtected from '@/app/hooks/adminProtected'
import Heading from '@/app/utils/Heading'
import React from 'react'
import AdminLayout from "../../components/Admin/AdminLayout";
import AllCourses from "../../components/Admin/Course/AllCourses";

type Props = {}

const page = (props: Props) => {
  return (
    <div>
      <AdminProtected>
        <Heading
          title="Elearning - Courses Management"
          description="ELearning is a platform for students to learn and get help from teachers"
          keywords="Programming,MERN,Redux,Machine Learning"
        />
        <AdminLayout 
          title="Course Management"
          description="View, edit, and manage all courses in your learning platform."
          showFloatingMenu={false}
        >
          <AllCourses />
        </AdminLayout>
      </AdminProtected>
    </div>
  )
}

export default page