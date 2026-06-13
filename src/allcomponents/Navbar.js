import React, { useContext, useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { HiMiniBars3CenterLeft } from 'react-icons/hi2';
import { RxCross2 } from 'react-icons/rx';
import { FaCircleUser, FaArrowRight } from 'react-icons/fa6';
import { LOGO_SRC } from '../constants/brand';
import authContext from '../context/auth/authContext';
import { MdHome, MdSwitchAccount, MdContactMail, MdCamera, MdInfo } from 'react-icons/md';
import { RiHealthBookFill, RiGalleryFill } from 'react-icons/ri';
import { BiSolidLogInCircle, BiSolidStar } from 'react-icons/bi';

const navLinks = [
	{ name: 'Home', link: '/', icon: MdHome },
	{ name: 'Services', link: '/shutterpics-online-services', icon: MdCamera },
	{ name: 'Gallery', link: '/shutterpics-gallery', icon: RiGalleryFill },
	{ name: 'Booking', link: '/shutterpics-online-booking', icon: RiHealthBookFill },
	{ name: 'About', link: '/shutterpics-about', icon: MdInfo },
	{ name: 'Contact', link: '/shutterpics-contact', icon: MdContactMail }
];

const allMobileLinks = [
	...navLinks,
	{ name: 'Rate Us', link: '/rateus', icon: BiSolidStar }
];

const NavSlideLink = ({ to, children, active }) => (
	<Link
		to={to}
		className={`group relative block h-5 overflow-hidden text-sm font-medium ${
			active ? 'text-purple-900' : 'text-gray-700'
		}`}
	>
		<span className="block transition-transform duration-300 ease-out group-hover:-translate-y-full">
			{children}
		</span>
		<span
			className={`absolute left-0 top-full block transition-transform duration-300 ease-out group-hover:-translate-y-full ${
				active ? 'text-purple-700' : 'text-purple-600'
			}`}
		>
			{children}
		</span>
		{active && (
			<span className="absolute -bottom-1 left-0 h-0.5 w-full rounded-full bg-purple-700 transition-transform duration-300 origin-left scale-x-100 group-hover:scale-x-0" />
		)}
	</Link>
);

const NavArrowButton = ({ to, children, variant = 'primary', onClick }) => {
	const base =
		'group inline-flex items-center gap-2 rounded-full text-sm font-semibold transition-all duration-300';
	const styles =
		variant === 'primary'
			? `${base} bg-gradient-to-r from-purple-600 to-violet-600 px-5 py-2 text-white shadow-md shadow-purple-300/40 hover:from-purple-700 hover:to-violet-700`
			: `${base} border border-purple-300 bg-purple-50 px-4 py-2 text-purple-800 hover:bg-purple-100`;

	return (
		<Link to={to} onClick={onClick} className={styles}>
			{children}
			<FaArrowRight className="text-xs transition-transform duration-300 group-hover:rotate-[-45deg] group-hover:translate-x-0.5" />
		</Link>
	);
};

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
		document.body.classList.toggle('modal-open', open);
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

	return (
		<>
			<header className="sticky top-0 z-50 border-b border-purple-200/60 bg-white/80 backdrop-blur-md shadow-sm">
				<div className="mx-auto flex h-16 max-w-screen-2xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
					<div className="flex min-w-0 items-center gap-3">
						<Link to="/" className="group flex shrink-0 items-center gap-2.5">
							<img
								src={LOGO_SRC}
								alt="ShutterPics logo"
								className="h-10 w-10 object-contain transition-transform duration-300 group-hover:scale-105"
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

						<nav className="hidden lg:flex lg:items-center lg:gap-7 xl:gap-8 lg:pl-6 lg:ml-2 lg:border-l lg:border-purple-200">
							{navLinks.map((linkData) => (
								<NavSlideLink
									key={linkData.link}
									to={linkData.link}
									active={isActive(linkData.link)}
								>
									{linkData.name}
								</NavSlideLink>
							))}
						</nav>
					</div>

					<div className="hidden lg:flex items-center gap-3">
						<NavSlideLink to="/rateus" active={isActive('/rateus')}>
							Rate Us
						</NavSlideLink>
						<NavArrowButton to="/shutterpics-online-booking">Book Now</NavArrowButton>
						{isLoggedin ? (
							<NavArrowButton to={profilePath} variant="secondary">
								<FaCircleUser className="text-base" />
								Profile
							</NavArrowButton>
						) : (
							<>
								<NavSlideLink to="/shutterpics-login" active={isActive('/shutterpics-login')}>
									Login
								</NavSlideLink>
								<NavArrowButton to="/shutterpics-signup">Sign Up</NavArrowButton>
							</>
						)}
					</div>

					<div className="flex items-center gap-3 lg:hidden">
						<Link
							to={isLoggedin ? profilePath : '/shutterpics-login'}
							className="rounded-full border border-purple-200 bg-purple-50 p-2 text-purple-800 transition hover:scale-105"
							aria-label={isLoggedin ? 'Profile' : 'Login'}
						>
							<FaCircleUser className="h-5 w-5" />
						</Link>
						<button
							type="button"
							onClick={() => setOpen(!open)}
							className="rounded-lg border border-purple-200 p-2 text-gray-800 transition hover:bg-purple-50"
							aria-label={open ? 'Close menu' : 'Open menu'}
							aria-expanded={open}
						>
							<span
								className={`block transition-transform duration-300 ${open ? 'rotate-90 scale-95' : 'rotate-0'}`}
							>
								{open ? <RxCross2 className="h-6 w-6" /> : <HiMiniBars3CenterLeft className="h-6 w-6" />}
							</span>
						</button>
					</div>
				</div>
			</header>

			{/* Full-screen menu overlay */}
			<div
				className={`fixed inset-0 z-[60] flex flex-col lg:hidden transition-opacity duration-500 ${
					open ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'
				}`}
				aria-hidden={!open}
			>
				<div
					className={`absolute inset-0 bg-gradient-to-br from-purple-950 via-violet-900 to-indigo-950 transition-transform duration-700 ease-out ${
						open ? 'scale-100' : 'scale-105'
					}`}
					onClick={() => setOpen(false)}
				/>

				<div className="relative flex flex-1 flex-col px-6 pb-10 pt-24 sm:px-10">
					<p
						className={`mb-8 text-xs font-semibold uppercase tracking-[0.35em] text-purple-300 transition-all duration-500 ${
							open ? 'translate-y-0 opacity-100' : '-translate-y-4 opacity-0'
						}`}
						style={{ transitionDelay: open ? '80ms' : '0ms' }}
					>
						Menu
					</p>

					<nav className="flex flex-1 flex-col justify-center">
						<ul className="space-y-2 sm:space-y-3">
							{allMobileLinks.map((linkData, index) => {
								const Icon = linkData.icon;
								const delay = open ? index * 70 + 120 : (allMobileLinks.length - index) * 40;
								return (
									<li
										key={linkData.link}
										style={{ transitionDelay: `${delay}ms` }}
										className={`transform transition-all duration-500 ease-out ${
											open ? 'translate-x-0 opacity-100' : '-translate-x-8 opacity-0'
										}`}
									>
										<Link
											to={linkData.link}
											onClick={() => setOpen(false)}
											className="group flex items-center gap-4 py-3 text-3xl font-bold text-white sm:text-4xl"
										>
											<Icon
												className={`shrink-0 text-2xl transition-transform duration-300 group-hover:scale-110 ${
													isActive(linkData.link) ? 'text-purple-300' : 'text-purple-400/80'
												}`}
											/>
											<span className="relative overflow-hidden">
												<span className="block transition-transform duration-300 ease-out group-hover:-translate-y-full">
													{linkData.name}
												</span>
												<span className="absolute left-0 top-full block text-purple-300 transition-transform duration-300 ease-out group-hover:-translate-y-full">
													{linkData.name}
												</span>
											</span>
											<FaArrowRight className="ml-auto text-lg text-purple-400/60 transition-all duration-300 group-hover:rotate-[-45deg] group-hover:text-purple-200" />
										</Link>
									</li>
								);
							})}
						</ul>
					</nav>

					<div
						className={`space-y-4 border-t border-white/10 pt-8 transition-all duration-500 ${
							open ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
						}`}
						style={{ transitionDelay: open ? `${allMobileLinks.length * 70 + 180}ms` : '0ms' }}
					>
						<NavArrowButton to="/shutterpics-online-booking" onClick={() => setOpen(false)}>
							Book a Session
						</NavArrowButton>
						{!isLoggedin && (
							<div className="grid grid-cols-2 gap-3">
								<Link
									to="/shutterpics-login"
									onClick={() => setOpen(false)}
									className="flex items-center justify-center gap-1.5 rounded-xl border border-white/20 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
								>
									<BiSolidLogInCircle size={18} />
									Login
								</Link>
								<Link
									to="/shutterpics-signup"
									onClick={() => setOpen(false)}
									className="flex items-center justify-center gap-1.5 rounded-xl bg-white/15 py-3 text-sm font-semibold text-white transition hover:bg-white/25"
								>
									<MdSwitchAccount size={18} />
									Sign Up
								</Link>
							</div>
						)}
						{isLoggedin && (
							<p className="text-sm text-purple-200">
								Signed in as{' '}
								<span className="font-semibold text-white">
									{localStorage.getItem('type') === 'admin' ? 'Admin' : user?.name || 'Member'}
								</span>
							</p>
						)}
					</div>
				</div>
			</div>
		</>
	);
};

export default Navbar;
