import React, { useState, useContext } from "react";
import Head from 'next/head';
import PasswordInput from "@/components/PasswordInput";
import { useRouter } from 'next/router';

const changepassword = () => {
  const router = useRouter();

  const [oldPassword, setOldPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [errors, setErrors] = useState({})
    const [errMsg, setErrMsg] = useState("");

    const validateForm = () => {
      let errors = {}
      let isValid = true
  
      if (!oldPassword.trim()) {
        errors.oldPassword = 'Old Password is required'
        isValid = false
      }
  
      if (!newPassword.trim()) {
        errors.newPassword = 'New Password is required'
        isValid = false
      }
  
      if (!confirmPassword.trim()) {
        errors.confirmPassword = 'Confirm Password is required'
        isValid = false
      }
  
      setErrors(errors)
  
      return isValid
    }

    const onFormSubmission = async (e) => {
      e.preventDefault()
  
      if (validateForm()) {
        const formData = {
          oldPassword: oldPassword,
          newPassword: newPassword,
          confirmPassword: confirmPassword
        }
        
      const session = localStorage.getItem('session');
  
  
      const headers = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${session}`,
      };
  
      const res = await fetch('http://localhost:8000/profile/changepassword', {
          method: 'PUT',
          body: JSON.stringify(formData),
          headers: headers
        })
      const data = await res.json()
      console.log(data)
      setErrMsg(data.msg);
      if (data.msg === "Password Changed Successfully") {
        router.push('/');
    }
      } else {
        console.log('Form is invalid')
      }
    }

  return (
    <>
      <Head>
        <title>Change Password</title>
      </Head>
      <section className="text-gray-600 body-font overflow-hidden">
        <div className="container px-5 py-24 mx-auto">
        <div className="flex items-center justify-center">
                <div className="w-1/2">
                    <div className="bg-white border border-gray-200 rounded-2xl shadow-md p-5 mb-20">
                        <div className="text-lg text-center text-black font-bold">
                            Change Password
                        </div>
                        <form onSubmit={onFormSubmission}>
                        <PasswordInput
                          value={oldPassword}
                          onChange={(e) => setOldPassword(e.target.value)}
                          placeholder="Old Password"
                        />

                        <PasswordInput
                          value={newPassword}
                          onChange={(e) => setNewPassword(e.target.value)}
                          placeholder="New Password"
                        />

                        <PasswordInput
                          value={confirmPassword}
                          onChange={(e) =>setConfirmPassword(e.target.value)}
                          placeholder="Confirm Password"
                        />

                          <p className="text-red-500 text-lg">{errMsg}</p>
                            <div className="w-44 items-center text-center text-black rounded-lg hover:bg-black my-5 hover:text-white p-2 text-xl font-bold cursor-pointer tracking-wider border">
                              <button> Submit</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
      </section>
    </>
  )
}

export default changepassword