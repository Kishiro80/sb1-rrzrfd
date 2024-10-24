import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import Layout from '@/components/layout/Layout'
import AdminNav from '@/components/admin/AdminNav'
import { Food } from '@prisma/client'
import Link from 'next/link'

export default function AdminDashboard() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [foods, setFoods] = useState<Food[]>([])

  useEffect(() => {
    if (status === 'loading') return
    if (!session || session.user.role !== 'admin') {
      router.push('/')
    }
  }, [session, status, router])

  useEffect(() => {
    const fetchFoods = async () => {
      const response = await fetch('/api/admin/foods')
      const data = await response.json()
      setFoods(data)
    }
    fetchFoods()
  }, [])

  if (status === 'loading') {
    return <div>Loading...</div>
  }

  return (
    <Layout>
      <div className="flex">
        <AdminNav />
        <div className="flex-1 p-8">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">Food Management</h1>
            <Link
              href="/admin/foods/new"
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
            >
              Add New Food
            </Link>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white rounded-lg overflow-hidden">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-6 py-3 text-left">Name</th>
                  <th className="px-6 py-3 text-left">Shop</th>
                  <th className="px-6 py-3 text-left">Location</th>
                  <th className="px-6 py-3 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {foods.map((food) => (
                  <tr key={food.id} className="border-t">
                    <td className="px-6 py-4">{food.name}</td>
                    <td className="px-6 py-4">{food.shopName}</td>
                    <td className="px-6 py-4">{food.location}</td>
                    <td className="px-6 py-4">
                      <Link
                        href={`/admin/foods/${food.id}/edit`}
                        className="text-blue-600 hover:text-blue-800 mr-4"
                      >
                        Edit
                      </Link>
                      <button
                        onClick={async () => {
                          if (confirm('Are you sure you want to delete this food?')) {
                            await fetch(`/api/admin/foods/${food.id}`, {
                              method: 'DELETE',
                            })
                            setFoods(foods.filter((f) => f.id !== food.id))
                          }
                        }}
                        className="text-red-600 hover:text-red-800"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Layout>
  )
}