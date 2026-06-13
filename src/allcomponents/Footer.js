import React, { useContext } from 'react';
import { IoLogoInstagram } from 'react-icons/io5';
import { BsTwitterX } from 'react-icons/bs';
import { FaFacebookSquare, FaYoutube } from 'react-icons/fa';
import { BiSolidPhoneCall } from 'react-icons/bi';
import { IoLogoWhatsapp } from 'react-icons/io';
import { MdEmail, MdLocationOn } from 'react-icons/md';
import { LOGO_SRC } from '../constants/brand';
import { Link } from 'react-router-dom';
import authContext from '../context/auth/authContext';

const quickLinks = [
	{ name: 'Home', to: '/' },
	{ name: 'Services', to: '/shutterpics-online-services' },
	{ name: 'Gallery', to: '/shutterpics-gallery' },
	{ name: 'Booking', to: '/shutterpics-online-booking' },
	{ name: 'About', to: '/shutterpics-about' },
	{ name: 'Contact', to: '/shutterpics-contact' },
	{ name: 'Partners', to: '/shutterpics-partners' },
	{ name: 'Rate Us', to: '/rateus' }
];

const partnerLinks = [
	{ name: 'All Ventures', to: '/shutterpics-partners' },
	{ name: 'LinkChat', href: 'https://linkchat.in' },
	{ name: 'VADG', href: 'https://vadg.in' },
	{ name: 'LinkChat Radio', href: 'https://radio.linkchat.in' }
];

const socialLinks = [
	{
		name: 'YouTube',
		href: 'https://www.youtube.com/@shutterpics',
		icon: FaYoutube,
		className: 'hover:bg-red-500/20 hover:text-red-400'
	},
	{
		name: 'Instagram',
		href: 'https://www.instagram.com/shutterpics_wedd/',
		icon: IoLogoInstagram,
		className: 'hover:bg-pink-500/20 hover:text-pink-400'
	},
	{
		name: 'X',
		href: 'https://x.com/shutterpic_s?t=RWtfW_yE5pnp5o_u5hDzFw&s=09',
		icon: BsTwitterX,
		className: 'hover:bg-white/10 hover:text-white'
	},
	{
		name: 'Facebook',
		href: 'https://www.facebook.com/profile.php?id=100089798807646',
		icon: FaFacebookSquare,
		className: 'hover:bg-blue-500/20 hover:text-blue-400'
	}
];

const Footer = () => {
	const { isLoggedin } = useContext(authContext);
	const year = new Date().getFullYear();

	return (
		<footer className="mt-auto bg-gradient-to-b from-gray-900 to-gray-950 text-gray-300">
			<div className="mx-auto max-w-screen-2xl px-4 py-12 sm:px-6 lg:px-8">
				<div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
					<div className="space-y-4">
						<Link to="/" className="inline-flex items-center gap-3">
							<img
								src={LOGO_SRC}
								alt="ShutterPics logo"
								className="h-12 w-12 rounded-xl bg-white/10 p-1 object-contain"
							/>
							<div>
								<p className="text-lg font-bold text-white">ShutterPics</p>
								<p className="text-xs uppercase tracking-wider text-purple-400">
									Photography & Videography
								</p>
							</div>
						</Link>
						<p className="max-w-xs text-sm leading-relaxed text-gray-400">
							Professional wedding, event, and portrait photography. We turn your special moments
							into timeless memories.
						</p>
						<Link
							to="/shutterpics-online-booking"
							className="inline-block rounded-full bg-gradient-to-r from-purple-600 to-violet-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:from-purple-500 hover:to-violet-500"
						>
							Book a Session
						</Link>
					</div>

					<div>
						<h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">
							Quick Links
						</h3>
						<ul className="space-y-2.5 text-sm">
							{quickLinks.map((link) => (
								<li key={link.to}>
									<Link
										to={link.to}
										className="transition hover:text-purple-400 hover:translate-x-0.5 inline-block"
									>
										{link.name}
									</Link>
								</li>
							))}
							{!isLoggedin && (
								<>
									<li>
										<Link to="/shutterpics-login" className="transition hover:text-purple-400">
											Login
										</Link>
									</li>
									<li>
										<Link to="/shutterpics-signup" className="transition hover:text-purple-400">
											Sign Up
										</Link>
									</li>
								</>
							)}
						</ul>
					</div>

					<div>
						<h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">
							Contact
						</h3>
						<ul className="space-y-3 text-sm">
							<li className="flex items-start gap-3">
								<MdLocationOn className="mt-0.5 shrink-0 text-purple-400" size={18} />
								<span>shutterpics.in</span>
							</li>
							<li>
								<a
									href="tel:+919125907656"
									className="flex items-center gap-3 transition hover:text-purple-400"
								>
									<BiSolidPhoneCall className="shrink-0 text-purple-400" size={18} />
									+91 91259 07656
								</a>
							</li>
							<li>
								<a
									href="https://wa.me/919125907656"
									target="_blank"
									rel="noopener noreferrer"
									className="flex items-center gap-3 transition hover:text-green-400"
								>
									<IoLogoWhatsapp className="shrink-0 text-green-500" size={18} />
									WhatsApp us
								</a>
							</li>
							<li>
								<a
									href="mailto:shutterpicsstudio@gmail.com"
									className="flex items-center gap-3 transition hover:text-purple-400"
								>
									<MdEmail className="shrink-0 text-purple-400" size={18} />
									shutterpicsstudio@gmail.com
								</a>
							</li>
						</ul>
					</div>

					<div>
						<h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">
							Follow Us
						</h3>
						<div className="flex flex-wrap gap-3">
							{socialLinks.map((social) => (
								<a
									key={social.name}
									href={social.href}
									target="_blank"
									rel="noopener noreferrer"
									aria-label={social.name}
									className={`flex h-10 w-10 items-center justify-center rounded-full bg-white/5 text-lg text-gray-300 transition ${social.className}`}
								>
									<social.icon />
								</a>
							))}
						</div>

						<h3 className="mb-3 mt-8 text-sm font-semibold uppercase tracking-wider text-white">
							Partners
						</h3>
						<ul className="space-y-2 text-sm">
							{partnerLinks.map((partner) => (
								<li key={partner.to || partner.href}>
									{partner.to ? (
										<Link
											to={partner.to}
											className="text-gray-400 transition hover:text-purple-400"
										>
											{partner.name}
										</Link>
									) : (
										<a
											href={partner.href}
											target="_blank"
											rel="noopener noreferrer"
											className="text-gray-400 transition hover:text-purple-400"
										>
											{partner.name}
										</a>
									)}
								</li>
							))}
						</ul>
					</div>
				</div>
			</div>

			<div className="border-t border-white/10">
				<div className="mx-auto flex max-w-screen-2xl flex-col items-center justify-between gap-3 px-4 py-5 text-center text-xs text-gray-500 sm:flex-row sm:px-6 sm:text-left lg:px-8">
					<p>© {year} ShutterPics. All rights reserved.</p>
					<p className="text-gray-600">Wedding · Event · Portrait · Cinematic Videography</p>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
