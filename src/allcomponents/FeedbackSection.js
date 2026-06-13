import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { BiSolidStar } from 'react-icons/bi';
import { MdRateReview } from 'react-icons/md';
import { FaArrowRight } from 'react-icons/fa6';
import ReviewCard from './ReviewCard';
import apiList from '../libs/apiList';
import { featuredReviews, averageRating } from '../libs/featuredReviews';
import FadeInUp from '../animations/FadeInUp';
import StaggerGrid from '../animations/StaggerGrid';
import ScrollRevealText from '../animations/ScrollRevealText';

const normalizeReview = (item) => ({
	name: item.name,
	event: item.event || 'Client Review',
	rating: item.rating ?? item.rate ?? 5,
	feedback: item.feedback ?? item.about ?? ''
});

const FeedbackSection = ({ limit = 6 }) => {
	const [reviews, setReviews] = useState(featuredReviews.map(normalizeReview));

	useEffect(() => {
		const fetchReviews = async () => {
			try {
				const response = await fetch(apiList.getfeedback);
				const json = await response.json();
				if (json.success && json.ratings?.length) {
					const fromApi = json.ratings.map((r) =>
						normalizeReview({
							name: r.name,
							feedback: r.feedback,
							rating: r.rate,
							event: 'Verified Client'
						})
					);
					setReviews([...fromApi, ...featuredReviews.map(normalizeReview)]);
				}
			} catch {
				// keep featured reviews on failure
			}
		};
		fetchReviews();
	}, []);

	const displayed = reviews.slice(0, limit);
	const avg = averageRating(reviews);

	return (
		<section id="reviews" className="relative border-t border-purple-200/80 py-12 md:py-16">
			<div
				aria-hidden="true"
				className="pointer-events-none absolute -right-16 top-8 h-56 w-56 rounded-full bg-purple-400/15 blur-3xl"
			/>

			<div className="relative mx-auto max-w-6xl">
				<FadeInUp className="mb-10 flex flex-col items-center text-center md:mb-12">
					<span className="mb-4 inline-flex items-center gap-2 rounded-full border border-purple-200 bg-white/70 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-purple-800 shadow-sm backdrop-blur-sm">
						<MdRateReview className="text-base" />
						Client Stories
					</span>
					<h2 className="mb-4 text-3xl font-bold text-gray-900 sm:text-4xl lg:text-5xl">
						What Our{' '}
						<span className="bg-gradient-to-r from-purple-700 to-blue-600 bg-clip-text text-transparent">
							Clients Say
						</span>
					</h2>
					<p className="max-w-2xl text-base font-medium leading-relaxed text-gray-600 sm:text-lg">
						<ScrollRevealText text="Real feedback from weddings, engagements, birthdays, and corporate events across Uttar Pradesh and beyond." />
					</p>
				</FadeInUp>

				<StaggerGrid
					className="mb-10 flex flex-col items-center justify-center gap-4 rounded-2xl border border-white/60 bg-white/70 p-6 shadow-lg shadow-purple-900/5 backdrop-blur-sm ring-1 ring-purple-100 sm:flex-row sm:gap-10 sm:p-8"
					stagger={0.12}
				>
					<div className="text-center">
						<p className="flex items-center justify-center gap-1 text-4xl font-bold text-purple-700">
							{avg}
							<BiSolidStar className="text-yellow-400" />
						</p>
						<p className="mt-1 text-sm font-medium text-gray-500">Average rating</p>
					</div>
					<div className="hidden h-12 w-px bg-purple-200 sm:block" />
					<div className="text-center">
						<p className="text-4xl font-bold text-purple-700">{reviews.length}+</p>
						<p className="mt-1 text-sm font-medium text-gray-500">Happy clients featured</p>
					</div>
					<div className="hidden h-12 w-px bg-purple-200 sm:block" />
					<div className="text-center">
						<p className="text-4xl font-bold text-purple-700">500+</p>
						<p className="mt-1 text-sm font-medium text-gray-500">Events covered</p>
					</div>
				</StaggerGrid>

				<StaggerGrid className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3" stagger={0.08}>
					{displayed.map((review, idx) => (
						<ReviewCard key={`${review.name}-${idx}`} review={review} index={idx} />
					))}
				</StaggerGrid>

				<FadeInUp delay={0.1} className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
					<Link
						to="/rateus"
						className="group inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-purple-600 to-violet-600 px-8 py-3 text-sm font-semibold text-white shadow-lg shadow-purple-300/30 transition hover:from-purple-700 hover:to-violet-700"
					>
						Read All Reviews &amp; Rate Us
						<FaArrowRight className="text-xs transition-transform duration-300 group-hover:rotate-[-45deg] group-hover:translate-x-0.5" />
					</Link>
					<Link
						to="/shutterpics-online-booking"
						className="group inline-flex items-center justify-center gap-2 rounded-full border border-purple-300 bg-white/80 px-8 py-3 text-sm font-semibold text-purple-800 transition hover:bg-white"
					>
						Book Your Event
						<FaArrowRight className="text-xs transition-transform duration-300 group-hover:rotate-[-45deg] group-hover:translate-x-0.5" />
					</Link>
				</FadeInUp>
			</div>
		</section>
	);
};

export default FeedbackSection;
