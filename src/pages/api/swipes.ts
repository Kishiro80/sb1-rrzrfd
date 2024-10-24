import { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/react'
import prisma from '@/lib/prisma'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getSession({ req })

  if (!session) {
    return res.status(401).json({ error: 'Unauthorized' })
  }

  if (req.method === 'POST') {
    try {
      const { foodId, liked, userId } = req.body

      const swipe = await prisma.swipe.create({
        data: {
          foodId,
          liked,
          userId,
        },
      })

      return res.status(200).json(swipe)
    } catch (error) {
      return res.status(500).json({ error: 'Error creating swipe' })
    }
  }

  return res.status(405).json({ error: 'Method not allowed' })
}