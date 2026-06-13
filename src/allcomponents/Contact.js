import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { IoLogoWhatsapp } from 'react-icons/io';
import { BiSolidPhoneCall } from 'react-icons/bi';
import { MdContactMail, MdEmail, MdLocationOn, MdAccessTime, MdCamera } from 'react-icons/md';
import { HiOutlinePaperAirplane } from 'react-icons/hi2';
import { BsBookmarkCheckFill } from 'react-icons/bs';
import { toast } from 'react-toastify';
import apiList from '../libs/apiList';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { Helmet } from 'react-helmet';

const contactDetails = [
	{
		icon: BiSolidPhoneCall,
		label: 'Phone',
		value: '+91 91259 07656',
		href: 'tel:+919125907656',
		accent: 'bg-gray-100 text-gray-700 hover:bg-gray-200'
	},
	{
		icon: IoLogoWhatsapp,
		label: 'WhatsApp',
		value: 'Chat with us',
		href: 'https://wa.me/919125907656',
		external: true,
		accent: 'bg-green-50 text-green-700 hover:bg-green-100'
	},
	{
		icon: MdEmail,
		label: 'Email',
		value: 'shutterpicsstudio@gmail.com',
		href: 'mailto:shutterpicsstudio@gmail.com',
		accent: 'bg-purple-50 text-purple-700 hover:bg-purple-100'
	},
	{
		icon: MdLocationOn,
		label: 'Studio',
		value: 'Bazaria Nihal Chand, Farrukhabad, U.P. 209625',
		href: 'https://maps.google.com/?q=Bazaria+Nihal+Chand+Farrukhabad',
		external: true,
		accent: 'bg-blue-50 text-blue-700 hover:bg-blue-100'
	}
];

const inputClass =
	'mt-1.5 w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm text-gray-900 placeholder-gray-400 transition focus:border-purple-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-purple-200';

