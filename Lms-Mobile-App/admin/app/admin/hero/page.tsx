'use client'
import AdminProtected from '@/app/hooks/adminProtected'
import Heading from '@/app/utils/Heading'
import React from 'react'
import AdminLayout from "../../components/Admin/AdminLayout";
import EditHero from "../../components/Admin/Customization/EditHero";

type Props = {}

const page = (props: Props) => {
  return (
    <div>
      <AdminProtected>
        <Heading
          title="Elearning - Hero Section"
          description="ELearning is a platform for students to learn and get help from teachers"
          keywords="Programming,MERN,Redux,Machine Learning"
        />
        <AdminLayout 
          title="Hero Section"
          description="Customize the main hero section and banner of your platform."
          showFloatingMenu={false}
        >
          <EditHero />
        </AdminLayout>
      </AdminProtected>
    </div>
  )
}

export default page