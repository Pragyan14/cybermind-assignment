'use client'

function Navbar({ onCreateJob }: { onCreateJob: () => void }) {

    const navLinks = [
        { name: "Home", href: "#" },
        { name: "Find Jobs", href: "#" },
        { name: "Find Talents", href: "#" },
        { name: "About us", href: "#" },
        { name: "Testimonials", href: "#" },
    ]

    return (
        <div className="w-full py-4 px-4">
            <nav className="bg-white rounded-4xl shadow-md max-w-4xl mx-auto">
                <div className="px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        <div className="flex-shrink-0 flex items-center">
                            <div className="w-10 h-10 flex items-center justify-center">
                                <img src="logo.svg" alt="logo" />
                            </div>
                        </div>

                        <div>
                            <div className="flex items-center space-x-8">
                                {navLinks.map((link) => (
                                    <a
                                        key={link.name}
                                        href={link.href}
                                        className="text-gray-700 hover:text-gray-900 px-3 py-2 text-sm font-medium transition-colors duration-200"
                                    >
                                        {link.name}
                                    </a>
                                ))}
                            </div>
                        </div>

                        <div>
                            <button 
                            onClick={onCreateJob}
                            className="bg-gradient-to-t from-[#6100AD] to-[#A128FF] text-white px-6 py-2 rounded-full font-bold shadow-sm transition duration-200 hover:brightness-110">
                                Create Jobs
                            </button>
                        </div>
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default Navbar
