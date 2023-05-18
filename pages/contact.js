import Head from 'next/head';
import { useState } from 'react';

const Contact = () => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [message, setMessage] = useState('')
    const [errors, setErrors] = useState({})

    const onFormSubmit = async (e) => {
        e.preventDefault()

        const errors = validateForm()
        if (Object.keys(errors).length === 0) {
            const formData = {
                name: name,
                email: email,
                message: message
            }

            try {
                const response = await fetch('http://localhost:8000/contact', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(formData)
                })

                if (response.ok) {
                    console.log('Form submitted successfully')
                } else {
                    console.log('An error occurred while submitting the form')
                }
            } catch (error) {
                console.log('An error occurred while submitting the form:', error)
            }
        } else {
            setErrors(errors)
        }
    }

    const validateForm = () => {
        let errors = {}
        if (!name.trim()) {
            errors.name = 'Name is required'
        }
        if (!email.trim()) {
            errors.email = 'Email is required'
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            errors.email = 'Email is invalid'
        }
        if (!message.trim()) {
            errors.message = 'Message is required'
        }

        return errors
    }

    return (
        <>
            <Head>
                <title>Contact Us</title>
            </Head>
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-24">
                <h1 className="text-4xl font-bold mb-8">Contact Us</h1>
                <p className="text-lg mb-8">
                    If you have any questions or comments about our blog, please don't hesitate to get in touch using the form below.
                </p>
                <form className="max-w-lg mx-auto" onSubmit={onFormSubmit}>
                    <div className="mb-4">
                        <label htmlFor="name" className="block text-gray-700 font-bold mb-2">Name</label>
                        <input type="text" id="name" name="name" value={name} onChange={(e) => setName(e.target.value)} className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.name && 'border-red-500'}`} />
                        {errors.name && <p className="text-red-500 text-xs italic">{errors.name}</p>}
                    </div>
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-gray-700 font-bold mb-2">Email</label>
                        <input type="email" id="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.email && 'border-red-500'}`} />
                        {errors.email && <p className="text-red-500 text-xs italic">{errors.email}</p>}
                    </div>
                    <div className="mb-4">
                        <label htmlFor="message" className="block text-gray-700 font-bold mb-2">Message</label>
                        <textarea id="message" name="message" value={message} onChange={(e) => setMessage(e.target.value)} rows={10} className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.message && 'border-red-500'}`}></textarea>
                        {errors.message && <p className="text-red-500 text-xs italic">{errors.message}</p>}
                    </div>
                    <div className="flex justify-end">
                        <button type="submit" className="bg-black text-white hover:bg-white hover:text-black hover:border-black font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline hover:shadow-md">
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
};

export default Contact;