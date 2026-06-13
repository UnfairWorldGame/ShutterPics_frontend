import React, { useContext, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { BiSolidStar } from 'react-icons/bi';
import { MdRateReview } from 'react-icons/md';
import { toast } from 'react-toastify';
import apiList from '../libs/apiList';
import { useNavigate } from 'react-router-dom';
import authContext from '../context/auth/authContext';
import ReviewCard from './ReviewCard';
import { featuredReviews, averageRating } from '../libs/featuredReviews';

const normalizeReview = (item) => ({
	name: item.name,
	event: item.event || 'Client Review',
	rating: item.rating ?? item.rate ?? 5,
	feedback: item.feedback ?? item.about ?? ''
});

const Ratings = () => {
	const context = useContext(authContext);
	const { user } = context;
	const navigate = useNavigate(null);

	const [open, setOpen] = useState(false);
	const [feedData, setFeedData] = useState(featuredReviews.map(normalizeReview));
	const [ratingDetails, setratingDetails] = useState({
		name: '',
		feedback: '',
		rate: 0
	});
	const [spinSingUpLoading, setSpinSingUpLoading] = useState(false);
	const [isClicked, setIsClicked] = useState(false);

	useEffect(() => {
		document.title = 'Rate Us - ShutterPics';
		getFeedbacks();
		// eslint-disable-next-line
	}, []);

	useEffect(() => {
		if (user?.name) {
			setratingDetails((prev) => ({ ...prev, name: user.name }));
		}
	}, [user]);

	useEffect(() => {
		if (open) {
			document.body.classList.add('modal-open');
		} else {
			document.body.classList.remove('modal-open');
		}
		return () => document.body.classList.remove('modal-open');
	}, [open]);

	const handleOpen = () => {
		if (localStorage.getItem('authtoken')) {
			setOpen(true);
		} else {
			toast.warn('Please log in first to leave a review');
			navigate('/shutterpics-login');
		}
	};

	const handleClose = () => setOpen(false);

	const handleOnChange = (key, value) => {
		setratingDetails({ ...ratingDetails, [key]: value });
	};

	const handleRate = (idx) => {
		setratingDetails({ ...ratingDetails, rate: idx + 1 });
	};

	const getFeedbacks = async () => {
		try {
			const response = await fetch(apiList.getfeedback, {
				method: 'GET',
				headers: { 'Content-Type': 'application/json' }
			});
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
				setFeedData([...fromApi, ...featuredReviews.map(normalizeReview)]);
			}
		} catch {
			toast.warn('Could not load latest reviews');
		}
	};

	const handleFeedback = async () => {
		if (!ratingDetails.feedback) {
			return toast.warn('Please write your feedback');
		}
		if (ratingDetails.rate === 0) {
			return toast.warn('Please select a star rating');
		}
		if (isClicked) return;

		try {
			setSpinSingUpLoading(true);
			setIsClicked(true);

			const response = await fetch(apiList.rateus, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					authtoken: localStorage.getItem('authtoken')
				},
				body: JSON.stringify({
					name: user?.name || ratingDetails.name,
					feedback: ratingDetails.feedback,
					rate: ratingDetails.rate
				})
			});

			const json = await response.json();
			if (json.success) {
				toast.success(json.message);
				setratingDetails({ name: user?.name || '', feedback: '', rate: 0 });
				setOpen(false);
				getFeedbacks();
			} else {
				toast.error(json.message);
			}
		} catch {
			toast.warn('Something went wrong. Please try again.');
		} finally {
			setSpinSingUpLoading(false);
			setIsClicked(false);
		}
	};

	const avg = averageRating(feedData);

	return (
		<div className="min-h-screen bg-gradient-to-tl from-purple-200 to-blue-200 pb-12 pt-8 text-gray-800">
			<Helmet>
				<title>Reviews & Ratings - ShutterPics</title>
				<meta
					name="description"
					content="Read client reviews for ShutterPics wedding, event, and portrait photography. Share your experience and rate our studio."
				/>
			</Helmet>

			<div className="mx-auto max-w-6xl px-4 md:px-8">
				<div className="mb-10 flex flex-col items-center text-center">
					<span className="mb-4 inline-flex items-center gap-2 rounded-full border border-purple-200 bg-white/70 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-purple-800 shadow-sm">
						<MdRateReview className="text-base" />
						Your Voice Matters
					</span>
					<h1 className="mb-3 text-3xl font-bold text-gray-900 sm:text-4xl">
						Reviews &amp;{' '}
						<span className="bg-gradient-to-r from-purple-700 to-blue-600 bg-clip-text text-transparent">
							Ratings
						</span>
					</h1>
					<p className="max-w-xl text-base text-gray-600">
						See what couples, families, and businesses say about working with ShutterPics — and
						share your own experience after your shoot.
					</p>
				</div>

				<div className="mb-8 flex flex-col items-center justify-between gap-4 rounded-2xl border border-white/60 bg-white/80 p-6 shadow-lg ring-1 ring-purple-100 sm:flex-row">
					<div className="flex items-center gap-6">
						<div className="text-center">
							<p className="flex items-center gap-1 text-3xl font-bold text-purple-700">
								{avg}
								<BiSolidStar className="text-yellow-400" />
							</p>
							<p className="text-xs font-medium text-gray-500">Average rating</p>
						</div>
						<div className="h-10 w-px bg-purple-200" />
						<div className="text-center">
							<p className="text-3xl font-bold text-purple-700">{feedData.length}</p>
							<p className="text-xs font-medium text-gray-500">Reviews shown</p>
						</div>
					</div>
					<button
						type="button"
						onClick={handleOpen}
						className="rounded-full bg-gradient-to-r from-purple-600 to-violet-600 px-6 py-3 text-sm font-semibold text-white shadow-lg transition hover:from-purple-700 hover:to-violet-700"
					>
						Write a Review
					</button>
				</div>

				<div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
					{feedData.map((data, idx) => (
						<ReviewCard key={`${data.name}-${idx}`} review={data} index={idx} />
					))}
				</div>
			</div>

			<div
				onClick={handleClose}
				className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition ${
					open ? 'visible bg-black/60' : 'invisible bg-transparent'
				}`}
				role="dialog"
				aria-modal="true"
				aria-labelledby="feedback-title"
			>
				<div className="w-full max-w-md" onClick={(e) => e.stopPropagation()}>
					<div
						className={`rounded-2xl bg-white p-6 shadow-2xl transition ${
							open ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
						}`}
					>
						<h2 id="feedback-title" className="mb-1 text-center text-2xl font-bold text-gray-900">
							Share Your Experience
						</h2>
						<p className="mb-6 text-center text-sm text-gray-500">
							How was your shoot with ShutterPics?
						</p>

						<div className="mb-4 flex justify-center gap-1">
							{[0, 1, 2, 3, 4].map((idx) => (
								<button
									key={idx}
									type="button"
									onClick={() => handleRate(idx)}
									className="rounded p-1 transition hover:scale-110"
									aria-label={`Rate ${idx + 1} stars`}
								>
									<BiSolidStar
										size={32}
										className={
											ratingDetails.rate > idx ? 'text-yellow-400' : 'text-gray-300'
										}
									/>
								</button>
							))}
						</div>

						<textarea
							id="feedback"
							name="feedback"
							required
							placeholder="Tell us about your wedding, event, or photoshoot experience..."
							className="mb-4 h-32 w-full resize-none rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-900 placeholder-gray-400 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-200"
							value={ratingDetails.feedback}
							onChange={(e) => handleOnChange('feedback', e.target.value)}
						/>

						<button
							type="button"
							onClick={handleFeedback}
							disabled={spinSingUpLoading}
							className="flex w-full items-center justify-center gap-2 rounded-xl bg-purple-600 py-3 text-sm font-semibold text-white transition hover:bg-purple-700 disabled:opacity-70"
						>
							Submit Review
							{spinSingUpLoading && (
								<AiOutlineLoading3Quarters className="animate-spin" aria-hidden="true" />
							)}
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Ratings;
