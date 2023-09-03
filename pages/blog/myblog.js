import { useState, useEffect, useContext } from 'react';
import Head from 'next/head';
import moment from 'moment';
import Link from 'next/link';
import AuthContext from "../../components/store/authContext";

const MyBlog = () => {
  const AuthCtx = useContext(AuthContext);
  const [data, setData] = useState([])

  useEffect(() => {
    const getUserBlogs = async () => {
        const res = await fetch('http://localhost:8000/blog/myblogs', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${AuthCtx.token}`,
          },
      });
      const data = await res.json();
      const datas = data.blogs;
      setData(datas)
  }
  getUserBlogs()
    }, [AuthCtx])

  return (
    <>
      <Head>
        <title>Blogs</title>
      </Head>
      <section className="text-gray-600 body-font overflow-hidden">
        <div className="container px-5 py-24 mx-auto">
          <div className="-my-8 divide-y-2 divide-gray-100">
          {data?.length <= 0 && (
            <h3 className="mt-5 pt-5">You haven't made any blogs.</h3>
          )}
            {data?.map((item) => {
              const formattedDate = moment(item.createdAt).format('MMMM Do YYYY, h:mm:ss a');
              return (
                <div key={item._id} className="py-8 flex flex-wrap md:flex-nowrap">
                  <div className="md:flex-grow">
                    <h2 className="text-2xl font-medium text-gray-900 title-font mb-2">{item.title}</h2>
                    <p className="leading-relaxed">{item.topic}</p>
                    <Link href={`/blog/${item._id}`} className="text-indigo-500 inline-flex items-center mt-4">
                      Learn More
                      <svg className="w-4 h-4 ml-2" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M5 12h14"></path>
                        <path d="M12 5l7 7-7 7"></path>
                      </svg>
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
};

export default MyBlog;