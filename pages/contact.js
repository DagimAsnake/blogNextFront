import Head from 'next/head';

const Contact = () => {
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
                <form className="max-w-lg mx-auto">
                    <div className="mb-4">
                        <label htmlFor="name" className="block text-gray-700 font-bold mb-2">Name</label>
                        <input type="text" id="name" name="name" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-gray-700 font-bold mb-2">Email</label>
                        <input type="email" id="email" name="email" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="message" className="block text-gray-700 font-bold mb-2">Message</label>
                        <textarea id="message" name="message" rows={10} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"></textarea>
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