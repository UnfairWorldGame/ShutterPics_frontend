import React from 'react';
import { BiSolidStar } from 'react-icons/bi';
import { HiOutlineChatBubbleLeftRight } from 'react-icons/hi2';
import { getInitials } from '../libs/featuredReviews';

const avatarGradients = [
	'from-purple-500 to-violet-600',
	'from-blue-500 to-indigo-600',
	'from-pink-500 to-rose-600',
	'from-amber-500 to-orange-600',
	'from-teal-500 to-cyan-600',
	'from-fuchsia-500 to-purple-600'
];

export const StarRating = ({ rating, size = 'base' }) => {
	const sizeClass = size === 'sm' ? 'text-sm' : 'text-base';
	return (
		<span className={`flex items-center gap-0.5 ${sizeClass}`}>
			{[0, 1, 2, 3, 4].map((i) => (
				<BiSolidStar
					key={i}
					className={rating > i ? 'text-yellow-400' : 'text-gray-300'}
				/>
			))}
		</span>
	);
};

const ReviewCard = ({ review, index = 0, compact = false }) => {
	const rating = review.rating ?? review.rate ?? 0;
	const feedback = review.feedback ?? review.about ?? '';
	const gradient = avatarGradients[index % avatarGradients.length];

	return (
		<article
			className={`flex h-full flex-col rounded-2xl border border-white/80 bg-white p-5 shadow-lg shadow-purple-900/5 ring-1 ring-purple-100 transition duration-300 hover:-translate-y-0.5 hover:shadow-xl ${
				compact ? '' : 'sm:p-6'
			}`}
		>
			<HiOutlineChatBubbleLeftRight
				className="mb-3 text-2xl text-purple-300"
				aria-hidden="true"
			/>
			<p className="mb-5 flex-1 text-sm leading-relaxed text-gray-600 sm:text-[15px]">
				&ldquo;{feedback}&rdquo;
			</p>
			<div className="flex items-center gap-3 border-t border-purple-100 pt-4">
				<div
					className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gradient-to-br ${gradient} text-sm font-bold text-white shadow-md`}
					aria-hidden="true"
				>
					{getInitials(review.name)}
				</div>
				<div className="min-w-0 flex-1">
					<p className="truncate font-semibold text-gray-900">{review.name}</p>
					{review.event && (
						<p className="text-xs font-medium text-purple-600">{review.event}</p>
					)}
				</div>
				<StarRating rating={rating} size="sm" />
			</div>
		</article>
	);
};

export default ReviewCard;
