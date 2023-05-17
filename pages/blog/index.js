import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { useState } from 'react';

const index = () => {
  const router = useRouter();

  const [title, setTitle] = useState('')
  const [topic, setTopic] = useState('')
  const [content, setContent] = useState('')

  const onFormSubmisson = (e) => {
    e.preventDefault()

    const formData = {
      title: title,
      topic: topic,
      content: content
    }
    // http://localhost:8000/blog/add 
    fetch('https://blognextbackend.onrender.com/blog/add', {
      method: 'POST',
      body: JSON.stringify(formData),
      headers: {
        'Content-Type': 'application/json'
      }
    })

    router.push('/');

  }

  return (
    <>
      <Head>
        <title>Add Blog</title>
      </Head>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <h1 className="text-4xl font-bold mb-8">Add a New Blog Post</h1>
        <form className="max-w-lg mx-auto" onSubmit={onFormSubmisson}>
          <div className="mb-4">
            <label htmlFor="title" className="block text-gray-700 font-bold mb-2">Title</label>
            <input type="text" id="title" value={title} onChange={(e) => setTitle(e.target.value)} name="title" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
          </div>
          <div className="mb-4">
            <label htmlFor="topic" className="block text-gray-700 font-bold mb-2">Main Topic</label>
            <input type="text" id="topic" value={topic} onChange={(e) => setTopic(e.target.value)} name="topic" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
          </div>
          <div className="mb-4">
            <label htmlFor="content" className="block text-gray-700 font-bold mb-2">Content</label>
            <textarea id="content" value={content} onChange={(e) => setContent(e.target.value)} name="content" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" rows="10"></textarea>
          </div>
          <div className="flex justify-end">
            <button type="submit" className="bg-black text-white hover:bg-white hover:text-black hover:border-black font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline hover:shadow-md">
              Submit
            </button>
          </div>
        </form>
      </div>
    </>
  )
}

export default index