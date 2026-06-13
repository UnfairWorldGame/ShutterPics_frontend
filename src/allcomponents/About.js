import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { LOGO_SRC } from '../constants/brand';
import shutter from '../allimages/shutter.jpg';
import heroAccent from '../allimages/engage.jpg';
import heroMain from '../allimages/groombride.jpg';
import heroDetail from '../allimages/bride shoot.jpg';
import { Helmet } from 'react-helmet';
import { BiSolidStar } from 'react-icons/bi';
import { BsBookmarkCheckFill } from 'react-icons/bs';
import { MdCamera, MdGroups, MdVerified, MdLocationOn, MdCelebration } from 'react-icons/md';
import { HiSparkles } from 'react-icons/hi2';
import { RiHeartFill, RiGalleryFill } from 'react-icons/ri';
import { FaArrowRight } from 'react-icons/fa6';
import FadeInUp from '../animations/FadeInUp';
import ParallaxImage from '../animations/ParallaxImage';
import ScrollRevealText from '../animations/ScrollRevealText';
import StaggerGrid from '../animations/StaggerGrid';

const stats = [
	{ value: '6+', label: 'Years Experience' },
	{ value: '500+', label: 'Events Covered' },
	{ value: '5', label: 'Client Rated', star: true }
];

const values = [
	{
		icon: HiSparkles,
		title: 'Creative Vision',
		description:
			'Every shoot is approached with fresh eyes — we find the angles, light, and moments that make your story uniquely yours.'
	},
	{
		icon: MdVerified,
		title: 'Quality First',
		description:
			'From Sony & DSLR gear to meticulous editing, we deliver polished photos and videos you will be proud to share.'
	},
	{
		icon: RiHeartFill,
		title: 'Personal Touch',
		description:
			'We listen, guide, and adapt — whether it is a quiet family portrait or a grand wedding celebration.'
	}
];

const highlights = [
	{ icon: MdCelebration, label: 'Weddings & engagements' },
	{ icon: MdCamera, label: 'Candid & portrait shoots' },
	{ icon: RiGalleryFill, label: 'Events & celebrations' },
	{ icon: MdVerified, label: 'Photo + video delivery' }
];

