import { useState } from 'react'
import { useRouter } from 'next/router'
import { useSession } from 'next-auth/react'
import Layout from '@/components/layout/Layout'
import AdminNav from '@/components/admin/AdminNav'
import FoodForm from '@/components/admin/FoodForm'

export default function NewFood() {
  const router = useRouter()
  const { data: session, status } = useSession()

  if (status === 'loading') {
    return <div>Loading...</div>
  }

  if (!session || session.user.role !== 'admin') {
    router.push('/')
    return null
  }

  return (
    <Layout>
      <div className="flex">
        <AdminNav />
        <div className="flex-1 p-8">
          <h1 className="text-2xl font-bold mb-6">Add New Food</h1>
          <FoodForm onSubmit={() => router.push('/admin')} />
        </div>
      </div>
    </Layout>
  )
}