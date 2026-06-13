import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { HiSparkles } from 'react-icons/hi2';
import { MdGroups, MdContactMail } from 'react-icons/md';
import { RiHealthBookFill, RiPlayCircleFill } from 'react-icons/ri';
import { BsBookmarkCheckFill } from 'react-icons/bs';
import { FaAngleRight } from 'react-icons/fa6';

const ventures = [
	{
		id: 'linkchat',
		icon: MdContactMail,
		name: 'LinkChat',
		tagline: 'Instant temporary chat rooms — no signup required',
		url: 'https://linkchat.in',
		accent: 'from-violet-600 to-purple-700',
		iconBg: 'from-violet-100 to-purple-100',
		description:
			'LinkChat lets you spin up anonymous chat rooms in seconds. Share a link with friends, colleagues, or event guests and start talking right away — no accounts, no downloads, and no friction.',
		highlights: [
			'Create a room instantly and share a single link',
			'Free, anonymous, and works in the browser',
			'Ideal for quick group chats, events, and temporary conversations'
		]
	},
	{
		id: 'vadg',
		icon: RiHealthBookFill,
		name: 'VADG',
		tagline: 'Know your health before visiting the doctor',
		url: 'https://vadg.in',
		accent: 'from-emerald-600 to-teal-700',
		iconBg: 'from-emerald-100 to-teal-100',
		description:
			'VADG is an AI-powered health triage platform built for India. Multi-layered clinical agents analyze your symptoms, ask smart follow-up questions, and help you understand probable conditions — in 22+ Indian languages — before you step into a clinic.',
		highlights: [
			'Symptom triage with live follow-up questions',
			'Hospital report analyzer for PDFs and photos',
			'Clinician-ready PDF reports in regional languages'
		]
	},
	{
		id: 'linkchat-radio',
		icon: RiPlayCircleFill,
		name: 'LinkChat Radio',
		tagline: 'World radio — listen globally from one place',
		url: 'https://radio.linkchat.in',
		accent: 'from-blue-600 to-indigo-700',
		iconBg: 'from-blue-100 to-indigo-100',
		description:
			'LinkChat Radio is a free world radio explorer from the LinkChat team. Browse global stations, filter by region or genre, and enjoy live broadcasts from around the globe — all in your browser.',
		highlights: [
			'Discover stations from countries worldwide',
			'Filter and search to find what you want to hear',
			'Part of the LinkChat tools ecosystem'
		]
	}
];

