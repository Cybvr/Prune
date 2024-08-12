import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full text-center">
        <h2 className="text-4xl font-bold mb-4 text-gray-800">404</h2>
        <h3 className="text-2xl font-semibold mb-4 text-gray-700">Page Not Found</h3>
        <p className="text-gray-600 mb-8">Oops! The page you're looking for doesn't exist or has been moved.</p>
        <Link 
          href="/" 
          className="bg-blue-500 text-white px-6 py-3 rounded-full hover:bg-blue-600 transition duration-300 inline-block"
        >
          Return to Homepage
        </Link>
      </div>
    </div>
  );
}