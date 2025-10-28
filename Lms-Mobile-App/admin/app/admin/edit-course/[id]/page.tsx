'use client'
import React from 'react'
import Heading from '../../../../app/utils/Heading';
import EditCourse from "../../../components/Admin/Course/EditCourse";
import AdminLayout from "../../../components/Admin/AdminLayout";

type Props = {}

const page = ({params}:any) => {
    const id = params?.id;

  return (
    <div>
        <Heading
         title="Elearning - Admin"
         description="ELearning is a platform for students to learn and get help from teachers"
         keywords="Prograaming,MERN,Redux,Machine Learning"
        />
        <AdminLayout 
          title="Edit Course" 
          description="Modify course content, settings, and structure"
        >
          <EditCourse id={id} />
        </AdminLayout>
    </div>
  )
}

export default page