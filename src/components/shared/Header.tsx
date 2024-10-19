"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

const Header = () => {
    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    const menuVariants = {
        hidden: { height: 0, opacity: 0 },
        visible: { height: "auto", opacity: 1 },
    };

    const buttonVariants = {
        hidden: { rotate: 0 },
        open: { rotate: 90 },
    };

    return (
        <div className="sticky z-50 top-5 mx-10">
            <div className="container mx-auto">
                <nav className="block w-full max-w-screen-2xl rounded-xl py-4 px-8 backdrop-saturate-200 backdrop-blur-2xl bg-opacity-80 border-white/80 bg-white text-white relative z-50 mt-6 border-0">
                    <div className="container flex items-center justify-between mx-auto">
                        <motion.p
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            className="block antialiased font-sans text-gray-900 text-lg font-bold"
                        >
                            Ink & Imagination
                        </motion.p>

                        {/* <motion.ul
                            className="items-center hidden gap-8 ml-10 lg:flex"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.6, delay: 0.3 }}
                        >
                            <li>
                                <Link
                                    href="#"
                                    className="antialiased font-sans text-base leading-relaxed flex items-center gap-2 font-medium text-gray-900"
                                >
                                    Pages
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="#"
                                    className="antialiased font-sans text-base leading-relaxed flex items-center gap-2 font-medium text-gray-900"
                                >
                                    Account
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="#"
                                    className="antialiased font-sans text-base leading-relaxed flex items-center gap-2 font-medium text-gray-900"
                                >
                                    Blocks
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="#"
                                    className="antialiased font-sans text-base leading-relaxed flex items-center gap-2 font-medium text-gray-900"
                                >
                                    Docs
                                </Link>
                            </li>
                        </motion.ul> */}

                        <motion.div
                            className="items-center hidden gap-4 lg:flex"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.6, delay: 0.5 }}
                        >
                            {/* <button
                                className="align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-lg text-gray-900 hover:bg-gray-900/10 active:bg-gray-900/20"
                                type="button"
                            >
                                Log in
                            </button> */}
                            <button
                                className="align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-lg bg-gray-900 text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none"
                                type="button"
                            >
                                Buy now
                            </button>
                        </motion.div>

                        <motion.button
                            onClick={toggleMenu}
                            className="relative align-middle select-none font-sans font-medium text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none w-10 max-w-[40px] h-10 max-h-[40px] rounded-lg text-xs text-gray-900 hover:bg-gray-900/10 active:bg-gray-900/20 inline-block ml-auto lg:hidden"
                            type="button"
                            animate={menuOpen ? "open" : "hidden"}
                            variants={buttonVariants}
                        >
                            <span className="absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={2}
                                    stroke="currentColor"
                                    aria-hidden="true"
                                    className="w-6 h-6"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                                    />
                                </svg>
                            </span>
                        </motion.button>
                    </div>

                    <motion.div
                        className="block w-full lg:hidden overflow-hidden"
                        initial="hidden"
                        animate={menuOpen ? "visible" : "hidden"}
                        variants={menuVariants}
                        transition={{ duration: 0.4 }}
                    >
                        <div className="container px-2 pt-4 mx-auto mt-3 border-t border-gray-200">
                            <ul className="flex flex-col gap-4">
                                <li>
                                    <Link
                                        href="#"
                                        className="antialiased font-sans text-base leading-relaxed flex items-center gap-2 font-medium text-gray-900"
                                    >
                                        Pages
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href="#"
                                        className="antialiased font-sans text-base leading-relaxed flex items-center gap-2 font-medium text-gray-900"
                                    >
                                        Account
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href="#"
                                        className="antialiased font-sans text-base leading-relaxed flex items-center gap-2 font-medium text-gray-900"
                                    >
                                        Blocks
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href="#"
                                        className="antialiased font-sans text-base leading-relaxed flex items-center gap-2 font-medium text-gray-900"
                                    >
                                        Docs
                                    </Link>
                                </li>
                            </ul>
                            <div className="flex items-center gap-4 mt-6 mb-4">
                         
                                <button
                                    className="align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-lg bg-gray-900 text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none"
                                    type="button"
                                >
                                    Buy now
                                </button>
                            </div>
                        </div>
                    </motion.div>
                </nav>
            </div>
        </div>
    );
};

export default Header;
