import React from 'react';
import { Link } from 'react-router-dom';
import { LOGO_SRC } from '../constants/brand';
import { MdCamera, MdBookmark, MdRateReview } from 'react-icons/md';
import { BsShieldLock } from 'react-icons/bs';

export const authInputClass =
	'mt-1.5 w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm text-gray-900 placeholder-gray-400 transition focus:border-purple-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-purple-200 disabled:cursor-not-allowed disabled:opacity-60';

const perks = [
	{ icon: MdBookmark, text: 'Book sessions and manage your dates online' },
	{ icon: MdCamera, text: 'Access your profile and booking history anytime' },
	{ icon: MdRateReview, text: 'Share feedback and rate your experience' }
];

const AuthLayout = ({ title, subtitle, children, footer }) => {
	return (
		<div className="min-h-[calc(100vh-4rem)] bg-gradient-to-br from-purple-100 via-purple-50 to-blue-100 py-10 px-4 sm:px-6 lg:px-8">
			<div className="mx-auto grid max-w-5xl overflow-hidden rounded-2xl border border-white/80 bg-white shadow-2xl shadow-purple-900/10 ring-1 ring-purple-100 lg:grid-cols-2">
				{/* Brand panel */}
				<div className="relative hidden flex-col justify-between bg-gradient-to-br from-purple-600 to-violet-800 p-8 text-white lg:flex lg:p-10">
					<div
						aria-hidden="true"
						className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/10 blur-2xl"
					/>
					<div className="relative">
						<Link to="/" className="inline-flex items-center gap-3">
							<img
								src={LOGO_SRC}
								alt="ShutterPics"
								className="h-12 w-12 rounded-xl bg-white/10 p-1 object-contain"
							/>
							<div>
								<p className="text-lg font-bold">ShutterPics</p>
								<p className="text-xs uppercase tracking-wider text-purple-200">
									Photography Studio
								</p>
							</div>
						</Link>
						<h1 className="mt-10 text-2xl font-bold leading-snug xl:text-3xl">{title}</h1>
						{subtitle && <p className="mt-3 text-sm leading-relaxed text-purple-100">{subtitle}</p>}
					</div>

					<ul className="relative mt-10 space-y-4">
						{perks.map(({ icon: Icon, text }) => (
							<li key={text} className="flex items-start gap-3 text-sm text-purple-100">
								<span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white/15">
									<Icon className="text-lg" />
								</span>
								{text}
							</li>
						))}
					</ul>

					<div className="relative mt-8 flex items-center gap-2 text-xs text-purple-200">
						<BsShieldLock />
						<span>Your data is kept private and secure</span>
					</div>
				</div>

				{/* Form panel */}
				<div className="flex flex-col justify-center p-6 sm:p-8 lg:p-10">
					<div className="mb-6 lg:hidden">
						<Link to="/" className="inline-flex items-center gap-2">
							<img src={LOGO_SRC} alt="ShutterPics" className="h-10 w-10 object-contain" />
							<span className="font-bold text-gray-900">ShutterPics</span>
						</Link>
						<h1 className="mt-4 text-2xl font-bold text-gray-900">{title}</h1>
						{subtitle && <p className="mt-2 text-sm text-gray-600">{subtitle}</p>}
					</div>

					{children}

					{footer && <div className="mt-6 text-center text-sm text-gray-600">{footer}</div>}
				</div>
			</div>
		</div>
	);
};

export default AuthLayout;
