import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { GetServerSideProps } from 'next'
import Layout from '@/components/layout/Layout'
import FoodCard from '@/components/food/FoodCard'
import prisma from '@/lib/prisma'
import type { Food } from '@prisma/client'

interface SwipePageProps {
  foods: Food[]
}

export default function SwipePage({ foods }: SwipePageProps) {
  const { data: session } = useSession()
  const [currentFoods, setCurrentFoods] = useState<Food[]>(foods)

  const handleSwipe = async (direction: string, foodId: string) => {
    if (!session?.user?.id) return

    try {
      await fetch('/api/swipes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          foodId,
          liked: direction === 'right',
          userId: session.user.id,
        }),
      })
    } catch (error) {
      console.error('Error saving swipe:', error)
    }
  }

  return (
    <Layout>
      <div className="flex flex-col items-center justify-center min-h-[80vh]">
        <div className="relative w-80 h-96">
          {currentFoods.map((food) => (
            <FoodCard
              key={food.id}
              food={food}
              onSwipe={(direction) => handleSwipe(direction, food.id)}
            />
          ))}
        </div>
      </div>
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  const foods = await prisma.food.findMany({
    take: 10,
    orderBy: { createdAt: 'desc' },
  })

  return {
    props: {
      foods: JSON.parse(JSON.stringify(foods)),
    },
  }
}