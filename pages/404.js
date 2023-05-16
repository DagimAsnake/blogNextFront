import Link from 'next/link';
import Head from 'next/head';

const Custom404 = () => {
    return (
        <>
            <Head>
                <title>Page Not Found</title>
            </Head>
            <div className="min-h-screen flex flex-col justify-center">
                <div className="text-center">
                    <h1 className="text-6xl font-bold text-gray-900">404</h1>
                    <h2 className="text-3xl font-semibold text-gray-700 mt-4 mb-8">Page not found</h2>
                    <p className="text-gray-600 mb-8">
                        The page you're looking for was not found.{' '}
                        <Link href="/" className="text-blue-500 hover:text-blue-700">Go back home &rarr;
                        </Link>
                    </p>
                </div>
            </div>
        </>
    );
};

export default Custom404;