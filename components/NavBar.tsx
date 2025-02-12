import { useState } from 'react';

export default function NavBar() {
    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    }

    return (
        <nav className="bg-gray-800 p-4">
            <div className="container mx-auto flex justify-between items-center h-16">
                <div className="text-white text-xl font-bold">Truck Stop Fitness</div>
                <div className="md:hidden">
                    <button className="text-white focus:outline-none" onClick={toggleMenu}>
                        <svg
                            className="w-6 h-6"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M4 6h16M4 12h16M4 18h16"
                            ></path>
                        </svg>
                    </button>
                </div>
                
            </div>
            <div className={`${menuOpen ? 'absolute top-16 left-0 right-0 bottom-0 bg-gray-800 flex flex-col items-center justify-center' : 'hidden'} w-full md:w-auto`}>
                    <a href="/dashboard" className="font-bold text-white p-10">
                        Dashboard
                    </a>
                    <a href="/settings" className="font-bold text-white p-10">
                        Settings
                    </a>
                    <a href="https://truckstopfitness.com" className="font-bold text-white p-10">
                        About
                    </a>
                </div>
        </nav>
    )
}