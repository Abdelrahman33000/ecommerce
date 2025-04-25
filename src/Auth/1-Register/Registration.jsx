import React, { useCallback, useMemo, useState, Fragment, useId } from 'react';
import { useForm } from 'react-hook-form';
import { toast, ToastContainer } from 'react-toastify';
import { motion } from 'framer-motion';
import { FaUser, FaLock, FaEnvelope, FaAddressCard } from 'react-icons/fa';
import { debounce } from 'lodash';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';
import { BiLogIn } from 'react-icons/bi';


const setCookie = (name, value, days = 1) => {
  const expires = new Date(Date.now() + days * 86400000).toUTCString();
  document.cookie = `${name}=${value}; expires=${expires}; path=/`;
};

const fields = [
  { name: 'firstName', label: 'First Name', icon: <FaUser />, required: true },
  { name: 'lastName', label: 'Last Name', icon: <FaUser />, required: false },
  { name: 'username', label: 'Username', icon: <FaUser />, required: true },
  { name: 'password', label: 'Password', icon: <FaLock />, required: true },
  { name: 'email', label: 'Email', icon: <FaEnvelope />, required: true },
  { name: 'address', label: 'Address', icon: <FaAddressCard />, required: false }
];

const Register = () => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const [loading, setLoading] = useState(false);
  const [registrationError, setRegistrationError] = useState('');
  const idGen = useId();
  const passwordRegex = useMemo(() => /^(?=.*\d)(?=.*[A-Z])(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, []);
  const emailRegex = useMemo(() => /^[^\s@]+@[^\s@]+\.[^\s@]+$/, []);

  const debounceCheckUsername = useMemo(() => debounce((username) => {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const userExists = users.some(user => user.username === username);
    if (userExists) {
      setRegistrationError('Username already exists');
      toast.error('⚠️ Username already exists');
    }
  }, 500), []);

  const debounceCheckEmail = useMemo(() => debounce((email) => {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const emailExists = users.some(user => user.email === email);
    if (emailExists) {
      setRegistrationError('Email already exists');
      toast.error('⚠️ Email already exists');
    }
  }, 500), []);

  const onSubmit = useCallback((data) => {
    setLoading(true);
    setRegistrationError('');

    const users = JSON.parse(localStorage.getItem('users') || '[]');

    const userExists = users.some(user => user.username === data.username);
    const emailExists = users.some(user => user.email === data.email);

    if (userExists) {
      setRegistrationError('Username already exists');
      toast.error('⚠️ Username already exists');
      setLoading(false);
      return;
    }

    if (emailExists) {
      setRegistrationError('Email already exists');
      toast.error('⚠️ Email already exists');
      setLoading(false);
      return;
    }

    const userId = Date.now();
    const token = `token-${userId}-${Math.random().toString(36).substring(2)}`;

    const newUser = {
      id: userId,
      ...data,
      token
    };

    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
    sessionStorage.setItem('currentUser', JSON.stringify(newUser));
    setCookie('username', data.username);

    toast.success('✅ Registration successful');
    reset();
    setLoading(false);

    setTimeout(() => {
      window.location.href = '/login';
    }, 1500);
  }, [reset]);

  return (
    <div className="bg-gray-100 dark:bg-gray-900 min-h-screen flex items-center justify-center px-4">
      <ToastContainer />
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="bg-white dark:bg-gray-800 text-black dark:text-white p-8 rounded-lg shadow-md w-full max-w-md md:max-w-lg"
      >
        <h2 className="text-2xl font-semibold mb-6 text-center">📝 Register New Account</h2>
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          {fields.map((field, index) => {
            const inputId = `${idGen}-${index}`;
            return (
              <Fragment key={field.name}>
                <div className="mb-4 relative">
                  <label htmlFor={inputId} className="block mb-1 text-sm font-medium">
                    {field.label} {field.required && '*'}
                  </label>
                  <div className="flex items-center">
                    <span className="absolute ml-3 text-gray-400">{field.icon}</span>
                    <input
                      id={inputId}
                      type={field.name === 'password' ? 'password' : 'text'}
                      {...register(field.name, {
                        required: field.required && `${field.label} is required`,
                        pattern:
                          field.name === 'password'
                            ? {
                              value: passwordRegex,
                              message:
                                'Password must be at least 8 characters, one number, one uppercase letter, and one special character'
                            }
                            : field.name === 'email'
                              ? { value: emailRegex, message: 'Invalid email format' }
                              : undefined,
                        onChange: (e) => {
                          if (field.name === 'username') {
                            debounceCheckUsername(e.target.value);
                          } else if (field.name === 'email') {
                            debounceCheckEmail(e.target.value);
                          }
                        }
                      })}
                      className="w-full pl-10 p-2 border rounded border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
                    />
                  </div>
                  {errors[field.name] && (
                    <p className="text-red-500 text-xs mt-1">{errors[field.name].message}</p>
                  )}
                </div>
              </Fragment>
            );
          })}

          {registrationError && (
            <p className="text-red-500 text-sm mb-4">{registrationError}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold p-2 rounded mt-4 transition disabled:opacity-50"
          >
            {loading ? 'Registering...' : 'Register'}
          </button>
        </form>
        <br />
        <Link to={'login'} className='flex  items-center gap-1'> I Have Already Account : <BiLogIn /></Link>
      </motion.div>
    </div>
  );
};

export default React.memo(Register);
