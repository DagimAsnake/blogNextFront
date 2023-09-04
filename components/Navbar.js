import React, { useState , useEffect, useContext} from 'react'
import Link from "next/link"
import { useRouter } from 'next/router';
import AuthContext from "../components/store/authContext";
import DropdownMenu from './DropdownMenu';

const Navbar = () => {
    const AuthCtx = useContext(AuthContext);
    const router = useRouter();

    const [nav, setNav] = useState(false)

    const isLoggedIn = AuthCtx.isLoggedIn

    const [data, setData] = useState()

    useEffect(() => {
      const getUserBlogs = async () => {
          const res = await fetch('http://localhost:8000/auth/verify', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${AuthCtx.token}`,
            },
        });
        console.log(res)
        const data = await res.json();
        console.log(data)
        setData(data.payload?.username)
    }
    getUserBlogs()
      }, [AuthCtx.token, isLoggedIn])

  const logoutHandler = () => {
    // localStorage.removeItem('session');
    AuthCtx.logout();
    router.push('/');
  }

    return (
        <nav className="bg-gray-800 fixed w-full z-10">
            <div className="max-w-full sm:px-6 ">
                <div className="relative flex items-center justify-between h-16">
                    <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                        {/* Mobile menu button */}
                        <button
                            onClick={() => setNav(!nav)}
                            type="button"
                            className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                            aria-controls="mobile-menu"
                            aria-expanded="false"
                        >
                            <span className="sr-only">Open main menu</span>
                            {/* Icon when menu is closed.  */}
                            {/* Menu open: "hidden", Menu closed: "block" */}

                            <svg
                                className="block h-6 w-6"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                aria-hidden="true"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 6h16M4 12h16M4 18h16"
                                />
                            </svg>
                            {/* Icon when menu is open.  */}
                            {/* Menu open: "block", Menu closed: "hidden"  */}
                            <svg
                                className="hidden h-6 w-6"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                aria-hidden="true"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            </svg>
                        </button>
                    </div>
                    <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
                        <div className="flex-shrink-0">
                            <Link href="/" className="text-white font-bold text-xl">My Blog</Link>
                        </div>
                        <div className="hidden sm:block sm:ml-6">
                            <div className="flex space-x-4">
                                <Link href="/" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Home</Link>
                                {isLoggedIn && 
                                    (<>
                                    <Link href="/blog" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Add Blog</Link>
                                    <Link href="/blog/myblog" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">My Blogs</Link>
                                    </>)
                                }
                                <Link href="/about" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">About</Link>
                                <Link href="/contact" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Contact</Link>
                            </div>
                        </div>
                        <div className="sm:ml-auto">
                            <div className="hidden sm:block sm:ml-6">
                                <div className="flex space-x-4">
                                  {!isLoggedIn &&  
                                    ( <>
                                    <Link href="/auth/login" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Login</Link>
                                    <Link href="/auth/signup" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Signup</Link>
                                    </>)
                                    }
                                    {isLoggedIn && <DropdownMenu logoutHandler={logoutHandler} /> }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* Mobile menu, show/hide based on menu state. */}
            {/* Menu open: "block", Menu closed: "hidden" */}
            {nav ?
                <div className="sm:hidden" id="mobile-menu">
                    <div className="px-2 pt-2 pb-3 space-y-1 text-center">
                        <Link onClick={() => setNav(!nav)} href="/" className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium">Home</Link>
                        <Link onClick={() => setNav(!nav)} href="/blog" className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium">Add Blog</Link>
                        <Link onClick={() => setNav(!nav)} href="/about" className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium">About</Link>
                        <Link onClick={() => setNav(!nav)} href="/contact" className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium">Contact</Link>
                        <Link onClick={() => setNav(!nav)} href="/login" className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium">Login</Link>
                        <Link onClick={() => setNav(!nav)} href="/logout" className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium">Logout</Link>
                        <Link onClick={() => setNav(!nav)} href="/signup" className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium">Signup</Link>


                    </div>
                </div>
                : " "}
        </nav>
    )
}

export default Navbar