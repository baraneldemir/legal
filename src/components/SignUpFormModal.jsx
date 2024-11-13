import { useState, useRef } from 'react';
import { signUp } from '../utilities/users-api';


export default function SignUpForm({ setUser, show, handleClose }) {
  const fullNameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();


  const [error, setError] = useState('');

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    try {
        const userFormData = {
            name: fullNameRef.current.value,
            email: emailRef.current.value,
            password: passwordRef.current.value,
        };

        // Log user data being sent
        console.log("Submitting user data: ", userFormData);

        const user = await signUp(userFormData);  // Get user from signUp

        setUser(user);  // Update user state
        console.log(user)
        handleClose();  // Close the modal after successful sign-up
    } catch (error) {
        console.error('Error during sign-up: ', error);  // Log the error
        setError('Sign Up Failed - Try Again');
    }
};

  if (!show) return null; // Only show the modal when 'show' is true

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold">Sign Up</h2>
          <button onClick={handleClose} className="text-gray-500 hover:text-gray-800">
            &times;
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Full Name
            </label>
            <input
              type="text"
              ref={fullNameRef}
              required
              className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              ref={emailRef}
              required
              className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              ref={passwordRef}
              required
              className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              className="px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600"
            >
              Sign Up
            </button>
          </div>
        </form>
        {error && <p className="mt-4 text-red-500">{error}</p>}
      </div>
    </div>
  );
}
