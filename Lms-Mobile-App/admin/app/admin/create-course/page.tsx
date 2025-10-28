'use client'
import React from 'react'
import Heading from '../../../app/utils/Heading';
import AdminLayout from "../../components/Admin/AdminLayout";
import CreateCourse from "../../components/Admin/Course/CreateCourse";
import AdminProtected from '@/app/hooks/adminProtected';

type Props = {}

const page = (props: Props) => {
  return (
    <div>
      <AdminProtected>
        <Heading
         title="Elearning - Create Course"
         description="ELearning is a platform for students to learn and get help from teachers"
         keywords="Programming,MERN,Redux,Machine Learning"
        />
        <AdminLayout 
          title="Create New Course"
          description="Design and create engaging courses for your learning platform."
          showFloatingMenu={false}
        >
          <div className="p-6">
            <CreateCourse /> 
          </div>
        </AdminLayout>
      </AdminProtected>
    </div>
  )
}

export default page