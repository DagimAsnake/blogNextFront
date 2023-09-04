import React, { useState, useContext } from "react";
import Head from 'next/head';
import PasswordInput from "@/components/PasswordInput";

const changepassword = () => {

  const [oldPassword, setOldPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");

    const submitHandler = (e) => {
      e.preventDefault();
      console.log(oldPassword, confirmPassword, newPassword)
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
                        <form onSubmit={submitHandler}>
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