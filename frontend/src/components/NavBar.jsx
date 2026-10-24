import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { HashLink } from 'react-router-hash-link';

const Navbar = () => {
	const [isScrolled, setIsScrolled] = useState(false);
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const { pathname } = useLocation();

	useEffect(() => {
		window.scrollTo(0, 0);

		const handleScroll = () => {
			setIsScrolled(window.scrollY > window.innerHeight);
		};

		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, [pathname]);

	return (
		<nav className={`z-50 fixed w-full backdrop-blur-md shadow-sm h-[4.2rem] flex items-center justify-center transition-colors duration-200 ${isScrolled ? "bg-white/80 text-black border-b border-gray-200/60" : "bg-white/90 text-black"}`}>
			<div className="flex-1 flex items-center justify-between w-full mx-auto px-4 sm:px-8 lg:px-6">
				{/* Left Section - WCE Logo */}
				<Link to="/" className="flex-shrink-0 flex items-center gap-2.5">
					<img className="h-10 sm:h-12 w-auto object-contain" src='/wcelogo.png' alt="Walchand College of Engineering Logo" />
					<div className="hidden sm:flex flex-col leading-tight">
						<span className="font-extrabold text-sm tracking-wide text-gray-900">RSC 2027</span>
						<span className="text-[11px] text-gray-500 font-medium">Walchand College of Engineering</span>
					</div>
				</Link>

				{/* Middle Section - Desktop Navigation Links */}
				<div className="hidden lg:flex gap-6 flex-grow justify-center items-center">
					<Link
						to="/"
						onClick={() => window.scrollTo(0, 0)}
						className="text-sm text-gray-800 hover:text-blue-600 transition-colors duration-200 font-semibold"
					>
						Home
					</Link>
					<HashLink
						smooth
						to="/#about"
						className="text-sm text-gray-800 hover:text-blue-600 transition-colors duration-200 font-semibold"
					>
						About
					</HashLink>
					<HashLink
						smooth
						to="/#programme"
						className="text-sm text-gray-800 hover:text-blue-600 transition-colors duration-200 font-semibold"
					>
						Programme
					</HashLink>
					<HashLink
						smooth
						to="/#organizers"
						className="text-sm text-gray-800 hover:text-blue-600 transition-colors duration-200 font-semibold"
					>
						Committee
					</HashLink>
					<Link
						to="/posterpresentation"
						className="text-sm text-gray-800 hover:text-blue-600 transition-colors duration-200 font-semibold"
					>
						Poster (PG)
					</Link>
					<Link
						to="/ips"
						className="text-sm text-gray-800 hover:text-blue-600 transition-colors duration-200 font-semibold"
					>
						IPS (UG)
					</Link>
					<Link
						to="/phd-workshop"
						className="text-sm text-indigo-700 bg-indigo-50 hover:bg-indigo-100 px-3 py-1 rounded-full transition-colors duration-200 font-bold border border-indigo-200"
					>
						Ph.D. Workshop
					</Link>
					<Link
						to="/contact"
						className="text-sm text-gray-800 hover:text-blue-600 transition-colors duration-200 font-semibold"
					>
						Contact
					</Link>
				</div>

				{/* Right Section - ACM Logo & Mobile Hamburger */}
				<div className="flex items-center space-x-4">
					<img className="h-9 sm:h-11 w-auto object-contain" src='/acmlogo.png' alt="WCE ACM Student Chapter Logo" />

					{/* Mobile Menu Button */}
					<button
						onClick={() => setIsMenuOpen(!isMenuOpen)}
						className="lg:hidden p-2 text-gray-800 hover:text-blue-600 focus:outline-none"
						aria-label="Toggle menu"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
							className="h-6 w-6"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth="2"
								d="M4 6h16M4 12h16M4 18h16"
							/>
						</svg>
					</button>
				</div>

				{/* Mobile Menu Dropdown */}
				<div className={`lg:hidden absolute z-50 top-16 left-4 right-4 bg-white/95 backdrop-blur-md rounded-2xl shadow-xl flex flex-col p-6 space-y-4 border border-gray-200 transition-all duration-300 ${isMenuOpen ? 'opacity-100 pointer-events-auto translate-y-0' : 'opacity-0 pointer-events-none -translate-y-4'}`}>
					<Link
						to="/"
						onClick={() => {
							setIsMenuOpen(false);
							window.scrollTo(0, 0);
						}}
						className="text-base text-gray-800 hover:text-blue-600 font-semibold"
					>
						Home
					</Link>
					<HashLink
						smooth
						to="/#about"
						onClick={() => setIsMenuOpen(false)}
						className="text-base text-gray-800 hover:text-blue-600 font-semibold"
					>
						About
					</HashLink>
					<HashLink
						smooth
						to="/#programme"
						onClick={() => setIsMenuOpen(false)}
						className="text-base text-gray-800 hover:text-blue-600 font-semibold"
					>
						Programme Overview
					</HashLink>
					<HashLink
						smooth
						to="/#organizers"
						onClick={() => setIsMenuOpen(false)}
						className="text-base text-gray-800 hover:text-blue-600 font-semibold"
					>
						Organizing Committee
					</HashLink>
					<Link
						to="/posterpresentation"
						onClick={() => {
							setIsMenuOpen(false);
							window.scrollTo(0, 0);
						}}
						className="text-base text-gray-800 hover:text-blue-600 font-semibold"
					>
						Poster Presentation (PG)
					</Link>
					<Link
						to="/ips"
						onClick={() => {
							setIsMenuOpen(false);
							window.scrollTo(0, 0);
						}}
						className="text-base text-gray-800 hover:text-blue-600 font-semibold"
					>
						Innovative Project Showcasing (UG)
					</Link>
					<Link
						to="/phd-workshop"
						onClick={() => {
							setIsMenuOpen(false);
							window.scrollTo(0, 0);
						}}
						className="text-base text-indigo-700 font-bold bg-indigo-50 p-2.5 rounded-lg border border-indigo-100"
					>
						Ph.D. Research Workshop
					</Link>
					<Link
						to="/contact"
						onClick={() => {
							setIsMenuOpen(false);
							window.scrollTo(0, 0);
						}}
						className="text-base text-gray-800 hover:text-blue-600 font-semibold"
					>
						Contact Us
					</Link>
				</div>
			</div>
		</nav>
	);
};

export default Navbar;
