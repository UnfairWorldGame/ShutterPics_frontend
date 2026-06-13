import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import services from '../libs/AllServices';
import SoloService from './SoloService';
import { Helmet } from 'react-helmet';
import { MdCamera } from 'react-icons/md';
import { BsBookmarkCheckFill } from 'react-icons/bs';
import { RiGalleryFill } from 'react-icons/ri';

const highlights = [
	{ label: 'Packages', value: '4+' },
	{ label: 'Events Covered', value: '500+' },
	{ label: 'Delivery', value: '30–45 days' }
];

const Services = () => {
	useEffect(() => {
		window.scrollTo(0, 0);
		document.title = 'Services - SP';
	}, []);

	return (
		<div className="relative overflow-hidden bg-gradient-to-tl from-purple-200 to-blue-200 pb-8 sm:pb-12 lg:pb-16">
			<Helmet>
				<title>
					ShutterPics Services: Professional Photography Services | Top-Rated Photoshoots |
					Videography | Music Video Production | Trusted Photography Studio
				</title>
				<meta
					name="description"
					content="Photography Services, Photoshoots, Wedding Photography, Event Photography, Videography, Music Videos, Portrait Photography, Commercial Photography, Product Photography, Studio Rental"
				/>
			</Helmet>

			<div
				aria-hidden="true"
				className="pointer-events-none absolute -left-20 top-0 h-72 w-72 rounded-full bg-purple-400/20 blur-3xl"
			/>
			<div
				aria-hidden="true"
				className="pointer-events-none absolute -right-24 bottom-32 h-64 w-64 rounded-full bg-blue-400/20 blur-3xl"
			/>

			<div className="relative mx-auto max-w-screen-2xl px-4 pt-6 text-gray-700 md:px-8 lg:pt-10">
				<div className="mb-10 text-center">
					<span className="mb-4 inline-flex items-center gap-2 rounded-full border border-purple-200 bg-white/70 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-purple-800 shadow-sm backdrop-blur-sm">
						<MdCamera className="text-base" />
						Our Packages
					</span>
					<h1 className="mb-3 text-3xl font-bold text-gray-900 sm:text-4xl lg:text-5xl">
						Photography{' '}
						<span className="bg-gradient-to-r from-purple-700 to-blue-600 bg-clip-text text-transparent">
							Services
						</span>
					</h1>
					<p className="mx-auto max-w-2xl text-base font-medium leading-relaxed text-gray-600 sm:text-lg">
						From weddings and ring ceremonies to birthdays and receptions — explore our packages
						and find the perfect fit for your special day.
					</p>
				</div>

				<div className="mb-10 grid grid-cols-3 gap-3 sm:gap-4 lg:mx-auto lg:max-w-3xl">
					{highlights.map((item) => (
						<div
							key={item.label}
							className="rounded-xl border border-white/60 bg-white/70 px-3 py-4 text-center shadow-sm backdrop-blur-sm sm:px-4"
						>
							<p className="text-xl font-bold text-purple-700 sm:text-2xl">{item.value}</p>
							<p className="mt-1 text-xs font-semibold uppercase tracking-wide text-gray-500 sm:text-sm">
								{item.label}
							</p>
						</div>
					))}
				</div>

				<p className="mb-8 text-center text-sm text-gray-500">
					Tap a package card to flip and view full details, then book directly.
				</p>

				<section className="grid gap-8 md:grid-cols-2 md:gap-10 xl:gap-12">
					{services.map((service, idx) => (
						<SoloService key={idx} service={service} idx={idx} />
					))}
				</section>

				<section className="mt-12 space-y-6">
					<div className="rounded-2xl border border-purple-200/80 bg-white/80 p-5 shadow-lg shadow-purple-900/5 backdrop-blur-sm sm:p-6">
						<div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
							<div>
								<p className="mb-1 text-sm font-bold uppercase tracking-wide text-purple-700">
									Delivery Note
								</p>
								<p className="max-w-3xl text-sm leading-relaxed text-gray-600 sm:text-base">
									Deliverable items will be delivered{' '}
									<span className="font-semibold text-gray-800">30 to 45 days</span> after the
									final selected photos are received.
								</p>
							</div>
							<div className="flex shrink-0 flex-col gap-3 sm:flex-row">
								<Link
									to="/shutterpics-online-booking"
									className="inline-flex items-center justify-center gap-2 rounded-xl bg-purple-600 px-5 py-2.5 text-sm font-semibold text-white shadow-md shadow-purple-500/25 transition hover:bg-purple-700"
								>
									Book a Package
									<BsBookmarkCheckFill />
								</Link>
								<Link
									to="/shutterpics-gallery"
									className="inline-flex items-center justify-center gap-2 rounded-xl border-2 border-purple-300 bg-white px-5 py-2.5 text-sm font-semibold text-purple-800 transition hover:border-purple-400 hover:bg-purple-50"
								>
									View Gallery
									<RiGalleryFill />
								</Link>
							</div>
						</div>
					</div>
				</section>
			</div>
		</div>
	);
};

export default Services;
