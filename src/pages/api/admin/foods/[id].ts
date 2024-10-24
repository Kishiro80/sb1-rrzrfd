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

  const { id } = req.query

  if (req.method === 'GET') {
    try {
      const food = await prisma.food.findUnique({
        where: { id: String(id) },
      })
      if (!food) {
        return res.status(404).json({ error: 'Food not found' })
      }
      return res.status(200).json(food)
    } catch (error) {
      return res.status(500).json({ error: 'Error fetching food' })
    }
  }

  if (req.method === 'PUT') {
    try {
      const food = await prisma.food.update({
        where: { id: String(id) },
        data: req.body,
      })
      return res.status(200).json(food)
    } catch (error) {
      return res.status(500).json({ error: 'Error updating food' })
    }
  }

  if (req.method === 'DELETE') {
    try {
      await prisma.food.delete({
        where: { id: String(id) },
      })
      return res.status(204).end()
    } catch (error) {
      return res.status(500).json({ error: 'Error deleting food' })
    }
  }

  return res.status(405).json({ error: 'Method not allowed' })
}