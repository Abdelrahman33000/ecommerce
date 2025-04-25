import React, { useCallback, useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaUser, FaLock } from 'react-icons/fa';
import { toast, ToastContainer } from 'react-toastify';
import { motion } from 'framer-motion';
import { useUser } from '../../context/UserContext';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';
import { BiUser } from 'react-icons/bi';

const Login = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { login } = useUser();
  const [loading, setLoading] = useState(false);
  const onSubmit = useCallback((data) => {
    setLoading(true);
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find(
      (u) => u.username === data.username && u.password === data.password
    );

    if (user) {
      login(user);
      toast.success('✅ Login successful!');
      setTimeout(() => {
        window.location.href = '/home';
      }, 1000);
    } else {
      toast.error('❌ Invalid username or password');
    }
    setLoading(false);
  }, [login]);

  return (
    <div className="bg-gray-100 dark:bg-gray-900 min-h-screen flex items-center justify-center px-4">
      <ToastContainer />
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl font-semibold mb-6 text-center text-black dark:text-white">
          🔐 Login
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
       
          <div className="mb-4">
            <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
              Username
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                <FaUser />
              </span>
              <input
                type="text"
                {...register('username', { required: 'Username is required' })}
                className="w-full pl-10 py-2 border rounded border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />
            </div>
            {errors.username && <p className="text-red-500 text-xs mt-1">{errors.username.message}</p>}
          </div>

      
          <div className="mb-4">
            <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
              Password
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                <FaLock />
              </span>
              <input
                type="password"
                {...register('password', { required: 'Password is required' })}
                className="w-full pl-10 py-2 border rounded border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />
            </div>
            {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold p-2 rounded mt-4 transition disabled:opacity-50"
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
        <Link to={'/'} className='flex  items-center gap-1 text-amber-100 mt-5'> Create Account : <BiUser /></Link>

      </motion.div>
    </div>
  );
};

export default Login;
