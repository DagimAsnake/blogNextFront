import { useRouter } from 'next/router'
import Head from 'next/head';
import React, { useState } from 'react';

export async function getServerSideProps(context) {
  const { params } = context

  const res = await fetch(`https://blognextbackend.onrender.com/blog/${params.editBlogID}`)
  const data = await res.json()
  const datas = data.msg

  return {
    props: { datas }  
  }

}


const EditBlog = ({datas}) => {
    const router = useRouter()
   
    const [title, setTitle] = useState(datas.title)
    const [topic, setTopic] = useState(datas.topic)
    const [content, setContent] = useState(datas.content)
    const [errors, setErrors] = useState({})

    const validateForm = () => {
        let errors = {}
        let isValid = true
    
        if (!title.trim()) {
          errors.title = 'Title is required'
          isValid = false
        }
    
        if (!topic.trim()) {
          errors.topic = 'Topic is required'
          isValid = false
        }
    
        if (!content.trim()) {
          errors.content = 'Content is required'
          isValid = false
        }
    
        setErrors(errors)
    
        return isValid
      }

      const onFormSubmission = async (e) => {
        e.preventDefault()
    
        if (validateForm()) {
          const formData = {
            title: title,
            topic: topic,
            content: content
          }

          await fetch(`https://blognextbackend.onrender.com/blog/update/${datas._id}`, {
            method: 'PUT',
            body: JSON.stringify(formData),
            headers: {
              'Content-Type': 'application/json' 
            }
          })
    
          router.push('/');
        } else {
          console.log('Form is invalid')
        }
      }
    

  return (
    <>
      <Head>
        <title>Edit Blog</title>
      </Head>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <h1 className="text-4xl font-bold mb-8">Edit Blog Post</h1>
        <form className="max-w-lg mx-auto" onSubmit={onFormSubmission}>
          <div className="mb-4">
            <label htmlFor="title" className="block text-gray-700 font-bold mb-2">Title</label>
            <input type="text" id="title" value={title} onChange={(e) => setTitle(e.target.value)} name="title" className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.title ? 'border-red-500' : ''}`} />
            {errors.title && <p className="text-red-500 text-xs italic">{errors.title}</p>}
          </div>
          <div className="mb-4">
            <label htmlFor="topic" className="block text-gray-700 font-bold mb-2">Main Topic</label>
            <input type="text" id="topic" value={topic} onChange={(e) => setTopic(e.target.value)} name="topic" className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.topic ? 'border-red-500' : ''}`} />
            {errors.topic && <p className="text-red-500 text-xs italic">{errors.topic}</p>}
          </div>
          <div className="mb-4">
            <label htmlFor="content" className="block text-gray-700 font-bold mb-2">Content</label>
            <textarea id="content" value={content} onChange={(e) => setContent(e.target.value)} name="content" className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.content ? 'border-red-500' : ''}`} rows="10"></textarea>
            {errors.content && <p className="text-red-500 text-xs italic">{errors.content}</p>}
          </div>
          <div className="flex justify-end">
            <button type="submit" className="bg-black text-white hover:bg-white hover:text-black hover:border-black font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline hover:shadow-md">
              Update
            </button>
          </div>
        </form>
      </div>
    </>
  )
}

export default EditBlog