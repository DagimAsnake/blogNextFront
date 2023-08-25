import React from 'react'
import moment from 'moment';
import Head from 'next/head';
import Link from 'next/link';

import BlogDeleteButton from '@/components/BlogDeleteButton';

export async function getServerSideProps(context) {

    const { params } = context
  
    const res = await fetch(`https://blognextbackend.onrender.com/blog/${params.blogId}`)
    const data = await res.json()
    const datas = data.msg
  
    return {
      props: { datas }
    }
  
  }

const BlogDetails = ({datas}) => {
    const formattedDate = moment(datas.createdAt).format('MMMM Do YYYY, h:mm:ss a');
  return (
    <>
     <Head>
        <title>{datas.title}</title>
      </Head>
   
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-24">

    <div className="bg-white rounded-lg shadow overflow-hidden">
  
      <div className="px-6 py-4">
        <h2 className="text-2xl font-bold text-gray-800">{datas.title}</h2>
        
        <div className="flex items-center mt-2">
          {/* <img className="w-10 h-10 object-cover rounded-full mr-4" src="/author-avatar.jpg" alt="Author"/> */}
          <div>
            <p className="font-semibold text-gray-800">Firstname Lastname</p>
            <p className="text-sm text-gray-500">{formattedDate}</p>
          </div>
        </div>
  
        <p className="mt-4 text-gray-600">{datas.topic}</p>
  
      </div>

        <div className="px-6 py-4">
        <p className="text-gray-700 leading-relaxed">{datas.content}</p>
        </div>

        <div className="px-6 py-4 flex justify-end"> 
            <Link href={`/blog/editblog/${datas._id}`}>
                <button className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-l">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                    </svg>
                </button>
            </Link>
        
            <BlogDeleteButton blogId={datas._id} />
        
        </div>
  
    </div>
  
  </div>
  </>
  )
}

export default BlogDetails