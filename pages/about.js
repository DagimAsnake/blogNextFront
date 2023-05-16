import Head from 'next/head';

const About = () => {
    return (
        <>
            <Head>
                <title>About Us</title>
            </Head>
            <div className="container mx-auto px-4 py-24">
                <h1 className="text-4xl font-bold mb-8">About Us</h1>
                <p className="text-lg mb-8">
                    We are a team of passionate writers and bloggers who love to share our thoughts and ideas with the world. Our aim is to create high-quality content that is both informative and entertaining, and that appeals to a wide range of readers.
                </p>
                <p className="text-lg mb-8">
                    Our blog covers a variety of topics, including technology, entertainment, lifestyle, and more. We believe in providing our readers with a diverse range of content that is both interesting and engaging.
                </p>
                <p className="text-lg mb-8">
                    We are always looking for new contributors to join our team. If you are interested in writing for us, please get in touch using the contact form on our website.
                </p>
                <p className="text-lg">
                    Thank you for visiting our site, and we hope you enjoy reading our blog!
                </p>
            </div>
        </>
    );
};

export default About;