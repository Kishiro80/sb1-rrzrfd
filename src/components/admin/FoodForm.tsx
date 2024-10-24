import { useState, FormEvent } from 'react'
import { Food } from '@prisma/client'
import ImageUpload from './ImageUpload'

interface FoodFormProps {
  food?: Food
  onSubmit: () => void
}

export default function FoodForm({ food, onSubmit }: FoodFormProps) {
  const [formData, setFormData] = useState({
    name: food?.name || '',
    description: food?.description || '',
    image: food?.image || '',
    location: food?.location || '',
    shopName: food?.shopName || '',
    shopAddress: food?.shopAddress || '',
  })
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const url = food ? `/api/admin/foods/${food.id}` : '/api/admin/foods'
      const method = food ? 'PUT' : 'POST'

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      if (!response.ok) throw new Error('Failed to save food')
      onSubmit()
    } catch (error) {
      console.error('Error saving food:', error)
      alert('Failed to save food')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl bg-white p-6 rounded-lg shadow-md">
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Food Image</label>
          {formData.image ? (
            <div className="relative">
              <img
                src={formData.image}
                alt="Food preview"
                className="w-full h-48 object-cover rounded-lg"
              />
              <button
                type="button"
                onClick={() => setFormData({ ...formData, image: '' })}
                className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full hover:bg-red-600"
              >
                ×
              </button>
            </div>
          ) : (
            <ImageUpload
              onImageUploaded={(imageUrl) => setFormData({ ...formData, image: imageUrl })}
            />
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Name</label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Description</label>
          <textarea
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            rows={3}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Location</label>
          <input
            type="text"
            value={formData.location}
            onChange={(e) => setFormData({ ...formData, location: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Shop Name</label>
          <input
            type="text"
            value={formData.shopName}
            onChange={(e) => setFormData({ ...formData, shopName: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Shop Address</label>
          <input
            type="text"
            value={formData.shopAddress}
            onChange={(e) => setFormData({ ...formData, shopAddress: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            required
          />
        </div>
      </div>

      <div className="mt-6">
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
        >
          {loading ? 'Saving...' : (food ? 'Update Food' : 'Add Food')}
        </button>
      </div>
    </form>
  )
}