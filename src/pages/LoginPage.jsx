import React from 'react';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const navigate = useNavigate();

  const handleContinue = () => {
    // Add login logic here
    navigate('/dashboard');
  };

  return (
    <div className="flex flex-col items-center justify-center h-full px-4 sm:px-0">
      <img src="./assets/images/people.png" alt="People" className="mb-2 w-1/3 max-w-xs" />

      <h1 className="text-3xl font-bold mb-8 text-center">
        Your Nomad Organizer
      </h1>

      <div className="w-full max-w-md">
        <button 
          onClick={handleContinue}
          className="w-full bg-white border border-gray-300 rounded-lg px-4 py-3 mb-3 flex items-center justify-center text-gray-700 hover:bg-gray-100"
        >
          <img src="./assets/images/google.svg" alt="Google" className="w-5 h-5 mr-3" />
          Continue with Google
        </button>

        <button 
          onClick={handleContinue}
          className="w-full bg-blue-600 text-white rounded-lg px-4 py-3 mb-3 flex items-center justify-center hover:bg-blue-700"
        >
          <img src="./assets/images/facebook.svg" alt="Facebook" className="w-5 h-5 mr-3" />
          Continue with Facebook
        </button>

        <button 
          onClick={handleContinue}
          className="w-full bg-black text-white rounded-lg px-4 py-3 mb-3 flex items-center justify-center hover:bg-gray-800"
        >
          <img src="./assets/images/apple.svg" alt="Apple" className="w-5 h-5 mr-3" />
          Continue with Apple
        </button>

        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-gray-500">Or</span>
          </div>
        </div>

        <input
          type="email"
          placeholder="Enter your email"
          className="w-full px-4 py-3 border border-gray-300 rounded-lg mb-3"
        />

        <button 
          onClick={handleContinue}
          className="w-full bg-pink-600 text-white rounded-lg px-4 py-3 hover:bg-pink-700"
        >
          Continue
        </button>

        <p className="mt-4 text-sm text-center text-gray-600">
          By continuing, you agree to Prune's Terms of Service and Privacy Policy.
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
