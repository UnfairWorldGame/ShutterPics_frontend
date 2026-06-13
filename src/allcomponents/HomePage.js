import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import About from './About';
import TeamSection from './TeamSection';
import FeedbackSection from './FeedbackSection';
import ShowcaseSection from './ShowcaseSection';
import { Helmet } from 'react-helmet';
import { BiSolidStar } from 'react-icons/bi';
import { RiGalleryFill } from 'react-icons/ri';
import { MdCamera } from 'react-icons/md';
import { FaArrowRight } from 'react-icons/fa6';
import heroMain from '../allimages/groombride.jpg';
import heroAccent from '../allimages/engage.jpg';
import heroDetail from '../allimages/bride shoot.jpg';
import ScrollRevealText from '../animations/ScrollRevealText';
import ParallaxImage from '../animations/ParallaxImage';
import FadeInUp from '../animations/FadeInUp';
import StaggerGrid from '../animations/StaggerGrid';
import { useLenis } from '../animations/LenisProvider';

const HomePage = () => {
	const { ref: lenisRef } = useLenis() || {};

	useEffect(() => {
		document.title = 'Home Page - SP';
		const lenis = lenisRef?.current;
		if (lenis) {
			lenis.scrollTo(0, { immediate: true });
		} else {
			window.scrollTo(0, 0);
		}
	}, [lenisRef]);

	return (
		<div className="relative overflow-hidden bg-gradient-to-tl from-purple-200 to-blue-200 pb-6 sm:pb-8 lg:pb-12">
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
			<div className="mx-auto max-w-screen-2xl px-4 text-gray-700 md:px-8 lg:pt-8">
				<section className="relative my-6 mb-16 overflow-hidden md:my-10 md:mb-24">
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
							<FadeInUp>
								<span className="mb-4 inline-flex items-center justify-center gap-2 self-center rounded-full border border-purple-200 bg-white/70 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-purple-800 shadow-sm backdrop-blur-sm lg:self-start">
									<MdCamera className="text-base" />
									Professional Photography Studio
								</span>
							</FadeInUp>

							<h1 className="mb-4 text-4xl font-bold leading-tight text-gray-900 sm:text-5xl lg:text-6xl">
								<FadeInUp delay={0.05}>
									Capture Your{' '}
									<span className="bg-gradient-to-r from-purple-700 to-blue-600 bg-clip-text text-transparent">
										Moments
									</span>{' '}
									with Us
								</FadeInUp>
							</h1>

							<p className="mx-auto mb-8 max-w-xl text-justify text-base font-medium leading-relaxed text-gray-600 sm:text-lg lg:mx-0 lg:text-left">
								<ScrollRevealText
									text="From weddings and engagements to birthdays and corporate events — our team turns every frame into a memory you will cherish forever."
								/>
							</p>

							<FadeInUp delay={0.15} className="flex flex-col gap-3 sm:flex-row sm:justify-center lg:justify-start">
								<Link
									to="/shutterpics-online-booking"
									className="group inline-flex items-center justify-center gap-2 rounded-xl bg-purple-600 px-6 py-3 text-center font-semibold text-white shadow-lg shadow-purple-500/25 transition hover:bg-purple-700 hover:shadow-purple-500/40"
								>
									Book your slot now
									<FaArrowRight className="text-sm transition-transform duration-300 group-hover:rotate-[-45deg] group-hover:translate-x-0.5" />
								</Link>
								<Link
									to="/shutterpics-gallery"
									className="group inline-flex items-center justify-center gap-2 rounded-xl border-2 border-purple-300 bg-white/80 px-6 py-3 text-center font-semibold text-purple-800 backdrop-blur-sm transition hover:border-purple-400 hover:bg-white"
								>
									View gallery
									<RiGalleryFill className="text-lg transition-transform duration-300 group-hover:scale-110" />
								</Link>
							</FadeInUp>

							<StaggerGrid
								className="mt-10 grid grid-cols-3 gap-4 border-t border-purple-200/80 pt-8"
								stagger={0.12}
							>
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
							</StaggerGrid>
						</div>

						<FadeInUp delay={0.1} className="relative mx-auto w-full max-w-lg lg:max-w-none">
							<div className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-white/60 bg-gray-900 shadow-2xl shadow-purple-900/10 ring-1 ring-purple-100">
								<ParallaxImage
									src={heroMain}
									alt="Wedding couple portrait by ShutterPics"
									speed={0.06}
									layer={1}
									loading="eager"
									containerClassName="absolute inset-0 h-full w-full"
								/>
								<div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-purple-950/40 via-transparent to-transparent" />
								<div className="absolute bottom-4 left-4 rounded-lg bg-white/90 px-3 py-2 text-sm font-semibold text-gray-800 shadow-md backdrop-blur-sm">
									Weddings &amp; Engagements
								</div>
							</div>

							<div className="absolute -left-4 top-8 hidden h-28 w-24 overflow-hidden rounded-xl border-2 border-white bg-gray-900 shadow-xl sm:block md:h-32 md:w-28 lg:-left-8">
								<ParallaxImage
									src={heroAccent}
									alt="Engagement photoshoot"
									speed={0.1}
									layer={1.2}
									containerClassName="absolute inset-0 h-full w-full"
								/>
							</div>

							<div className="absolute -right-2 bottom-12 hidden h-32 w-28 overflow-hidden rounded-xl border-2 border-white bg-gray-900 shadow-xl sm:block md:h-36 md:w-32 lg:-right-6">
								<ParallaxImage
									src={heroDetail}
									alt="Bridal portrait"
									speed={0.1}
									layer={1.2}
									containerClassName="absolute inset-0 h-full w-full"
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
						</FadeInUp>
					</div>
				</section>

				<ShowcaseSection />

				<About embedded />

				<TeamSection />

				<FeedbackSection />
			</div>
		</div>
	);
};

export default HomePage;
