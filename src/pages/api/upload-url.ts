import { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/react'
import { createPresignedUploadUrl } from '@/lib/s3'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getSession({ req })

  if (!session || session.user.role !== 'admin') {
    return res.status(401).json({ error: 'Unauthorized' })
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const { filename, contentType } = req.body
    const key = `foods/${Date.now()}-${filename}`
    const presignedPost = await createPresignedUploadUrl(key)
    
    return res.status(200).json({
      ...presignedPost,
      imageUrl: `https://${process.env.AWS_S3_BUCKET}.s3.${process.env.AWS_REGION}.amazonaws.com/${key}`,
    })
  } catch (error) {
    console.error('Error generating upload URL:', error)
    return res.status(500).json({ error: 'Error generating upload URL' })
  }
}