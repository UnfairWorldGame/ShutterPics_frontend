import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import pic1 from '../allimages/bride shoot.jpg';
import pic2 from '../allimages/bride.jpg';
import pic3 from '../allimages/bride3.jpg';
import pic4 from '../allimages/bride4.jpg';
import pic5 from '../allimages/bride5.jpg';
import pic6 from '../allimages/demo.jpg';
import pic7 from '../allimages/engage.jpg';
import pic8 from '../allimages/groom.jpg';
import pic9 from '../allimages/groom2.jpg';
import pic10 from '../allimages/groombride.jpg';
import pic11 from '../allimages/the bride.jpg';
import pic12 from '../allimages/change1.jpg';
import pic13 from '../allimages/change2.jpg';
import pic14 from '../allimages/change3.jpg';
import pic15 from '../allimages/change4.jpg';
import pic16 from '../allimages/change5.jpg';
import pic17 from '../allimages/change6.jpg';
import pic18 from '../allimages/change7.jpg';
import pic19 from '../allimages/change8.jpg';
import { Helmet } from 'react-helmet';
import { RiGalleryFill, RiPlayCircleFill } from 'react-icons/ri';
import { BsBookmarkCheckFill } from 'react-icons/bs';
import { IoClose, IoChevronBack, IoChevronForward } from 'react-icons/io5';
import { MdCamera } from 'react-icons/md';
import { HiMagnifyingGlassPlus } from 'react-icons/hi2';
import LazyYouTubeShort from './LazyYouTubeShort';

const CATEGORIES = [
	{ id: 'all', label: 'All' },
	{ id: 'wedding', label: 'Weddings' },
	{ id: 'engagement', label: 'Engagement' },
	{ id: 'events', label: 'Events' }
];

const galleryImages = [
	{ src: pic10, alt: 'Wedding couple portrait', category: 'wedding' },
	{ src: pic7, alt: 'Engagement photoshoot', category: 'engagement' },
	{ src: pic1, alt: 'Bridal portrait session', category: 'wedding' },
	{ src: pic11, alt: 'Bride portrait', category: 'wedding' },
	{ src: pic2, alt: 'Wedding bride portrait', category: 'wedding' },
	{ src: pic3, alt: 'Bridal close-up', category: 'wedding' },
	{
		src: 'https://www.haringphotography.com/wp-content/uploads/2019/10/best-miami-wedding-photographers-12-1800x1200.jpg',
		alt: 'Wedding ceremony moment',
		category: 'wedding'
	},
	{ src: pic4, alt: 'Bride on wedding day', category: 'wedding' },
	{ src: pic5, alt: 'Bridal portrait outdoors', category: 'wedding' },
	{ src: pic8, alt: 'Groom portrait', category: 'wedding' },
	{ src: pic9, alt: 'Groom candid shot', category: 'wedding' },
	{ src: pic6, alt: 'Event photography demo', category: 'events' },
	{ src: pic12, alt: 'Event celebration', category: 'events' },
	{ src: pic13, alt: 'Special occasion capture', category: 'events' },
	{ src: pic14, alt: 'Event photography', category: 'events' },
	{ src: pic15, alt: 'Celebration moment', category: 'events' },
	{ src: pic16, alt: 'Event candid shot', category: 'events' },
	{ src: pic17, alt: 'Party photography', category: 'events' },
	{ src: pic18, alt: 'Event highlight', category: 'events' },
	{ src: pic19, alt: 'Occasion photography', category: 'events' }
];

const galleryVideos = [
	{
		title: 'Wedding Highlights',
		url: 'https://www.youtube.com/shorts/enIhIcWBzDI?feature=share'
	},
	{
		title: 'Cinematic Reel',
		url: 'https://youtube.com/shorts/dhHKwRVmt-E?si=NiV3Qd7uEYAwzUFc'
	},
	{
		title: 'Engagement Film',
		url: 'https://youtube.com/shorts/7IvLRphERj8?si=uXD3NIvE-_TomyhX'
	},
	{
		title: 'Event Videography',
		url: 'https://youtube.com/shorts/V9j107zm2lE?si=Qu3s_2qFOEVDyKfn'
	}
];

const GalleryItem = ({ image, onClick }) => (
	<button
		type="button"
		onClick={onClick}
		className="group relative mb-3 w-full break-inside-avoid overflow-hidden rounded-xl border border-white/60 bg-white shadow-md shadow-purple-900/5 ring-1 ring-purple-100 transition hover:shadow-xl hover:shadow-purple-900/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 md:mb-4"
	>
		<img
			src={image.src}
			alt={image.alt}
			loading="lazy"
			className="w-full object-cover transition duration-500 group-hover:scale-105"
		/>
		<div className="absolute inset-0 flex items-end bg-gradient-to-t from-purple-950/70 via-purple-950/10 to-transparent opacity-0 transition duration-300 group-hover:opacity-100 group-focus-visible:opacity-100">
			<div className="flex w-full items-center justify-between p-3 text-left text-white">
				<span className="text-sm font-medium sm:text-base">{image.alt}</span>
				<HiMagnifyingGlassPlus className="shrink-0 text-xl opacity-90" />
			</div>
		</div>
	</button>
);

