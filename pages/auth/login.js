import React, { useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';

const Login = () => {
    const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [failed, setFailed] = useState('')

  const handleLogin = async(e) => {
    e.preventDefault();

    // Validate form fields
    const errors = {};
    if (email.trim() === '') {
      errors.email = 'Email is required';
    }
    if (password.trim() === '') {
      errors.password = 'Password is required';
    }

    if (Object.keys(errors).length > 0) {
      setErrors(errors);
      return;
    }

    // Perform Login logic here
    // You can send the form data to the server or perform any other actions you need
    const formData = {
        email: email,
        password: password
      }
    const res =  await fetch('http://localhost:8000/auth/login', {
        method: 'POST',
        body: JSON.stringify(formData),
        headers: {
          'Content-Type': 'application/json'
        }
      })
      const data = await res.json()
      if (res.status === 200) {
        console.log(data)
        localStorage.setItem('session', data.token);
        router.push('/');
      } else if (res.status === 401) {
        setFailed(data.error);
      } else {
        console.error('Login failed:', data.msg);
      }
  };

  return (
    <>
      <Head>
        <title>Log In</title>
      </Head>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <form className="max-w-lg mx-auto" onSubmit={handleLogin}>
        <h1 className="text-4xl font-bold mb-8">Log In</h1>
        <p className="text-red-500 text-sm mt-1">{failed}</p>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 font-bold mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              name="email"
              className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                errors.email ? 'border-red-500' : ''
              }`}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email}</p>
            )}
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700 font-bold mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              name="password"
              className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                errors.password ? 'border-red-500' : ''
              }`}
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password}</p>
            )}
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-black text-white hover:bg-white hover:text-black hover:border-black font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline hover:shadow-md"
            >
              Log In
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Login;