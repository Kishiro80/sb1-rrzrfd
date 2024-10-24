import { S3Client } from '@aws-sdk/client-s3'
import { createPresignedPost } from '@aws-sdk/s3-presigned-post'

const s3Client = new S3Client({
  region: process.env.AWS_REGION!,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
})

export async function createPresignedUploadUrl(key: string) {
  try {
    const { url, fields } = await createPresignedPost(s3Client, {
      Bucket: process.env.AWS_S3_BUCKET!,
      Key: key,
      Expires: 600, // URL expires in 10 minutes
      Conditions: [
        ['content-length-range', 0, 10485760], // up to 10MB
        ['starts-with', '$Content-Type', 'image/'],
      ],
    })

    return { url, fields }
  } catch (error) {
    console.error('Error creating presigned URL:', error)
    throw error
  }
}