const Gallery = () => {
	const [open, setOpen] = useState(false);
	const [activeIndex, setActiveIndex] = useState(0);
	const [activeCategory, setActiveCategory] = useState('all');

	const filteredImages = useMemo(() => {
		if (activeCategory === 'all') return galleryImages;
		return galleryImages.filter((img) => img.category === activeCategory);
	}, [activeCategory]);

	const openLightbox = (index) => {
		setActiveIndex(index);
		setOpen(true);
	};

	const closeLightbox = useCallback(() => setOpen(false), []);

	const goNext = useCallback(() => {
		setActiveIndex((prev) => (prev + 1) % filteredImages.length);
	}, [filteredImages.length]);

	const goPrev = useCallback(() => {
		setActiveIndex((prev) => (prev - 1 + filteredImages.length) % filteredImages.length);
	}, [filteredImages.length]);

	useEffect(() => {
		if (open) {
			document.body.classList.add('modal-open');
		} else {
			document.body.classList.remove('modal-open');
		}
		return () => document.body.classList.remove('modal-open');
	}, [open]);

	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	useEffect(() => {
		if (!open) return;
		const handleKeyDown = (e) => {
			if (e.key === 'Escape') closeLightbox();
			if (e.key === 'ArrowRight') goNext();
			if (e.key === 'ArrowLeft') goPrev();
		};
		window.addEventListener('keydown', handleKeyDown);
		return () => window.removeEventListener('keydown', handleKeyDown);
	}, [open, closeLightbox, goNext, goPrev]);

	useEffect(() => {
		if (activeIndex >= filteredImages.length) {
			setActiveIndex(0);
		}
	}, [activeIndex, filteredImages.length]);

	return (
		<div className="bg-gradient-to-tl from-purple-200 to-blue-200 pb-6 text-gray-700 sm:pb-8 lg:pb-12">
			<Helmet>
				<title>
					ShutterPics Gallery | Wedding, Engagement &amp; Event Photography Portfolio
				</title>
				<meta
					name="description"
					content="Browse the ShutterPics portfolio — wedding, engagement, and event photography plus cinematic videography reels from Farrukhabad's trusted studio."
				/>
			</Helmet>

			<div className="relative mx-auto max-w-screen-2xl px-4 md:px-8 lg:pt-4">
				<div
					aria-hidden="true"
					className="pointer-events-none absolute -right-16 top-0 h-56 w-56 rounded-full bg-purple-400/20 blur-3xl"
				/>
				<div
					aria-hidden="true"
					className="pointer-events-none absolute -left-12 top-48 h-48 w-48 rounded-full bg-blue-400/15 blur-3xl"
				/>

				{/* Header */}
				<header className="relative mb-8 flex flex-col items-center text-center md:mb-12">
					<span className="mb-4 inline-flex items-center gap-2 rounded-full border border-purple-200 bg-white/70 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-purple-800 shadow-sm backdrop-blur-sm">
						<RiGalleryFill className="text-base" />
						Our Portfolio
					</span>
					<h1 className="mb-4 text-3xl font-bold text-gray-900 sm:text-4xl lg:text-5xl">
						Photo{' '}
						<span className="bg-gradient-to-r from-purple-700 to-blue-600 bg-clip-text text-transparent">
							Gallery
						</span>
					</h1>
					<p className="max-w-3xl text-base font-medium leading-relaxed text-gray-600 sm:text-lg">
						A curated look at the moments we&apos;ve had the privilege to capture — weddings,
						engagements, celebrations, and everything in between.
					</p>
				</header>

				{/* Category filters */}
				<div className="relative mb-8 flex flex-wrap items-center justify-center gap-2 md:mb-10">
					{CATEGORIES.map(({ id, label }) => (
						<button
							key={id}
							type="button"
							onClick={() => setActiveCategory(id)}
							className={`rounded-full px-4 py-2 text-sm font-semibold transition focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 ${
								activeCategory === id
									? 'bg-purple-600 text-white shadow-lg shadow-purple-500/25'
									: 'border border-purple-200 bg-white/80 text-purple-800 hover:border-purple-300 hover:bg-white'
							}`}
						>
							{label}
						</button>
					))}
					<span className="ml-1 text-sm text-gray-500">
						{filteredImages.length} {filteredImages.length === 1 ? 'photo' : 'photos'}
					</span>
				</div>

				{/* Masonry grid */}
				<div className="relative columns-2 gap-3 md:columns-3 md:gap-4 lg:columns-4">
					{filteredImages.map((image, index) => (
						<GalleryItem key={`${image.src}-${index}`} image={image} onClick={() => openLightbox(index)} />
					))}
				</div>

				{filteredImages.length === 0 && (
					<p className="py-16 text-center text-gray-500">No photos in this category yet.</p>
				)}

				{/* Videos section */}
				<section className="relative mt-16 md:mt-20">
					<div className="mb-8 text-center">
						<span className="mb-3 inline-flex items-center gap-2 rounded-full border border-purple-200 bg-white/70 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-purple-800 shadow-sm backdrop-blur-sm">
							<RiPlayCircleFill className="text-base" />
							Videography
						</span>
						<h2 className="text-2xl font-bold text-gray-900 sm:text-3xl lg:text-4xl">
							Reels &amp; Cinematic Films
						</h2>
						<p className="mx-auto mt-2 max-w-2xl text-gray-600">
							Short-form reels and cinematic highlights from our videography work.
						</p>
					</div>

					<div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
						{galleryVideos.map((video) => (
							<div
								key={video.url}
								className="overflow-hidden rounded-2xl border border-white/60 bg-white/80 shadow-lg shadow-purple-900/5 ring-1 ring-purple-100 backdrop-blur-sm"
							>
								<div className="aspect-[9/16] w-full bg-gray-900">
									<LazyYouTubeShort url={video.url} title={video.title} />
								</div>
								<p className="px-4 py-3 text-center text-sm font-semibold text-gray-800">
									{video.title}
								</p>
							</div>
						))}
					</div>
				</section>

				{/* CTA */}
				<section className="relative mt-16 rounded-2xl border border-white/60 bg-white/80 p-8 text-center shadow-lg shadow-purple-900/5 ring-1 ring-purple-100 backdrop-blur-sm md:mt-20 md:p-10">
					<div className="mb-3 inline-flex rounded-xl bg-gradient-to-br from-purple-100 to-blue-100 p-3 text-purple-700">
						<MdCamera className="text-2xl" />
					</div>
					<h2 className="mb-2 text-xl font-bold text-gray-900 sm:text-2xl">
						Ready to create your own memories?
					</h2>
					<p className="mx-auto mb-6 max-w-lg text-gray-600">
						Book a session with ShutterPics and let us capture your next special moment.
					</p>
					<Link
						to="/shutterpics-online-booking"
						className="inline-flex items-center justify-center gap-2 rounded-xl bg-purple-600 px-6 py-3 font-semibold text-white shadow-lg shadow-purple-500/25 transition hover:bg-purple-700 hover:shadow-purple-500/40"
					>
						Book your slot
						<BsBookmarkCheckFill className="text-lg" />
					</Link>
				</section>
			</div>

			{/* Lightbox */}
			<div
				role="dialog"
				aria-modal="true"
				aria-label="Image preview"
				onClick={closeLightbox}
				className={`fixed inset-0 z-50 flex items-center justify-center transition-all duration-300 ${
					open ? 'visible bg-black/90 backdrop-blur-sm' : 'invisible bg-black/0'
				}`}
			>
				<button
					type="button"
					onClick={closeLightbox}
					aria-label="Close preview"
					className="absolute right-4 top-4 z-10 rounded-full bg-white/10 p-2 text-white transition hover:bg-white/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
				>
					<IoClose className="text-2xl" />
				</button>

				{filteredImages.length > 1 && (
					<>
						<button
							type="button"
							onClick={(e) => {
								e.stopPropagation();
								goPrev();
							}}
							aria-label="Previous image"
							className="absolute left-2 z-10 rounded-full bg-white/10 p-2 text-white transition hover:bg-white/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-white sm:left-4 sm:p-3"
						>
							<IoChevronBack className="text-2xl sm:text-3xl" />
						</button>
						<button
							type="button"
							onClick={(e) => {
								e.stopPropagation();
								goNext();
							}}
							aria-label="Next image"
							className="absolute right-2 z-10 rounded-full bg-white/10 p-2 text-white transition hover:bg-white/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-white sm:right-4 sm:p-3"
						>
							<IoChevronForward className="text-2xl sm:text-3xl" />
						</button>
					</>
				)}

				<div
					className="max-h-[85vh] max-w-[92vw] px-4 sm:max-w-[88vw]"
					onClick={(e) => e.stopPropagation()}
				>
					{filteredImages[activeIndex] && (
						<>
							<img
								src={filteredImages[activeIndex].src}
								alt={filteredImages[activeIndex].alt}
								className={`max-h-[75vh] w-auto rounded-lg object-contain shadow-2xl transition-all duration-300 ${
									open ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
								}`}
							/>
							<p className="mt-3 text-center text-sm text-white/90 sm:text-base">
								{filteredImages[activeIndex].alt}
								<span className="ml-2 text-white/60">
									{activeIndex + 1} / {filteredImages.length}
								</span>
							</p>
						</>
					)}
				</div>
			</div>
		</div>
	);
};

export default Gallery;
