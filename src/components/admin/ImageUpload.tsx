import { useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { FaCloudUploadAlt } from 'react-icons/fa'

interface ImageUploadProps {
  onImageUploaded: (imageUrl: string) => void
}

export default function ImageUpload({ onImageUploaded }: ImageUploadProps) {
  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    const file = acceptedFiles[0]
    if (!file) return

    try {
      // Get presigned URL
      const presignedResponse = await fetch('/api/upload-url', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          filename: file.name,
          contentType: file.type,
        }),
      })

      if (!presignedResponse.ok) throw new Error('Failed to get upload URL')
      
      const { url, fields, imageUrl } = await presignedResponse.json()

      // Create form data for S3 upload
      const formData = new FormData()
      Object.entries(fields).forEach(([key, value]) => {
        formData.append(key, value as string)
      })
      formData.append('file', file)

      // Upload to S3
      const uploadResponse = await fetch(url, {
        method: 'POST',
        body: formData,
      })

      if (!uploadResponse.ok) throw new Error('Failed to upload image')
      
      onImageUploaded(imageUrl)
    } catch (error) {
      console.error('Error uploading image:', error)
      alert('Failed to upload image')
    }
  }, [onImageUploaded])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.webp'],
    },
    maxSize: 10485760, // 10MB
    multiple: false,
  })

  return (
    <div
      {...getRootProps()}
      className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors
        ${isDragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-blue-500'}`}
    >
      <input {...getInputProps()} />
      <FaCloudUploadAlt className="mx-auto text-4xl text-gray-400 mb-2" />
      {isDragActive ? (
        <p>Drop the image here</p>
      ) : (
        <div>
          <p className="text-gray-600">Drag & drop an image here, or click to select</p>
          <p className="text-sm text-gray-500 mt-1">PNG, JPG, WEBP up to 10MB</p>
        </div>
      )}
    </div>
  )
}