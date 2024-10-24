import { useSession } from 'next-auth/react'
import Layout from '@/components/layout/Layout'
import Link from 'next/link'

export default function Home() {
  const { data: session } = useSession()

  return (
    <Layout>
      <div className="flex flex-col items-center justify-center min-h-[80vh]">
        <h1 className="text-4xl font-bold text-center mb-8">
          Find Your Next Favorite Food
        </h1>
        {session ? (
          <Link
            href="/swipe"
            className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600"
          >
            Start Swiping
          </Link>
        ) : (
          <p className="text-xl text-gray-600">Sign in to start discovering food</p>
        )}
      </div>
    </Layout>
  )
}