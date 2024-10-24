import { useRouter } from 'next/router'
import { useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'
import Layout from '@/components/layout/Layout'
import AdminNav from '@/components/admin/AdminNav'
import FoodForm from '@/components/admin/FoodForm'
import type { Food } from '@prisma/client'

export default function EditFood() {
  const router = useRouter()
  const { id } = router.query
  const { data: session, status } = useSession()
  const [food, setFood] = useState<Food | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (id) {
      fetch(`/api/admin/foods/${id}`)
        .then((res) => res.json())
        .then((data) => {
          setFood(data)
          setLoading(false)
        })
        .catch((error) => {
          console.error('Error fetching food:', error)
          setLoading(false)
        })
    }
  }, [id])

  if (status === 'loading' || loading) {
    return <div>Loading...</div>
  }

  if (!session || session.user.role !== 'admin') {
    router.push('/')
    return null
  }

  if (!food) {
    return <div>Food not found</div>
  }

  return (
    <Layout>
      <div className="flex">
        <AdminNav />
        <div className="flex-1 p-8">
          <h1 className="text-2xl font-bold mb-6">Edit Food</h1>
          <FoodForm food={food} onSubmit={() => router.push('/admin')} />
        </div>
      </div>
    </Layout>
  )
}