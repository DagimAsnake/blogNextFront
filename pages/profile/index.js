import React, { useState, useContext, useEffect } from "react";
import Head from 'next/head';
import Link from 'next/link';
import AuthContext from "../../components/store/authContext";
import { useRouter } from 'next/router';

const profile = () => {
    const AuthCtx = useContext(AuthContext);
    const router = useRouter();

  const [username, setUsername] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState({})

  useEffect(() => {
    const getUserProfile = async () => {
        const res = await fetch('http://localhost:8000/profile', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${AuthCtx.token}`,
          },
      });
      const data = await res.json();
      const datas = data.msg;
      setEmail(datas.email)
      setFirstname(datas.firstName)
      setLastname(datas.lastName)
      setUsername(datas.username)
  }
  getUserProfile()
    }, [AuthCtx])

    const validateForm = () => {
        let errors = {}
        let isValid = true
    
        if (!firstname.trim()) {
          errors.firstname = 'FirstName is required'
          isValid = false
        }
    
        if (!lastname.trim()) {
          errors.lastname = 'LastName is required'
          isValid = false
        }
    
        if (!username.trim()) {
          errors.username = 'Username is required'
          isValid = false
        }

        if (!email.trim()) {
            errors.email = 'Email is required'
            isValid = false
          }
    
        setErrors(errors)
    
        return isValid
      }

      const onFormSubmission = async (e) => {
        e.preventDefault()
    
        if (validateForm()) {
          const formData = {
            username: username,
            firstname: firstname,
            lastname: lastname,
            email: email,
          }

          const session = localStorage.getItem('session');

          const headers = {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${session}`,
          };

          await fetch(`http://localhost:8000/profile/edit`, {
            method: 'PUT',
            body: JSON.stringify(formData),
            headers: headers
          })
    
          router.push('/');
        } else {
          console.log('Form is invalid')
        }
      }

  return (
    <>
      <Head>
        <title>Profile</title>
      </Head>
      <section className="text-gray-600 body-font overflow-hidden">
        <div className="container px-5 py-24 mx-auto">
             <div className="flex items-center justify-center">
                <div className="w-1/2">
                    <div className="bg-white border border-gray-200 rounded-2xl shadow-md p-5 mb-20">
                        <div className="text-lg text-center text-black font-bold">
                            Your Profile
                        </div>
                        <form onSubmit={onFormSubmission}>
                            <div className="text-xl font-bold text-black my-3">
                                <h4 className="mb-2">First Name</h4>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke-width="1.5"
                                            stroke="currentColor"
                                            className="w-8 h-8 text-black"
                                        >
                                            <path
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                                d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                                            />
                                        </svg>
                                    </div>
                                    <input
                                        value={firstname}
                                        onChange={(e) => setFirstname(e.target.value)}
                                        placeholder="First Name"
                                        type="text"
                                        className="w-full pl-14 bg-white border border-blue-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5"
                                    />
                                </div>
                                {errors.firstname && <p className="text-red-500 text-xs italic">{errors.firstname}</p>}
                            </div>

                            <div className="text-xl font-bold text-black my-3">
                                <h4 className="mb-2">Last Name</h4>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke-width="1.5"
                                            stroke="currentColor"
                                            className="w-8 h-8 text-black"
                                        >
                                            <path
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                                d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                                            />
                                        </svg>
                                    </div>
                                    <input
                                        value={lastname}
                                        onChange={(e) => setLastname(e.target.value)}
                                        placeholder="Last Name"
                                        type="text"
                                        className="w-full pl-14 bg-white border border-blue-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5"
                                    />
                                </div>
                                {errors.lastname && <p className="text-red-500 text-xs italic">{errors.lastname}</p>}
                            </div>

                            <div className="text-xl font-bold text-black my-3">
                                <h4 className="mb-2">Username</h4>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke-width="1.5"
                                            stroke="currentColor"
                                            className="w-8 h-8 text-black"
                                        >
                                            <path
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                                d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                                            />
                                        </svg>
                                    </div>
                                    <input
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                        placeholder="Username"
                                        type="text"
                                        className="w-full pl-14 bg-white border border-blue-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5"
                                    />
                                </div>
                                {errors.username && <p className="text-red-500 text-xs italic">{errors.username}</p>}
                            </div>

                            <div className="text-xl font-bold text-black my-3">
                                <h4 className="mb-2">Email</h4>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke-width="1.5"
                                            stroke="currentColor"
                                            className="w-8 h-8 text-black"
                                        >
                                            <path
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                                d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
                                            />
                                        </svg>
                                    </div>
                                    <input
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="Email"
                                        type="email"
                                        className="w-full pl-14 bg-white border border-blue-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5"
                                    />
                                </div>
                                {errors.email && <p className="text-red-500 text-xs italic">{errors.email}</p>}
                            </div>

                            <div className="w-44 items-center text-center text-black rounded-lg hover:bg-black my-5 hover:text-white p-2 text-xl font-bold cursor-pointer tracking-wider border">
                              <button> Update</button>

                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <Link
                href={"/profile/changepassword"}
                className="w-60 mx-32 items-center text-center text-black rounded-lg hover:bg-black hover:text-white p-2 text-xl font-bold cursor-pointer tracking-wider border"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    className="w-8 h-8 inline-block"
                >
                    <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
                    />
                </svg>{" "}
                Change Password
            </Link>
        </div>
      </section>
    </>
  )
}

export default profile