const Contact = () => {
	useEffect(() => {
		document.title = 'Contact Us - ShutterPics';
	}, []);

	const [isSubmitting, setIsSubmitting] = useState(false);
	const [showSuccess, setShowSuccess] = useState(false);

	const [contactInfo, setContactInfo] = useState({
		name: '',
		email: '',
		contactnum: '',
		address: '',
		message: ''
	});

	useEffect(() => {
		if (showSuccess) {
			document.body.classList.add('modal-open');
		} else {
			document.body.classList.remove('modal-open');
		}
		return () => document.body.classList.remove('modal-open');
	}, [showSuccess]);

	const handleOnChange = (key, value) => {
		setContactInfo((prev) => ({ ...prev, [key]: value }));
	};

	const handleSendMessage = async (e) => {
		e?.preventDefault();

		if (
			!contactInfo.name ||
			!contactInfo.email ||
			!contactInfo.contactnum ||
			!contactInfo.address ||
			!contactInfo.message
		) {
			return toast.warn('Please fill in all fields');
		}

		if (isSubmitting) return;

		try {
			setIsSubmitting(true);
			const response = await fetch(apiList.contactmessage, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(contactInfo)
			});

			const json = await response.json();
			if (json.success) {
				setContactInfo({
					name: '',
					email: '',
					contactnum: '',
					address: '',
					message: ''
				});
				setShowSuccess(true);
				toast.success(json.message || 'Message sent successfully!');
			} else {
				toast.error(json.message || 'Unable to send message');
			}
		} catch {
			toast.warn('Something went wrong. Please try again or call us directly.');
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<div className="min-h-screen bg-gradient-to-tl from-purple-200 to-blue-200 pb-12 pt-8 text-gray-800">
			<Helmet>
				<title>Contact Us - ShutterPics Photography Studio</title>
				<meta
					name="description"
					content="Contact ShutterPics for wedding, event, and portrait photography in Farrukhabad and across Uttar Pradesh. Call, WhatsApp, or send us a message."
				/>
			</Helmet>

			<div className="mx-auto max-w-6xl px-4 md:px-8">
				{/* Header */}
				<div className="relative mb-10 flex flex-col items-center text-center md:mb-14">
					<div
						aria-hidden="true"
						className="pointer-events-none absolute -right-10 top-0 h-48 w-48 rounded-full bg-purple-400/20 blur-3xl"
					/>
					<span className="mb-4 inline-flex items-center gap-2 rounded-full border border-purple-200 bg-white/70 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-purple-800 shadow-sm backdrop-blur-sm">
						<MdContactMail className="text-base" />
						Get In Touch
					</span>
					<h1 className="mb-4 text-3xl font-bold text-gray-900 sm:text-4xl lg:text-5xl">
						Contact{' '}
						<span className="bg-gradient-to-r from-purple-700 to-blue-600 bg-clip-text text-transparent">
							ShutterPics
						</span>
					</h1>
					<p className="max-w-2xl text-base font-medium leading-relaxed text-gray-600 sm:text-lg">
						Have a question about packages, availability, or a custom shoot? Reach out — we
						typically respond within 24 hours.
					</p>
				</div>

				{/* Quick actions */}
				<div className="mb-10 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:justify-center">
					<a
						href="tel:+919125907656"
						className="inline-flex items-center justify-center gap-2 rounded-full bg-gray-800 px-6 py-3 text-sm font-semibold text-white shadow-lg transition hover:bg-gray-900"
					>
						<BiSolidPhoneCall className="text-lg" />
						Call Now
					</a>
					<a
						href="https://wa.me/919125907656"
						target="_blank"
						rel="noopener noreferrer"
						className="inline-flex items-center justify-center gap-2 rounded-full bg-green-600 px-6 py-3 text-sm font-semibold text-white shadow-lg transition hover:bg-green-700"
					>
						<IoLogoWhatsapp className="text-lg" />
						WhatsApp Us
					</a>
					<Link
						to="/shutterpics-online-booking"
						className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-purple-600 to-violet-600 px-6 py-3 text-sm font-semibold text-white shadow-lg transition hover:from-purple-700 hover:to-violet-700"
					>
						<BsBookmarkCheckFill className="text-lg" />
						Book Online
					</Link>
				</div>

				<div className="grid gap-8 lg:grid-cols-5 lg:gap-10">
					{/* Contact info sidebar */}
					<div className="space-y-5 lg:col-span-2">
						<div className="rounded-2xl border border-white/80 bg-white p-6 shadow-lg shadow-purple-900/5 ring-1 ring-purple-100">
							<div className="mb-5 flex items-center gap-3">
								<div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-purple-600 to-violet-700 text-white">
									<MdCamera className="text-2xl" />
								</div>
								<div>
									<p className="font-bold text-gray-900">ShutterPics Studio</p>
									<p className="text-sm text-purple-600">shutterpics.in</p>
								</div>
							</div>

							<div className="space-y-3">
								{contactDetails.map((item) => {
									const Icon = item.icon;
									const Tag = item.href ? 'a' : 'div';
									const linkProps = item.href
										? {
												href: item.href,
												...(item.external
													? { target: '_blank', rel: 'noopener noreferrer' }
													: {})
											}
										: {};

									return (
										<Tag
											key={item.label}
											{...linkProps}
											className={`flex items-start gap-3 rounded-xl p-3 transition ${item.accent}`}
										>
											<Icon className="mt-0.5 shrink-0 text-xl" />
											<div className="min-w-0">
												<p className="text-xs font-semibold uppercase tracking-wide opacity-70">
													{item.label}
												</p>
												<p className="text-sm font-medium break-words">{item.value}</p>
											</div>
										</Tag>
									);
								})}
							</div>
						</div>

						<div className="rounded-2xl border border-white/80 bg-white/80 p-5 shadow-md ring-1 ring-purple-100">
							<div className="flex items-start gap-3">
								<MdAccessTime className="mt-0.5 shrink-0 text-xl text-purple-600" />
								<div>
									<p className="font-semibold text-gray-900">Response time</p>
									<p className="mt-1 text-sm text-gray-600">
										We reply to messages and WhatsApp within 24 hours. For urgent bookings,
										please call directly.
									</p>
								</div>
							</div>
						</div>

						<div className="rounded-2xl bg-gradient-to-br from-purple-600 to-violet-700 p-5 text-white shadow-xl">
							<p className="font-semibold">Prefer to book directly?</p>
							<p className="mt-1 text-sm text-purple-100">
								Skip the wait — pick your date and package online.
							</p>
							<Link
								to="/shutterpics-online-booking"
								className="mt-4 inline-flex rounded-full bg-white px-5 py-2 text-sm font-semibold text-purple-800 transition hover:bg-purple-50"
							>
								Go to Booking
							</Link>
						</div>
					</div>

					{/* Contact form */}
					<div className="lg:col-span-3">
						<div className="rounded-2xl border border-white/80 bg-white p-6 shadow-xl shadow-purple-900/5 ring-1 ring-purple-100 sm:p-8">
							<h2 className="mb-1 text-xl font-bold text-gray-900 sm:text-2xl">
								Send us a message
							</h2>
							<p className="mb-6 text-sm text-gray-500">
								Fill in your details and we&apos;ll get back to you about your event or enquiry.
							</p>

							<form onSubmit={handleSendMessage} className="space-y-5">
								<div className="grid gap-5 sm:grid-cols-2">
									<div>
										<label htmlFor="name" className="text-sm font-semibold text-gray-700">
											Full Name
										</label>
										<input
											type="text"
											id="name"
											required
											className={inputClass}
											placeholder="Your name"
											value={contactInfo.name}
											onChange={(e) => handleOnChange('name', e.target.value)}
										/>
									</div>
									<div>
										<label htmlFor="contact" className="text-sm font-semibold text-gray-700">
											Phone Number
										</label>
										<input
											type="tel"
											id="contact"
											required
											className={inputClass}
											placeholder="10-digit mobile number"
											value={contactInfo.contactnum}
											onChange={(e) => handleOnChange('contactnum', e.target.value)}
										/>
									</div>
								</div>

								<div className="grid gap-5 sm:grid-cols-2">
									<div>
										<label htmlFor="email" className="text-sm font-semibold text-gray-700">
											Email Address
										</label>
										<input
											type="email"
											id="email"
											required
											className={inputClass}
											placeholder="you@example.com"
											value={contactInfo.email}
											onChange={(e) => handleOnChange('email', e.target.value)}
										/>
									</div>
									<div>
										<label htmlFor="address" className="text-sm font-semibold text-gray-700">
											Your City / Address
										</label>
										<input
											type="text"
											id="address"
											required
											className={inputClass}
											placeholder="City or full address"
											value={contactInfo.address}
											onChange={(e) => handleOnChange('address', e.target.value)}
										/>
									</div>
								</div>

								<div>
									<label htmlFor="message" className="text-sm font-semibold text-gray-700">
										Message
									</label>
									<textarea
										id="message"
										required
										rows={5}
										className={`${inputClass} resize-none`}
										placeholder="Tell us about your event, preferred date, or any questions..."
										value={contactInfo.message}
										onChange={(e) => handleOnChange('message', e.target.value)}
									/>
								</div>

								<button
									type="submit"
									disabled={isSubmitting}
									className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-purple-600 to-violet-600 py-3.5 text-sm font-semibold text-white shadow-lg shadow-purple-300/30 transition hover:from-purple-700 hover:to-violet-700 disabled:opacity-70 sm:w-auto sm:min-w-[200px]"
								>
									<HiOutlinePaperAirplane className="text-lg" />
									Send Message
									{isSubmitting && (
										<AiOutlineLoading3Quarters className="animate-spin" aria-hidden="true" />
									)}
								</button>
							</form>
						</div>
					</div>
				</div>
			</div>

			{/* Success modal */}
			<div
				className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition ${
					showSuccess ? 'visible bg-black/60' : 'invisible bg-transparent'
				}`}
				onClick={() => setShowSuccess(false)}
				role="dialog"
				aria-modal="true"
			>
				<div
					className="w-full max-w-md rounded-2xl bg-white p-8 text-center shadow-2xl"
					onClick={(e) => e.stopPropagation()}
				>
					<div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-3xl">
						✓
					</div>
					<h3 className="text-xl font-bold text-gray-900">Message Sent!</h3>
					<p className="mt-2 text-sm leading-relaxed text-gray-600">
						Thank you for reaching out. Our team will contact you on the details you provided
						within 24 hours.
					</p>
					<div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
						<button
							type="button"
							onClick={() => setShowSuccess(false)}
							className="rounded-full bg-purple-600 px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-purple-700"
						>
							Got it
						</button>
						<Link
							to="/shutterpics-online-booking"
							className="rounded-full border border-purple-200 px-6 py-2.5 text-sm font-semibold text-purple-800 transition hover:bg-purple-50"
						>
							Book a Date
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Contact;
