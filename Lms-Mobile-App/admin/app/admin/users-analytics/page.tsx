'use client'
import React from 'react'
import Heading from '../../utils/Heading';
import UserAnalytics from '../../../app/components/Admin/Analytics/UserAnalytics';
import AdminLayout from "../../components/Admin/AdminLayout";

type Props = {}

const page = (props: Props) => {
  return (
    <div>
        <Heading
         title="Elearning - Admin"
         description="ELearning is a platform for students to learn and get help from teachers"
         keywords="Prograaming,MERN,Redux,Machine Learning"
        />
        <AdminLayout 
          title="Users Analytics" 
          description="Analyze user engagement, registration trends, and activity patterns"
        >
          <UserAnalytics />
        </AdminLayout>
    </div>
  )
}

export default page