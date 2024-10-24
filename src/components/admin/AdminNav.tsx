import Link from 'next/link'
import { FaUtensils, FaUsers, FaChartBar } from 'react-icons/fa'

export default function AdminNav() {
  return (
    <nav className="w-64 bg-gray-800 min-h-screen p-4">
      <div className="text-white text-xl font-bold mb-8">Admin Dashboard</div>
      <ul className="space-y-2">
        <li>
          <Link
            href="/admin"
            className="flex items-center text-gray-300 hover:text-white p-2 rounded hover:bg-gray-700"
          >
            <FaUtensils className="mr-2" />
            Foods
          </Link>
        </li>
        <li>
          <Link
            href="/admin/users"
            className="flex items-center text-gray-300 hover:text-white p-2 rounded hover:bg-gray-700"
          >
            <FaUsers className="mr-2" />
            Users
          </Link>
        </li>
        <li>
          <Link
            href="/admin/stats"
            className="flex items-center text-gray-300 hover:text-white p-2 rounded hover:bg-gray-700"
          >
            <FaChartBar className="mr-2" />
            Statistics
          </Link>
        </li>
      </ul>
    </nav>
  )
}