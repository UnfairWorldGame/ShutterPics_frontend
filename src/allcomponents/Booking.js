import React, { useContext, useEffect, useState } from 'react';
import Calendar from './Calendar';
import { toast } from 'react-toastify';
import apiList from '../libs/apiList';
import authContext from '../context/auth/authContext';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { months } from '../libs/GenerateData';
import { BsBookmarkCheckFill, BsBookmarkStar } from 'react-icons/bs';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { Helmet } from 'react-helmet';
import { MdAccessTime, MdEvent, MdCalendarToday } from 'react-icons/md';
import { RiHealthBookFill } from 'react-icons/ri';
import { BiSolidLogInCircle } from 'react-icons/bi';

const allEvents = [
	{ evName: 'Ring Ceremony Package (1 day)', prize: '35,000' },
	{ evName: 'Wedding Photography Package (1 day)', prize: '55,000' },
	{
		evName: 'Birthday / Ring Ceremony / Reception Package (1 day)',
		prize: '20,000'
	},
	{ evName: 'Wedding Photography Package (3 day)', prize: '1,20,000' }
];

const timeSlots = ['Morning', 'Afternoon', 'Evening', 'Night'];

const Booking = () => {
	const context = useContext(authContext);
	const { isLoggedin, user } = context;

	const navigate = useNavigate();
	const { state } = useLocation();

	const [bookedDate, setBookedDate] = useState(null);
	const [open, setOpen] = useState(false);
	const [openMessage, setOpenMessage] = useState(false);
	const [spinSingUpLoading, setSpinSingUpLoading] = useState(false);
	const [isClicked, setIsClicked] = useState(false);
	const [eventName, setEventName] = useState(allEvents[0]);
	const [timeSlot, setTimeSlot] = useState('Morning');

	useEffect(() => {
		window.scrollTo(0, 0);
		document.title = 'Booking Page - SP';

		if (state) {
			setEventName(allEvents[state.eventIdx]);
		}
		// eslint-disable-next-line
	}, []);

	useEffect(() => {
		if (open || openMessage) {
			document.body.classList.add('modal-open');
		} else {
			document.body.classList.remove('modal-open');
		}

		return () => {
			document.body.classList.remove('modal-open');
		};
	}, [open, openMessage]);

	const handleDetails = () => {
		if (isLoggedin) {
			if (!bookedDate) {
				return toast.warn('Please choose a booking date from the calendar.');
			}
			setOpen(true);
		} else {
			toast.info('Please log in to complete your booking.');
			navigate('/shutterpics-login');
		}
	};

	const handleBooking = async () => {
		if (!user?.name) {
			toast.warn('Profile not loaded. Please try again.');
			return;
		}

		if (!isClicked) {
			setIsClicked(true);
			setSpinSingUpLoading(true);
			try {
				const response = await fetch(apiList.slotbooking, {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
						authtoken: localStorage.getItem('authtoken')
					},
					body: JSON.stringify({
						name: user?.name,
						contactnum: user?.contactnum,
						address: user?.address,
						bookingdate: bookedDate,
						timeslot: timeSlot,
						eventname: eventName.evName,
						prize: eventName.prize
					})
				});

				const json = await response.json();
				if (json.success) {
					toast.success('Your date has been booked successfully!');
					toast.success(json.message);
					setOpen(false);
					setOpenMessage(true);
					setIsClicked(false);
					setSpinSingUpLoading(false);
				} else {
					setIsClicked(false);
					setSpinSingUpLoading(false);
					toast.error(json.message);
				}
			} catch (err) {
				setIsClicked(false);
				setSpinSingUpLoading(false);
				toast.error('Internal server error occurred');
			}
		}
	};

	const handleClose = () => {
		setOpenMessage(false);
		navigate('/shutterpics-profile');
	};

	const handleCloseBooking = () => {
		if (!isClicked) {
			setOpen(false);
		}
	};

	const formattedDate = bookedDate
		? `${bookedDate.date()} ${months[bookedDate.month()]}, ${bookedDate.year()}`
		: null;

	return (
		<div className="relative overflow-hidden bg-gradient-to-tl from-purple-200 to-blue-200 pb-8 sm:pb-12 lg:pb-16">
			<Helmet>
				<title>
					ShutterPics Booking: Professional Photography Services | Top-Rated Photoshoots |
					Videography | Music Video Production | Trusted Photography Studio
				</title>
				<meta
					name="description"
					content="Photography Services, Photoshoots, Wedding Photography, Event Photography, Videography, Music Videos, Portrait Photography, Commercial Photography, Product Photography, Studio Rental"
				/>
			</Helmet>

			<div
				aria-hidden="true"
				className="pointer-events-none absolute -right-24 top-0 h-72 w-72 rounded-full bg-purple-400/20 blur-3xl"
			/>

			<div className="relative mx-auto max-w-screen-2xl px-4 pt-6 text-gray-700 md:px-8 lg:pt-10">
				<div className="mb-10 text-center">
					<span className="mb-4 inline-flex items-center gap-2 rounded-full border border-purple-200 bg-white/70 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-purple-800 shadow-sm backdrop-blur-sm">
						<RiHealthBookFill className="text-base" />
						Online Booking
					</span>
					<h1 className="mb-3 text-3xl font-bold text-gray-900 sm:text-4xl lg:text-5xl">
						Book Your{' '}
						<span className="bg-gradient-to-r from-purple-700 to-blue-600 bg-clip-text text-transparent">
							Perfect Day
						</span>
					</h1>
					<p className="mx-auto max-w-2xl text-base font-medium leading-relaxed text-gray-600 sm:text-lg">
						Choose your package, pick a date, and reserve your session in a few simple steps.
					</p>
				</div>

				{!isLoggedin && (
					<div className="mb-8 flex flex-col items-start justify-between gap-3 rounded-xl border border-amber-200 bg-amber-50/90 px-4 py-4 sm:flex-row sm:items-center sm:px-6">
						<p className="text-sm font-medium text-amber-900 sm:text-base">
							Log in to confirm your booking and track it from your profile.
						</p>
						<Link
							to="/shutterpics-login"
							className="inline-flex shrink-0 items-center gap-2 rounded-lg bg-amber-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-amber-600"
						>
							Log in
							<BiSolidLogInCircle />
						</Link>
					</div>
				)}

				<div className="grid gap-8 lg:grid-cols-5 lg:gap-10">
					<div className="space-y-6 lg:col-span-2">
						<div className="rounded-2xl border border-white/60 bg-white/80 p-5 shadow-lg shadow-purple-900/5 backdrop-blur-sm sm:p-6">
							<div className="mb-4 flex items-center gap-2">
								<MdEvent className="text-xl text-purple-600" />
								<h2 className="text-lg font-bold text-gray-900">Select Package</h2>
							</div>
							<div className="space-y-3">
								{allEvents.map((data, idx) => {
									const isSelected = eventName.evName === data.evName;
									return (
										<button
											key={idx}
											type="button"
											onClick={() => setEventName(data)}
											className={`w-full rounded-xl border-2 p-4 text-left transition ${
												isSelected
													? 'border-purple-500 bg-purple-50 shadow-sm ring-1 ring-purple-200'
													: 'border-gray-200 bg-white hover:border-purple-300 hover:bg-purple-50/50'
											}`}
										>
											<p className="font-semibold text-gray-900">{data.evName}</p>
											<p className="mt-1 text-lg font-bold text-purple-700">₹{data.prize}</p>
										</button>
									);
								})}
							</div>
						</div>

						<div className="rounded-2xl border border-white/60 bg-white/80 p-5 shadow-lg shadow-purple-900/5 backdrop-blur-sm sm:p-6">
							<div className="mb-4 flex items-center gap-2">
								<MdAccessTime className="text-xl text-purple-600" />
								<h2 className="text-lg font-bold text-gray-900">Time Slot</h2>
							</div>
							<div className="grid grid-cols-2 gap-2 sm:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
								{timeSlots.map((slot) => (
									<button
										key={slot}
										type="button"
										onClick={() => setTimeSlot(slot)}
										className={`rounded-xl px-3 py-2.5 text-sm font-semibold transition ${
											timeSlot === slot
												? 'bg-purple-600 text-white shadow-md shadow-purple-500/25'
												: 'border border-gray-200 bg-white text-gray-700 hover:border-purple-300 hover:bg-purple-50'
										}`}
									>
										{slot}
									</button>
								))}
							</div>
						</div>

						<div className="rounded-2xl border border-purple-200 bg-gradient-to-br from-purple-600 to-blue-600 p-5 text-white shadow-xl shadow-purple-900/20 sm:p-6">
							<h2 className="mb-4 text-lg font-bold">Booking Summary</h2>
							<ul className="space-y-3 text-sm sm:text-base">
								<li className="flex items-start gap-3">
									<MdEvent className="mt-0.5 shrink-0 text-purple-200" />
									<span>{eventName.evName}</span>
								</li>
								<li className="flex items-center gap-3">
									<span className="font-bold text-purple-100">₹{eventName.prize}</span>
								</li>
								<li className="flex items-center gap-3">
									<MdAccessTime className="shrink-0 text-purple-200" />
									<span>{timeSlot}</span>
								</li>
								<li className="flex items-center gap-3">
									<MdCalendarToday className="shrink-0 text-purple-200" />
									<span>{formattedDate || 'No date selected yet'}</span>
								</li>
							</ul>
						</div>
					</div>

					<div className="lg:col-span-3">
						<div className="rounded-2xl border border-white/60 bg-white/80 p-5 shadow-lg shadow-purple-900/5 backdrop-blur-sm sm:p-6">
							<div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
								<div>
									<h2 className="text-lg font-bold text-gray-900">Pick a Date</h2>
									<p className="text-sm text-gray-500">
										Select an available date from the calendar below.
									</p>
								</div>
								{formattedDate && (
									<div className="inline-flex items-center gap-2 self-start rounded-full bg-green-50 px-4 py-2 text-sm font-semibold text-green-700 ring-1 ring-green-200 sm:self-auto">
										<span className="h-2 w-2 rounded-full bg-green-500" />
										{formattedDate}
									</div>
								)}
							</div>

							<Calendar setBookedDate={setBookedDate} bookedDate={bookedDate} />

							<div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
								<button
									type="button"
									onClick={handleDetails}
									className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-purple-600 px-8 py-3.5 text-base font-semibold text-white shadow-lg shadow-purple-500/25 transition hover:bg-purple-700 hover:shadow-purple-500/40 sm:w-auto"
								>
									Confirm Booking
									<BsBookmarkStar className="text-lg" />
								</button>
								<p className="text-center text-xs text-gray-500 sm:text-sm">
									Deliverables arrive 30–45 days after final photo selection.
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>

			{/* Confirmation modal */}
			<section
				onClick={handleCloseBooking}
				className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-all duration-300 ${
					open
						? 'visible bg-black/60 backdrop-blur-sm'
						: 'invisible pointer-events-none bg-black/0'
				}`}
				role="dialog"
				aria-modal="true"
				aria-labelledby="confirm-booking-title"
			>
				<div
					className="w-full max-w-md"
					onClick={(e) => e.stopPropagation()}
				>
					<div
						className={`rounded-2xl bg-white p-6 shadow-2xl transition-all duration-200 sm:p-8 ${
							open ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
						}`}
					>
						<h2 id="confirm-booking-title" className="mb-1 text-xl font-bold text-gray-900">
							Confirm Your Booking
						</h2>
						<p className="mb-6 text-sm text-gray-500">
							Please review the details before confirming.
						</p>

						<div className="mb-6 space-y-3 rounded-xl bg-gray-50 p-4">
							{formattedDate && (
								<div className="flex justify-between gap-4 text-sm">
									<span className="font-medium text-gray-500">Date</span>
									<span className="font-semibold text-gray-900">{formattedDate}</span>
								</div>
							)}
							<div className="flex justify-between gap-4 text-sm">
								<span className="font-medium text-gray-500">Time slot</span>
								<span className="font-semibold text-gray-900">{timeSlot}</span>
							</div>
							<div className="flex justify-between gap-4 text-sm">
								<span className="shrink-0 font-medium text-gray-500">Package</span>
								<span className="text-right font-semibold text-gray-900">{eventName.evName}</span>
							</div>
							<div className="flex justify-between gap-4 border-t border-gray-200 pt-3 text-sm">
								<span className="font-medium text-gray-500">Total amount</span>
								<span className="text-lg font-bold text-purple-700">₹{eventName.prize}</span>
							</div>
						</div>

						<div className="flex gap-3">
							<button
								type="button"
								onClick={handleCloseBooking}
								disabled={isClicked}
								className="flex-1 rounded-xl border border-gray-300 bg-white py-2.5 text-sm font-semibold text-gray-700 transition hover:bg-gray-50 disabled:opacity-50"
							>
								Cancel
							</button>
							<button
								type="button"
								onClick={handleBooking}
								disabled={isClicked}
								className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-purple-600 py-2.5 text-sm font-semibold text-white transition hover:bg-purple-700 disabled:opacity-70"
							>
								<span>Confirm</span>
								{spinSingUpLoading ? (
									<AiOutlineLoading3Quarters className="animate-spin" aria-hidden="true" />
								) : (
									<BsBookmarkStar />
								)}
							</button>
						</div>
					</div>
				</div>
			</section>

			{/* Success modal */}
			<section
				onClick={handleClose}
				className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-all duration-300 ${
					openMessage
						? 'visible bg-black/60 backdrop-blur-sm'
						: 'invisible pointer-events-none bg-black/0'
				}`}
				role="dialog"
				aria-modal="true"
				aria-labelledby="success-booking-title"
			>
				<div
					className="w-full max-w-md"
					onClick={(e) => e.stopPropagation()}
				>
					<div
						className={`rounded-2xl bg-white p-6 text-center shadow-2xl transition-all duration-200 sm:p-8 ${
							openMessage ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
						}`}
					>
						<div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
							<BsBookmarkCheckFill className="text-3xl text-green-600" />
						</div>

						<h2 id="success-booking-title" className="mb-2 text-xl font-bold text-gray-900">
							Booking Confirmed!
						</h2>

						{formattedDate && (
							<p className="mb-4 text-lg font-semibold text-purple-700">{formattedDate}</p>
						)}

						<p className="mb-6 text-sm leading-relaxed text-gray-600">
							Your date has been reserved successfully. Check your profile for booking details —
							our team will contact you soon for confirmation.
						</p>

						<button
							type="button"
							onClick={handleClose}
							className="w-full rounded-xl bg-purple-600 py-2.5 text-sm font-semibold text-white transition hover:bg-purple-700 sm:w-auto sm:px-10"
						>
							View Profile
						</button>
					</div>
				</div>
			</section>
		</div>
	);
};

export default Booking;
