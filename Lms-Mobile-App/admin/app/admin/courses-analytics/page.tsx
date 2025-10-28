'use client'
import React from 'react'
import Heading from '../../../app/utils/Heading';
import AdminLayout from "../../components/Admin/AdminLayout";
import CourseAnalytics from "../../components/Admin/Analytics/CourseAnalytics";
import AdminProtected from '@/app/hooks/adminProtected';

type Props = {}

const page = (props: Props) => {
  return (
    <div>
      <AdminProtected>
        <Heading
         title="Elearning - Course Analytics"
         description="ELearning is a platform for students to learn and get help from teachers"
         keywords="Programming,MERN,Redux,Machine Learning"
        />
        <AdminLayout 
          title="Course Analytics"
          description="Detailed insights and performance metrics for all your courses."
          showFloatingMenu={false}
        >
          <div className="p-6">
            <CourseAnalytics />
          </div>
        </AdminLayout>
      </AdminProtected>
    </div>
  )
}

export default page