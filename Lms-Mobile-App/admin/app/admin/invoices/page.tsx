'use client'
import React from 'react'
import Heading from '../../../app/utils/Heading';
import AllInvoices from "../../../app/components/Admin/Order/AllInvoices";
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
          title="Invoices" 
          description="View and manage all course invoices and transactions"
        >
          <AllInvoices />
        </AdminLayout>
    </div>
  )
}

export default page