const AboutContent = ({ embedded = false }) => (
	<section
		id={embedded ? 'about' : undefined}
		className={`relative ${embedded ? 'py-12 md:py-16 border-t border-purple-200/80' : 'py-8 md:py-12'}`}
	>
		<div
			aria-hidden="true"
			className="pointer-events-none absolute -right-16 top-0 h-56 w-56 rounded-full bg-purple-400/20 blur-3xl"
		/>
		<div
			aria-hidden="true"
			className="pointer-events-none absolute -left-12 bottom-24 h-48 w-48 rounded-full bg-blue-400/15 blur-3xl"
		/>

		{/* Header */}
		<div className="relative mb-10 flex flex-col items-center text-center md:mb-14">
			<span className="mb-4 inline-flex items-center gap-2 rounded-full border border-purple-200 bg-white/70 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-purple-800 shadow-sm backdrop-blur-sm">
				<MdGroups className="text-base" />
				Our Story
			</span>
			<h1 className="mb-4 text-3xl font-bold text-gray-900 sm:text-4xl lg:text-5xl">
				About{' '}
				<span className="bg-gradient-to-r from-purple-700 to-blue-600 bg-clip-text text-transparent">
					ShutterPics
				</span>
			</h1>
			<p className="max-w-3xl text-base font-medium leading-relaxed text-gray-600 sm:text-lg text-justify md:text-center">
				We capture life&apos;s most precious moments with creativity and care. Founded by{' '}
				<span className="font-semibold text-purple-800">Aniket Rajput</span>, a passionate
				photographer with over 6 years of experience, our mission is to preserve your memories for
				a lifetime.
			</p>
		</div>

		{/* Stats */}
		<div className="relative mb-12 grid grid-cols-3 gap-4 rounded-2xl border border-white/60 bg-white/70 p-6 shadow-lg shadow-purple-900/5 backdrop-blur-sm ring-1 ring-purple-100 md:mb-16 md:gap-8 md:p-8">
			{stats.map((stat) => (
				<div key={stat.label} className="text-center">
					<p className="flex items-center justify-center gap-0.5 text-2xl font-bold text-purple-700 sm:text-3xl">
						{stat.value}
						{stat.star && <BiSolidStar className="text-yellow-400" />}
					</p>
					<p className="mt-1 text-xs font-semibold uppercase tracking-wide text-gray-500 sm:text-sm">
						{stat.label}
					</p>
				</div>
			))}
		</div>

		{/* Who We Are */}
		<div className="relative mb-10 md:mb-14">
			<div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
				<FadeInUp className="relative order-2 mx-auto w-full max-w-md lg:order-1 lg:max-w-none">
					<div
						aria-hidden="true"
						className="pointer-events-none absolute -left-6 top-1/2 h-40 w-40 -translate-y-1/2 rounded-full bg-purple-400/20 blur-3xl"
					/>

					<div className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-white/70 bg-gray-900 shadow-2xl shadow-purple-900/15 ring-1 ring-purple-100">
						<ParallaxImage
							src={heroMain}
							alt="Wedding couple portrait by ShutterPics"
							speed={0.07}
							layer={1}
							containerClassName="absolute inset-0 h-full w-full"
						/>
						<div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-purple-950/55 via-purple-950/10 to-transparent" />

						<div className="absolute bottom-4 left-4 right-4 flex items-end justify-between gap-3">
							<div className="rounded-xl bg-white/90 px-3 py-2 shadow-md backdrop-blur-sm">
								<p className="text-xs font-semibold uppercase tracking-wide text-purple-700">
									Est. Farrukhabad
								</p>
								<p className="text-sm font-bold text-gray-900">6+ years creating memories</p>
							</div>
							<div className="flex h-14 w-14 items-center justify-center rounded-xl border border-white/80 bg-white/90 p-2 shadow-md backdrop-blur-sm">
								<img src={LOGO_SRC} alt="" className="h-full w-full object-contain" aria-hidden />
							</div>
						</div>
					</div>

					<div className="absolute -left-3 top-10 hidden h-28 w-24 overflow-hidden rounded-xl border-2 border-white bg-gray-900 shadow-xl sm:block lg:-left-6">
						<ParallaxImage
							src={heroAccent}
							alt="Engagement photoshoot"
							speed={0.12}
							layer={1.3}
							containerClassName="absolute inset-0 h-full w-full"
						/>
					</div>

					<div className="absolute -right-2 bottom-16 hidden h-32 w-28 overflow-hidden rounded-xl border-2 border-white bg-gray-900 shadow-xl sm:block lg:-right-5">
						<ParallaxImage
							src={heroDetail}
							alt="Bridal portrait"
							speed={0.1}
							layer={1.2}
							containerClassName="absolute inset-0 h-full w-full"
						/>
					</div>
				</FadeInUp>

				<div className="order-1 lg:order-2">
					<FadeInUp delay={0.05}>
						<span className="mb-4 inline-flex items-center gap-2 rounded-full border border-purple-200 bg-white/70 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-purple-800 shadow-sm backdrop-blur-sm">
							<MdGroups className="text-base" />
							Who We Are
						</span>
					</FadeInUp>

					<h2 className="mb-4 text-2xl font-bold leading-tight text-gray-900 sm:text-3xl lg:text-4xl">
						<FadeInUp delay={0.08}>
							A studio built on{' '}
							<span className="bg-gradient-to-r from-purple-700 to-blue-600 bg-clip-text text-transparent">
								passion, craft &amp; trust
							</span>
						</FadeInUp>
					</h2>

					<p className="mb-4 text-base leading-relaxed text-gray-600 sm:text-lg lg:text-left text-justify lg:text-left">
						<ScrollRevealText text="ShutterPics is a Farrukhabad-based photography and videography studio led by Aniket Rajput — turning weddings, celebrations, and everyday milestones into timeless visual stories." />
					</p>

					<p className="mb-6 text-base leading-relaxed text-gray-600 sm:text-lg text-justify lg:text-left">
						We don&apos;t just click photos. We plan with you, guide you on shoot day, and deliver
						polished albums and films you&apos;ll proudly share for years to come.
					</p>

					<StaggerGrid className="mb-8 grid grid-cols-1 gap-3 sm:grid-cols-2" stagger={0.07}>
						{highlights.map(({ icon: Icon, label }) => (
							<div
								key={label}
								className="flex items-center gap-3 rounded-xl border border-white/70 bg-white/75 px-4 py-3 shadow-sm ring-1 ring-purple-100 backdrop-blur-sm transition hover:shadow-md hover:shadow-purple-900/5"
							>
								<span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-purple-100 to-blue-100 text-purple-700">
									<Icon className="text-lg" />
								</span>
								<span className="text-sm font-semibold text-gray-800">{label}</span>
							</div>
						))}
					</StaggerGrid>

					<FadeInUp delay={0.2} className="flex flex-wrap items-center gap-4">
						<span className="inline-flex items-center gap-1.5 text-sm font-medium text-gray-500">
							<MdLocationOn className="text-purple-600" />
							Farrukhabad, Uttar Pradesh
						</span>
						<span className="inline-flex items-center gap-1 text-sm font-semibold text-purple-700">
							<BiSolidStar className="text-yellow-400" />
							5.0 client rated
						</span>
					</FadeInUp>

					<FadeInUp delay={0.25} className="mt-6 flex flex-col gap-3 sm:flex-row">
						<Link
							to={embedded ? '/shutterpics-about' : '/shutterpics-online-booking'}
							className="group inline-flex items-center justify-center gap-2 rounded-xl bg-purple-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-purple-500/25 transition hover:bg-purple-700"
						>
							{embedded ? 'Our full story' : 'Book a session'}
							<FaArrowRight className="text-xs transition-transform duration-300 group-hover:rotate-[-45deg] group-hover:translate-x-0.5" />
						</Link>
						<Link
							to="/shutterpics-online-services"
							className="group inline-flex items-center justify-center gap-2 rounded-xl border-2 border-purple-300 bg-white/80 px-6 py-3 text-sm font-semibold text-purple-800 transition hover:border-purple-400 hover:bg-white"
						>
							View services
							<FaArrowRight className="text-xs transition-transform duration-300 group-hover:rotate-[-45deg] group-hover:translate-x-0.5" />
						</Link>
					</FadeInUp>
				</div>
			</div>
		</div>

		{/* Story block 2 */}
		<div className="relative mb-12 grid items-center gap-8 lg:grid-cols-2 lg:gap-12 md:mb-16">
			<div>
				<h2 className="mb-3 text-2xl font-bold text-gray-900 sm:text-3xl">Our Journey</h2>
				<p className="text-justify leading-relaxed text-gray-600 sm:text-lg">
					Our journey began with a simple love for photography. Over the years, this passion has
					grown into a thriving business dedicated to helping clients celebrate and remember their
					most important occasions.
				</p>
				<p className="mt-4 text-justify leading-relaxed text-gray-600 sm:text-lg">
					From intimate family gatherings to grand weddings and corporate events, we bring a unique
					blend of artistry, professionalism, and personal touch to every shoot — delivering
					images you will treasure for a lifetime.
				</p>
			</div>
			<div className="relative mx-auto w-full max-w-md lg:max-w-none">
				<div className="overflow-hidden rounded-2xl border border-white/60 shadow-2xl shadow-purple-900/10 ring-1 ring-purple-100">
					<img
						src={shutter}
						alt="ShutterPics photographer at work"
						className="aspect-[4/3] h-full w-full object-cover transition duration-700 hover:scale-105"
					/>
				</div>
				<div className="absolute -bottom-4 -left-4 hidden h-24 w-20 overflow-hidden rounded-xl border-2 border-white shadow-lg sm:block md:h-28 md:w-24">
					<img src={heroAccent} alt="Engagement photoshoot" className="h-full w-full object-cover" />
				</div>
			</div>
		</div>

		{/* Values */}
		<div className="relative mb-12 md:mb-16">
			<div className="mb-8 text-center">
				<h2 className="text-2xl font-bold text-gray-900 sm:text-3xl">What We Stand For</h2>
				<p className="mx-auto mt-2 max-w-2xl text-gray-600">
					Three principles guide every project we take on.
				</p>
			</div>
			<div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
				{values.map(({ icon: Icon, title, description }) => (
					<div
						key={title}
						className="rounded-2xl border border-white/60 bg-white/80 p-6 shadow-md shadow-purple-900/5 backdrop-blur-sm ring-1 ring-purple-100 transition hover:shadow-lg hover:shadow-purple-900/10"
					>
						<div className="mb-4 inline-flex rounded-xl bg-gradient-to-br from-purple-100 to-blue-100 p-3 text-purple-700">
							<Icon className="text-2xl" />
						</div>
						<h3 className="mb-2 text-lg font-bold text-gray-900">{title}</h3>
						<p className="text-sm leading-relaxed text-gray-600 sm:text-base">{description}</p>
					</div>
				))}
			</div>
		</div>

		{/* Founder + CTA */}
		<div className="relative flex flex-col items-center gap-8 lg:flex-row lg:items-stretch lg:gap-10">
			<div className="flex-1 rounded-2xl border border-purple-200/80 bg-gradient-to-br from-purple-50 to-blue-50 p-6 text-center shadow-md ring-1 ring-purple-100 sm:p-8 lg:text-left">
				<div className="mb-3 inline-flex items-center gap-2 rounded-full bg-white/80 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-purple-700">
					<MdCamera />
					Founder
				</div>
				<h3 className="mb-2 text-xl font-bold text-gray-900 sm:text-2xl">Aniket Rajput</h3>
				<p className="leading-relaxed text-gray-600">
					With a camera in hand and a passion for storytelling, Aniket built ShutterPics around one
					idea — that every person deserves beautiful, honest photographs of the moments that matter
					most.
				</p>
			</div>

			<div className="flex flex-1 flex-col items-center justify-center rounded-2xl border border-white/60 bg-white/80 p-6 text-center shadow-lg shadow-purple-900/5 backdrop-blur-sm ring-1 ring-purple-100 sm:p-8">
				<p className="mb-6 max-w-sm leading-relaxed text-gray-700">
					Thank you for considering{' '}
					<span className="font-bold text-purple-800">ShutterPics</span> for your photography
					needs. We look forward to creating beautiful memories with you.
				</p>
				<div className="flex flex-col gap-3 sm:flex-row">
					<Link
						to="/shutterpics-online-booking"
						className="inline-flex items-center justify-center gap-2 rounded-xl bg-purple-600 px-6 py-3 font-semibold text-white shadow-lg shadow-purple-500/25 transition hover:bg-purple-700 hover:shadow-purple-500/40"
					>
						Book a session
						<BsBookmarkCheckFill className="text-lg" />
					</Link>
					<Link
						to="/shutterpics-contact"
						className="inline-flex items-center justify-center gap-2 rounded-xl border-2 border-purple-300 bg-white px-6 py-3 font-semibold text-purple-800 transition hover:border-purple-400 hover:bg-purple-50"
					>
						Get in touch
					</Link>
				</div>
			</div>
		</div>
	</section>
);

const About = ({ embedded = false }) => {
	useEffect(() => {
		if (!embedded) {
			window.scrollTo(0, 0);
		}
	}, [embedded]);

	if (embedded) {
		return <AboutContent embedded />;
	}

	return (
		<div className="bg-gradient-to-tl from-purple-200 to-blue-200 pb-6 sm:pb-8 lg:pb-12">
			<Helmet>
				<title>
					About ShutterPics | Professional Photography &amp; Videography Studio in Farrukhabad
				</title>
				<meta
					name="description"
					content="Learn about ShutterPics — founded by Aniket Rajput with 6+ years of experience in wedding, event, portrait, and commercial photography across Farrukhabad and beyond."
				/>
			</Helmet>
			<div className="mx-auto max-w-screen-2xl px-4 text-gray-700 md:px-8 lg:pt-4">
				<AboutContent />
			</div>
		</div>
	);
};

export default About;
