'use client' // Error components must be Client Components

import { useEffect } from 'react'
import Link from 'next/link'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error)
  }, [error])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
        <h2 className="text-2xl font-bold mb-4 text-red-600">Oops! Something went wrong</h2>
        <p className="text-gray-600 mb-4">We apologize for the inconvenience. An unexpected error has occurred.</p>
        <div className="flex flex-col space-y-4">
          <button
            onClick={() => reset()}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300"
          >
            Try again
          </button>
          <Link href="/" className="text-blue-500 hover:underline text-center">
            Return to homepage
          </Link>
        </div>
      </div>
    </div>
  )
}