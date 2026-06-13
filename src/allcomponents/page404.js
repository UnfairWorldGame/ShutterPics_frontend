import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import img from '../allimages/page404.png';

const Page404 = () => {
	const location = useLocation();

	useEffect(() => {
		document.title = 'Page Not Found - ShutterPics';
	}, []);

	return (
		<div className="flex min-h-[70vh] items-center justify-center bg-gradient-to-br from-purple-50 via-white to-blue-50 px-4 py-16">
			<div className="w-full max-w-lg text-center">
				<div className="mx-auto mb-8 flex max-w-xs justify-center">
					<img src={img} alt="Page not found" className="w-full object-contain" />
				</div>

				<p className="text-sm font-semibold uppercase tracking-widest text-purple-600">
					Error 404
				</p>
				<h1 className="mt-2 text-3xl font-bold text-gray-900 md:text-4xl">Page Not Found</h1>
				<p className="mt-4 text-base leading-relaxed text-gray-600">
					The page{' '}
					<span className="font-medium text-gray-800">{location.pathname}</span> doesn&apos;t
					exist or may have been moved.
				</p>

				<div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
					<Link
						to="/"
						className="inline-flex h-12 min-w-[140px] items-center justify-center rounded-full bg-gradient-to-r from-purple-600 to-violet-600 px-6 text-sm font-semibold text-white shadow-lg shadow-purple-200 transition hover:from-purple-700 hover:to-violet-700"
					>
						Back to Home
					</Link>
					<Link
						to="/shutterpics-contact"
						className="inline-flex h-12 min-w-[140px] items-center justify-center rounded-full border border-purple-200 bg-white px-6 text-sm font-semibold text-purple-800 transition hover:bg-purple-50"
					>
						Contact Us
					</Link>
				</div>
			</div>
		</div>
	);
};

export default Page404;
