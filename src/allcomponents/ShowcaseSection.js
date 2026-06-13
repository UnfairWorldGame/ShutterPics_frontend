import React from 'react';
import { Link } from 'react-router-dom';
import { RiGalleryFill } from 'react-icons/ri';
import { FaArrowRight } from 'react-icons/fa6';
import ParallaxImage from '../animations/ParallaxImage';
import ScrollRevealText from '../animations/ScrollRevealText';
import StaggerGrid from '../animations/StaggerGrid';
import FadeInUp from '../animations/FadeInUp';
import pic1 from '../allimages/bride shoot.jpg';
import pic2 from '../allimages/bride.jpg';
import pic3 from '../allimages/groombride.jpg';
import pic4 from '../allimages/engage.jpg';
import pic5 from '../allimages/change3.jpg';
import pic6 from '../allimages/change6.jpg';

const showcaseItems = [
	{ src: pic1, alt: 'Bridal portrait session', span: 'col-span-2 row-span-2', speed: 0.1, layer: 1 },
	{ src: pic2, alt: 'Wedding bride portrait', span: 'col-span-1 row-span-1', speed: 0.16, layer: 2 },
	{ src: pic3, alt: 'Couple portrait', span: 'col-span-1 row-span-1', speed: 0.14, layer: 1.5 },
	{ src: pic4, alt: 'Engagement photoshoot', span: 'col-span-1 row-span-2', speed: 0.12, layer: 2 },
	{ src: pic5, alt: 'Event celebration', span: 'col-span-1 row-span-1', speed: 0.18, layer: 1 },
	{ src: pic6, alt: 'Party photography', span: 'col-span-2 row-span-1', speed: 0.11, layer: 1.2 }
];

const ShowcaseSection = () => {
	return (
		<section id="showcase" className="relative border-t border-purple-200/80 py-14 md:py-20">
			<div
				aria-hidden="true"
				className="pointer-events-none absolute -left-24 top-20 h-72 w-72 rounded-full bg-purple-400/20 blur-3xl"
			/>
			<div
				aria-hidden="true"
				className="pointer-events-none absolute -right-20 bottom-10 h-64 w-64 rounded-full bg-blue-400/15 blur-3xl"
			/>

			<div className="relative mx-auto max-w-6xl">
				<FadeInUp className="mb-10 flex flex-col items-center text-center md:mb-14">
					<span className="mb-4 inline-flex items-center gap-2 rounded-full border border-purple-200 bg-white/70 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-purple-800 shadow-sm backdrop-blur-sm">
						<RiGalleryFill className="text-base" />
						Visual Stories
					</span>
					<h2 className="mb-4 max-w-3xl text-3xl font-bold text-gray-900 sm:text-4xl lg:text-5xl">
						<ScrollRevealText
							as="span"
							text="Moments frozen in light, emotion, and motion"
							className="leading-tight"
						/>
					</h2>
					<p className="max-w-2xl text-base font-medium leading-relaxed text-gray-600 sm:text-lg">
						Scroll through our signature frames — each photograph layered with depth as you move
						through the page.
					</p>
				</FadeInUp>

				<StaggerGrid
					className="grid auto-rows-[140px] grid-cols-2 gap-3 sm:auto-rows-[160px] sm:gap-4 md:grid-cols-4 md:auto-rows-[180px]"
					stagger={0.07}
				>
					{showcaseItems.map((item) => (
						<div
							key={item.alt}
							className={`group relative min-h-0 overflow-hidden rounded-2xl border border-white/70 bg-gray-900 shadow-lg shadow-purple-900/10 ring-1 ring-purple-100 ${item.span}`}
						>
							<ParallaxImage
								src={item.src}
								alt={item.alt}
								speed={item.speed}
								layer={item.layer}
								containerClassName="absolute inset-0 h-full w-full"
							/>
							<div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-purple-950/50 via-transparent to-transparent opacity-0 transition duration-500 group-hover:opacity-100" />
						</div>
					))}
				</StaggerGrid>

				<FadeInUp delay={0.2} className="mt-10 flex justify-center">
					<Link
						to="/shutterpics-gallery"
						className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-purple-600 to-violet-600 px-8 py-3.5 text-sm font-semibold text-white shadow-lg shadow-purple-300/30 transition hover:from-purple-700 hover:to-violet-700"
					>
						Explore full gallery
						<FaArrowRight className="text-sm transition-transform duration-300 group-hover:rotate-[-45deg] group-hover:translate-x-0.5" />
					</Link>
				</FadeInUp>
			</div>
		</section>
	);
};

export default ShowcaseSection;
