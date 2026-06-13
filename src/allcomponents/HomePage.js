import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { BsBookmarkCheckFill } from 'react-icons/bs';
import About from './About';
import TeamSection from './TeamSection';
import FeedbackSection from './FeedbackSection';
import { Helmet } from 'react-helmet';
import { BiSolidStar } from 'react-icons/bi';
import { RiGalleryFill } from 'react-icons/ri';
import { MdCamera } from 'react-icons/md';
import heroMain from '../allimages/groombride.jpg';
import heroAccent from '../allimages/engage.jpg';
import heroDetail from '../allimages/bride shoot.jpg';

const HomePage = () => {
	useEffect(() => {
		window.scrollTo(0, 0);
		document.title = 'Home Page - SP';
	}, []);

	return (
		<div className="bg-gradient-to-tl from-purple-200 to-blue-200 pb-6 sm:pb-8 lg:pb-12 relative overflow-hidden">
			<Helmet>
				<title>
					ShutterPics Homepage: Professional Photography Services | Top-Rated Photoshoots |
					Videography | Music Video Production | Trusted Photography Studio
				</title>
				<meta
					name="description"
					content="Photography Services, Photoshoots, Wedding Photography, Event Photography, Videography, Music Videos, Portrait Photography, Commercial Photography, Product Photography, Studio Rental"
				/>
			</Helmet>
			<div className="mx-auto max-w-screen-2xl px-4 md:px-8 text-gray-700 lg:pt-8">
				<section className="relative my-6 md:my-10 mb-16 md:mb-24 overflow-hidden">
					<div
						aria-hidden="true"
						className="pointer-events-none absolute -right-24 -top-16 h-72 w-72 rounded-full bg-purple-400/25 blur-3xl"
					/>
					<div
						aria-hidden="true"
						className="pointer-events-none absolute -left-20 bottom-0 h-64 w-64 rounded-full bg-blue-400/20 blur-3xl"
					/>

					<div className="relative grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
						<div className="flex flex-col justify-center text-center lg:text-left">
							<span className="mb-4 inline-flex items-center justify-center gap-2 self-center rounded-full border border-purple-200 bg-white/70 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-purple-800 shadow-sm backdrop-blur-sm lg:self-start">
								<MdCamera className="text-base" />
								Professional Photography Studio
							</span>

							<h1 className="mb-4 text-4xl font-bold leading-tight text-gray-900 sm:text-5xl lg:text-6xl">
								Capture Your{' '}
								<span className="bg-gradient-to-r from-purple-700 to-blue-600 bg-clip-text text-transparent">
									Moments
								</span>{' '}
								with Us
							</h1>

							<p className="mb-8 max-w-xl text-base font-medium leading-relaxed text-gray-600 sm:text-lg lg:mx-0 mx-auto text-justify lg:text-left">
								From weddings and engagements to birthdays and corporate events — our team turns
								every frame into a memory you will cherish forever.
							</p>

							<div className="flex flex-col gap-3 sm:flex-row sm:justify-center lg:justify-start">
								<Link
									to="/shutterpics-online-booking"
									className="inline-flex items-center justify-center gap-2 rounded-xl bg-purple-600 px-6 py-3 text-center font-semibold text-white shadow-lg shadow-purple-500/25 transition hover:bg-purple-700 hover:shadow-purple-500/40"
								>
									Book your slot now
									<BsBookmarkCheckFill className="text-lg" />
								</Link>
								<Link
									to="/shutterpics-gallery"
									className="inline-flex items-center justify-center gap-2 rounded-xl border-2 border-purple-300 bg-white/80 px-6 py-3 text-center font-semibold text-purple-800 backdrop-blur-sm transition hover:border-purple-400 hover:bg-white"
								>
									View gallery
									<RiGalleryFill className="text-lg" />
								</Link>
							</div>

							<div className="mt-10 grid grid-cols-3 gap-4 border-t border-purple-200/80 pt-8">
								<div className="text-center lg:text-left">
									<p className="text-2xl font-bold text-purple-700 sm:text-3xl">6+</p>
									<p className="text-xs font-semibold uppercase tracking-wide text-gray-500 sm:text-sm">
										Years Experience
									</p>
								</div>
								<div className="text-center lg:text-left">
									<p className="text-2xl font-bold text-purple-700 sm:text-3xl">500+</p>
									<p className="text-xs font-semibold uppercase tracking-wide text-gray-500 sm:text-sm">
										Events Covered
									</p>
								</div>
								<div className="text-center lg:text-left">
									<p className="flex items-center justify-center gap-0.5 text-2xl font-bold text-purple-700 sm:text-3xl lg:justify-start">
										5
										<BiSolidStar className="text-yellow-400" />
									</p>
									<p className="text-xs font-semibold uppercase tracking-wide text-gray-500 sm:text-sm">
										Client Rated
									</p>
								</div>
							</div>
						</div>

						<div className="relative mx-auto w-full max-w-lg lg:max-w-none">
							<div className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-white/60 bg-white shadow-2xl shadow-purple-900/10 ring-1 ring-purple-100">
								<img
									src={heroMain}
									loading="eager"
									alt="Wedding couple portrait by ShutterPics"
									className="h-full w-full object-cover object-center transition duration-700 hover:scale-105"
								/>
								<div className="absolute inset-0 bg-gradient-to-t from-purple-950/40 via-transparent to-transparent" />
								<div className="absolute bottom-4 left-4 rounded-lg bg-white/90 px-3 py-2 text-sm font-semibold text-gray-800 shadow-md backdrop-blur-sm">
									Weddings &amp; Engagements
								</div>
							</div>

							<div className="absolute -left-4 top-8 hidden h-28 w-24 overflow-hidden rounded-xl border-2 border-white shadow-xl sm:block md:h-32 md:w-28 lg:-left-8">
								<img
									src={heroAccent}
									loading="lazy"
									alt="Engagement photoshoot"
									className="h-full w-full object-cover"
								/>
							</div>

							<div className="absolute -right-2 bottom-12 hidden h-32 w-28 overflow-hidden rounded-xl border-2 border-white shadow-xl sm:block md:h-36 md:w-32 lg:-right-6">
								<img
									src={heroDetail}
									loading="lazy"
									alt="Bridal portrait"
									className="h-full w-full object-cover"
								/>
							</div>

							<div className="absolute -right-1 -top-3 flex items-center gap-1 rounded-full bg-white px-3 py-1.5 text-sm font-semibold text-gray-800 shadow-lg ring-1 ring-purple-100 sm:-right-4">
								<span className="flex text-yellow-400">
									{[0, 1, 2, 3, 4].map((i) => (
										<BiSolidStar key={i} />
									))}
								</span>
								<span className="text-gray-600">Trusted by clients</span>
							</div>
						</div>
					</div>
				</section>

				{/* <section className="flex items-center justify-center border-t py-8">
          <div className="-mx-6 grid grid-cols-2 gap-8 md:flex items-center justify-around w-full">
            <div className="px-6 md:px-8">
              <span className="block text-center text-4xl font-bold text-blue-600">20</span>
              <span className="block text-center text-xl font-semibold">People</span>
            </div>

            <div className="px-6 md:px-8">
              <span className="block text-center text-4xl font-bold text-blue-600">30+</span>
              <span className="block text-center text-xl font-semibold">Cities</span>
            </div>

            <div className="px-6 md:px-8">
              <span className="block text-center text-4xl font-bold text-blue-600">50+</span>
              <span className="block text-center text-xl font-semibold">Libraries</span>
            </div>

            <div className="px-6 md:px-8">
              <span className="block text-center text-4xl font-bold text-blue-600">2500+</span>
              <span className="block text-center text-xl font-semibold">Students</span>
            </div>

          </div>
        </section> */}

				<About embedded />

				<TeamSection />

				<FeedbackSection />

			</div>
		</div>
	);
};

export default HomePage;
