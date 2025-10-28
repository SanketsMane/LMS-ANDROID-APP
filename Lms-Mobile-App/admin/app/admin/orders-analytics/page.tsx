'use client'
import React from 'react'
import Heading from '../../../app/utils/Heading';
import OrdersAnalytics from "../../components/Admin/Analytics/OrdersAnalytics";
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
          title="Orders Analytics" 
          description="Track and analyze order patterns and revenue metrics"
        >
          <OrdersAnalytics />
        </AdminLayout>
    </div>
  )
}

export default page