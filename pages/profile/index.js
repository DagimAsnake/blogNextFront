import React from 'react'
import Head from 'next/head';

const profile = () => {
  return (
    <>
      <Head>
        <title>Profile</title>
      </Head>
      <section className="text-gray-600 body-font overflow-hidden">
        <div className="container px-5 py-24 mx-auto">
            <h1>Profile</h1>
        </div>
      </section>
    </>
  )
}

export default profile