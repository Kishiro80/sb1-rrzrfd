import { signIn, signOut, useSession } from 'next-auth/react'
import Link from 'next/link'
import { FaUser, FaHeart, FaStore, FaUtensils } from 'react-icons/fa'
import AuthButton from '../auth/AuthButton'

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
              
            </>
          ) :  null }
          <AuthButton /> 
        </div>
      </nav>
    </header>
  )
}