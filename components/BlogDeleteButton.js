import { useRouter } from 'next/router'

export default function BlogDeleteButton({ blogId }) {
  const router = useRouter();

  async function handleDelete() {
      const session = localStorage.getItem('session');

      const headers = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${session}`,
      };

        const res = await fetch(`http://localhost:8000/blog/delete/${blogId}`, { method: 'DELETE', headers: headers })
        const data = await res.json()
        const datas = data.msg
        router.push('/')
  }

  return (
      <button onClick={handleDelete} className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-r">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
        </button>
  )
}