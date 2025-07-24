import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // to navigate to /adminportal

export const AdminAuthentication = ({setIsAuthenticated}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (username.trim() !== '' && password.trim() !== '') {
      // Redirect to /adminportal
      setIsAuthenticated(true);
      navigate('/admin-portal');
    } else {
      alert('Please fill both username and password.');
    }
  };

  return (
    <>
      <form className="max-w-sm mx-auto" onSubmit={handleSubmit}>
        <div className="mb-5">
          <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
          <input
            type="email"
            id="email"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:text-white"
            placeholder="name@flowbite.com"
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>

        <div className="mb-5">
          <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your password</label>
          <input
            type="password"
            id="password"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:text-white"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <div className="flex items-start mb-5">
          <div className="flex items-center h-5">
            <input id="remember" type="checkbox" className="w-4 h-4 border border-gray-300 rounded-sm bg-gray-50 dark:bg-gray-700" />
          </div>
          <label htmlFor="remember" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Remember me</label>
        </div>

        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 dark:bg-blue-600"
        >
          Submit
        </button>
      </form>
    </>
  );
};
