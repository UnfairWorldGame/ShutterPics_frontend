import React, { useContext, useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { HiMiniBars3CenterLeft } from 'react-icons/hi2';
import { RxCross2 } from 'react-icons/rx';
import { FaCircleUser } from 'react-icons/fa6';
import { LOGO_SRC } from '../constants/brand';
import authContext from '../context/auth/authContext';
import { MdHome, MdSwitchAccount, MdContactMail, MdCamera, MdInfo } from 'react-icons/md';
import { RiHealthBookFill, RiGalleryFill } from 'react-icons/ri';
import { FaAngleRight } from 'react-icons/fa6';
import { BiSolidLogInCircle, BiSolidStar } from 'react-icons/bi';

const navLinks = [
	{ name: 'Home', link: '/', icon: MdHome },
	{ name: 'Services', link: '/shutterpics-online-services', icon: MdCamera },
	{ name: 'Gallery', link: '/shutterpics-gallery', icon: RiGalleryFill },
	{ name: 'Booking', link: '/shutterpics-online-booking', icon: RiHealthBookFill },
	{ name: 'About', link: '/shutterpics-about', icon: MdInfo },
	{ name: 'Contact', link: '/shutterpics-contact', icon: MdContactMail }
];

const Navbar = () => {
	const [open, setOpen] = useState(false);
	const location = useLocation();
	const context = useContext(authContext);
	const { user, isLoggedin, setIsLoggedin, getUser, checkAvailableDate } = context;

	const profilePath =
		localStorage.getItem('type') === 'admin' ? '/admin/profile' : '/shutterpics-profile';

	const isActive = (path) => {
		if (path === '/') return location.pathname === '/';
		return location.pathname.startsWith(path);
	};

	useEffect(() => {
		if (open) {
			document.body.classList.add('modal-open');
		} else {
			document.body.classList.remove('modal-open');
		}
		return () => document.body.classList.remove('modal-open');
	}, [open]);

	useEffect(() => {
		setOpen(false);
	}, [location.pathname]);

	useEffect(() => {
		if (localStorage.getItem('authtoken')) {
			setIsLoggedin(true);
			getUser();
		}
		checkAvailableDate();
		// eslint-disable-next-line
	}, []);

	const desktopLinkClass = (path) =>
		`relative px-1 py-2 text-sm font-medium transition-colors duration-200 ${
			isActive(path)
				? 'text-purple-900 after:absolute after:-bottom-0.5 after:left-0 after:h-0.5 after:w-full after:rounded-full after:bg-purple-700'
				: 'text-gray-700 hover:text-purple-800'
		}`;

	return (
		<>
			<header className="sticky top-0 z-50 border-b border-purple-200/60 bg-white/80 backdrop-blur-md shadow-sm">
				<div className="mx-auto flex h-16 max-w-screen-2xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
					<div className="flex min-w-0 items-center gap-3">
						<Link to="/" className="flex shrink-0 items-center gap-2.5">
							<img
								src={LOGO_SRC}
								alt="ShutterPics logo"
								className="h-10 w-10 object-contain"
							/>
							<div className="hidden sm:block">
								<span className="block text-lg font-bold leading-tight text-gray-900">
									ShutterPics
								</span>
								<span className="block text-[11px] font-medium uppercase tracking-wider text-purple-600">
									Photography Studio
								</span>
							</div>
						</Link>

						<nav className="hidden lg:flex lg:items-center lg:gap-6 xl:gap-8 lg:pl-6 lg:ml-2 lg:border-l lg:border-purple-200">
							{navLinks.map((linkData) => (
								<Link
									key={linkData.link}
									to={linkData.link}
									className={desktopLinkClass(linkData.link)}
								>
									{linkData.name}
								</Link>
							))}
						</nav>
					</div>

					<div className="hidden lg:flex items-center gap-3">
						<Link
							to="/rateus"
							className="text-sm font-medium text-gray-600 transition hover:text-purple-700"
						>
							Rate Us
						</Link>
						<Link
							to="/shutterpics-online-booking"
							className="rounded-full bg-gradient-to-r from-purple-600 to-violet-600 px-5 py-2 text-sm font-semibold text-white shadow-md shadow-purple-300/40 transition hover:from-purple-700 hover:to-violet-700"
						>
							Book Now
						</Link>
						{isLoggedin ? (
							<Link
								to={profilePath}
								className="inline-flex items-center gap-2 rounded-full border border-purple-300 bg-purple-50 px-4 py-2 text-sm font-semibold text-purple-800 transition hover:bg-purple-100"
							>
								<FaCircleUser className="text-base" />
								<span>Profile</span>
							</Link>
						) : (
							<>
								<Link
									to="/shutterpics-login"
									className="rounded-full px-4 py-2 text-sm font-semibold text-purple-800 transition hover:bg-purple-50"
								>
									Login
								</Link>
								<Link
									to="/shutterpics-signup"
									className="rounded-full bg-purple-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-purple-700"
								>
									Sign Up
								</Link>
							</>
						)}
					</div>

					<div className="flex items-center gap-3 lg:hidden">
						<Link
							to={isLoggedin ? profilePath : '/shutterpics-login'}
							className="rounded-full border border-purple-200 bg-purple-50 p-2 text-purple-800"
							aria-label={isLoggedin ? 'Profile' : 'Login'}
						>
							<FaCircleUser className="h-5 w-5" />
						</Link>
						<button
							type="button"
							onClick={() => setOpen(!open)}
							className="rounded-lg border border-purple-200 p-2 text-gray-800 transition hover:bg-purple-50"
							aria-label={open ? 'Close menu' : 'Open menu'}
						>
							{open ? <RxCross2 className="h-6 w-6" /> : <HiMiniBars3CenterLeft className="h-6 w-6" />}
						</button>
					</div>
				</div>
			</header>

			<div
				className={`fixed inset-0 z-40 lg:hidden transition-opacity duration-300 ${
					open ? 'pointer-events-auto bg-black/50 opacity-100' : 'pointer-events-none opacity-0'
				}`}
				onClick={() => setOpen(false)}
				aria-hidden={!open}
			/>

			<aside
				className={`fixed top-0 right-0 z-50 flex h-full w-[min(88vw,320px)] flex-col bg-white shadow-2xl transition-transform duration-300 ease-out lg:hidden ${
					open ? 'translate-x-0' : 'translate-x-full'
				}`}
			>
				<div className="border-b border-purple-100 bg-gradient-to-br from-purple-600 to-violet-700 px-5 py-6 text-white">
					<p className="text-xs font-semibold uppercase tracking-widest text-purple-200">
						Welcome to
					</p>
					<h2 className="mt-1 text-2xl font-bold">ShutterPics</h2>
					<p className="mt-2 text-sm text-purple-100">
						{isLoggedin
							? localStorage.getItem('type') === 'admin'
								? 'Admin account'
								: user?.name || 'Your account'
							: 'Capture every moment beautifully'}
					</p>
				</div>

				<nav className="flex-1 overflow-y-auto nobar">
					<ul className="divide-y divide-gray-100">
						{navLinks.map((linkData) => (
							<li key={linkData.link}>
								<Link
									to={linkData.link}
									onClick={() => setOpen(false)}
									className={`flex items-center justify-between px-5 py-4 transition ${
										isActive(linkData.link)
											? 'bg-purple-50 text-purple-800'
											: 'text-gray-700 hover:bg-gray-50'
									}`}
								>
									<span className="flex items-center gap-3 font-medium">
										<linkData.icon size={20} className="text-purple-600" />
										{linkData.name}
									</span>
									<FaAngleRight className="text-gray-400" />
								</Link>
							</li>
						))}
						<li>
							<Link
								to="/rateus"
								onClick={() => setOpen(false)}
								className={`flex items-center justify-between px-5 py-4 transition ${
									isActive('/rateus')
										? 'bg-purple-50 text-purple-800'
										: 'text-gray-700 hover:bg-gray-50'
								}`}
							>
								<span className="flex items-center gap-3 font-medium">
									<BiSolidStar size={20} className="text-purple-600" />
									Rate Us
								</span>
								<FaAngleRight className="text-gray-400" />
							</Link>
						</li>
					</ul>
				</nav>

				<div className="space-y-3 border-t border-gray-100 p-5">
					<Link
						to="/shutterpics-online-booking"
						onClick={() => setOpen(false)}
						className="block w-full rounded-xl bg-gradient-to-r from-purple-600 to-violet-600 py-3 text-center text-sm font-semibold text-white shadow-lg shadow-purple-300/30"
					>
						Book a Session
					</Link>
					{!isLoggedin && (
						<div className="grid grid-cols-2 gap-3">
							<Link
								to="/shutterpics-login"
								onClick={() => setOpen(false)}
								className="flex items-center justify-center gap-1.5 rounded-xl border border-purple-200 py-2.5 text-sm font-semibold text-purple-800"
							>
								<BiSolidLogInCircle size={18} />
								Login
							</Link>
							<Link
								to="/shutterpics-signup"
								onClick={() => setOpen(false)}
								className="flex items-center justify-center gap-1.5 rounded-xl bg-purple-100 py-2.5 text-sm font-semibold text-purple-800"
							>
								<MdSwitchAccount size={18} />
								Sign Up
							</Link>
						</div>
					)}
				</div>
			</aside>
		</>
	);
};

export default Navbar;