const Partners = () => {
	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	return (
		<div className="bg-gradient-to-tl from-purple-200 to-blue-200 pb-6 sm:pb-8 lg:pb-12">
			<Helmet>
				<title>Partners | LinkChat, VADG &amp; LinkChat Radio — ShutterPics</title>
				<meta
					name="description"
					content="Explore ShutterPics partner ventures — LinkChat for instant chat rooms, VADG for AI health triage in India, and LinkChat Radio for world radio streaming."
				/>
			</Helmet>

			<div className="mx-auto max-w-screen-2xl px-4 text-gray-700 md:px-8 lg:pt-4">
				<section className="relative py-8 md:py-12">
					<div
						aria-hidden="true"
						className="pointer-events-none absolute -right-16 top-0 h-56 w-56 rounded-full bg-purple-400/20 blur-3xl"
					/>
					<div
						aria-hidden="true"
						className="pointer-events-none absolute -left-12 bottom-24 h-48 w-48 rounded-full bg-blue-400/15 blur-3xl"
					/>

					<div className="relative mb-10 flex flex-col items-center text-center md:mb-14">
						<span className="mb-4 inline-flex items-center gap-2 rounded-full border border-purple-200 bg-white/70 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-purple-800 shadow-sm backdrop-blur-sm">
							<MdGroups className="text-base" />
							Our Ventures
						</span>
						<h1 className="mb-4 text-3xl font-bold text-gray-900 sm:text-4xl lg:text-5xl">
							Beyond{' '}
							<span className="bg-gradient-to-r from-purple-700 to-blue-600 bg-clip-text text-transparent">
								Photography
							</span>
						</h1>
						<p className="max-w-3xl text-base font-medium leading-relaxed text-gray-600 sm:text-lg text-justify md:text-center">
							ShutterPics is part of a broader creative and technology ecosystem. Alongside
							capturing your memories, we also build tools for communication, health awareness, and
							global media — each crafted with the same care we bring to every shoot.
						</p>
					</div>

					<div className="relative space-y-8 md:space-y-10">
						{ventures.map((venture, index) => {
							const Icon = venture.icon;
							const reversed = index % 2 === 1;

							return (
								<article
									key={venture.id}
									id={venture.id}
									className="overflow-hidden rounded-2xl border border-white/60 bg-white/80 shadow-lg shadow-purple-900/5 backdrop-blur-sm ring-1 ring-purple-100"
								>
									<div
										className={`grid items-center gap-6 p-6 sm:p-8 lg:grid-cols-2 lg:gap-10 ${
											reversed ? 'lg:[&>*:first-child]:order-2' : ''
										}`}
									>
										<div>
											<div
												className={`mb-4 inline-flex rounded-xl bg-gradient-to-br ${venture.iconBg} p-3 text-purple-700`}
											>
												<Icon className="text-3xl" />
											</div>
											<h2 className="mb-2 text-2xl font-bold text-gray-900 sm:text-3xl">
												{venture.name}
											</h2>
											<p className="mb-4 text-sm font-semibold text-purple-700 sm:text-base">
												{venture.tagline}
											</p>
											<p className="text-justify leading-relaxed text-gray-600 sm:text-lg">
												{venture.description}
											</p>
											<ul className="mt-5 space-y-2.5">
												{venture.highlights.map((item) => (
													<li
														key={item}
														className="flex items-start gap-2 text-sm text-gray-600 sm:text-base"
													>
														<HiSparkles className="mt-1 shrink-0 text-purple-500" />
														<span>{item}</span>
													</li>
												))}
											</ul>
										</div>

										<div className="flex flex-col items-center justify-center rounded-2xl border border-purple-100 bg-gradient-to-br from-purple-50/80 to-blue-50/80 p-6 text-center sm:p-8">
											<p className="mb-6 max-w-sm text-sm leading-relaxed text-gray-600 sm:text-base">
												Visit{' '}
												<span className="font-semibold text-gray-900">{venture.name}</span>{' '}
												to explore the full experience.
											</p>
											<a
												href={venture.url}
												target="_blank"
												rel="noopener noreferrer"
												className={`inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r ${venture.accent} px-6 py-3 font-semibold text-white shadow-lg shadow-purple-500/20 transition hover:opacity-95 hover:shadow-purple-500/30`}
											>
												Open {venture.name}
												<FaAngleRight className="text-lg" />
											</a>
											<p className="mt-4 text-xs text-gray-500">{venture.url}</p>
										</div>
									</div>
								</article>
							);
						})}
					</div>

					<div className="relative mt-12 flex flex-col items-center rounded-2xl border border-white/60 bg-white/80 p-6 text-center shadow-lg shadow-purple-900/5 backdrop-blur-sm ring-1 ring-purple-100 sm:p-8 md:mt-16">
						<h2 className="mb-3 text-xl font-bold text-gray-900 sm:text-2xl">
							Ready to capture your moments?
						</h2>
						<p className="mb-6 max-w-lg text-gray-600">
							While you explore our other projects, remember ShutterPics is here for weddings,
							events, portraits, and cinematic videography.
						</p>
						<div className="flex flex-col gap-3 sm:flex-row">
							<Link
								to="/shutterpics-online-booking"
								className="inline-flex items-center justify-center gap-2 rounded-xl bg-purple-600 px-6 py-3 font-semibold text-white shadow-lg shadow-purple-500/25 transition hover:bg-purple-700"
							>
								Book a session
								<BsBookmarkCheckFill className="text-lg" />
							</Link>
							<Link
								to="/shutterpics-about"
								className="inline-flex items-center justify-center gap-2 rounded-xl border-2 border-purple-300 bg-white px-6 py-3 font-semibold text-purple-800 transition hover:border-purple-400 hover:bg-purple-50"
							>
								About ShutterPics
							</Link>
						</div>
					</div>
				</section>
			</div>
		</div>
	);
};

export default Partners;
