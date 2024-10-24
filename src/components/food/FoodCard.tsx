import { useState } from 'react'
import TinderCard from 'react-tinder-card'
import { Food } from '@prisma/client'

interface FoodCardProps {
  food: Food
  onSwipe: (direction: string) => void
}

export default function FoodCard({ food, onSwipe }: FoodCardProps) {
  const [direction, setDirection] = useState<string | undefined>()

  const onCardLeftScreen = (myIdentifier: string) => {
    setDirection(undefined)
  }

  return (
    <TinderCard
      className="absolute"
      onSwipe={(dir) => onSwipe(dir)}
      onCardLeftScreen={() => onCardLeftScreen(food.id)}
      preventSwipe={['up', 'down']}
    >
      <div className="relative w-80 h-96 bg-white rounded-2xl shadow-xl">
        <img
          src={food.image}
          alt={food.name}
          className="w-full h-64 object-cover rounded-t-2xl"
        />
        <div className="p-4">
          <h2 className="text-xl font-bold">{food.name}</h2>
          <p className="text-gray-600">{food.description}</p>
          <p className="text-sm text-gray-500 mt-2">{food.shopName}</p>
        </div>
      </div>
    </TinderCard>
  )
}