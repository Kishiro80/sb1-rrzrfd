import { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/react'
import prisma from '@/lib/prisma'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getSession({ req })

  if (!session || session.user.role !== 'admin') {
    return res.status(401).json({ error: 'Unauthorized' })
  }

  if (req.method === 'GET') {
    try {
      const foods = await prisma.food.findMany({
        orderBy: { createdAt: 'desc' },
      })
      return res.status(200).json(foods)
    } catch (error) {
      return res.status(500).json({ error: 'Error fetching foods' })
    }
  }

  if (req.method === 'POST') {
    try {
      const food = await prisma.food.create({
        data: req.body,
      })
      return res.status(201).json(food)
    } catch (error) {
      return res.status(500).json({ error: 'Error creating food' })
    }
  }

  return res.status(405).json({ error: 'Method not allowed' })
}