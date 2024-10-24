import { signIn, signOut, useSession } from 'next-auth/react'
import Link from 'next/link'
import { FaUser, FaHeart, FaStore, FaUtensils } from 'react-icons/fa'

export default function Header() {
  const { data: session } = useSession()

  return (
    <header className="bg-white shadow-md">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link href="/" className="text-xl font-bold text-gray-800">
          FoodFinder
        </Link>
        
        <div className="flex items-center space-x-4">
          {session ? (
            <>
              <Link href="/swipe" className="nav-link">
                <FaUtensils className="text-gray-600" />
              </Link>
              <Link href="/liked" className="nav-link">
                <FaHeart className="text-gray-600" />
              </Link>
              <Link href="/shops" className="nav-link">
                <FaStore className="text-gray-600" />
              </Link>
              <Link href="/profile" className="nav-link">
                <FaUser className="text-gray-600" />
              </Link>
              <button
                onClick={() => signOut()}
                className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
              >
                Sign Out
              </button>
            </>
          ) : (
            <button
              onClick={() => signIn('google')}
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
            >
              Sign In
            </button>
          )}
        </div>
      </nav>
    </header>
  )
}