const Footer = () => {
    return (
        <footer className="bg-gray-800 mt-auto">
            <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
                <p className="text-center text-gray-400">&copy; My Blog {new Date().getFullYear()}</p>
            </div>
        </footer>
    )
}

export default Footer