import React, { useContext, useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import apiList from '../libs/apiList';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { MdSwitchAccount } from 'react-icons/md';
import authContext from '../context/auth/authContext';
import { Helmet } from 'react-helmet';
import AuthLayout, { authInputClass } from './AuthLayout';

const Signup = () => {
	const { setIsLoggedin, getUser } = useContext(authContext);
	const navigate = useNavigate();
	const resendTimerRef = useRef(null);

	const [form, setForm] = useState({
		name: '',
		email: '',
		password: '',
		confPassword: '',
		contactnum: '',
		address: '',
		otp: '',
		type: 'customer'
	});

	const [loading, setLoading] = useState(false);
	const [showPassword, setShowPassword] = useState(false);
	const [otpSent, setOtpSent] = useState(false);
	const [resendReady, setResendReady] = useState(false);
	const [countdown, setCountdown] = useState(0);

	useEffect(() => {
		document.title = 'Sign Up - ShutterPics';
		if (localStorage.getItem('authtoken')) navigate('/');
		return () => {
			if (resendTimerRef.current) clearInterval(resendTimerRef.current);
		};
	}, [navigate]);

	const startCountdown = () => {
		setResendReady(false);
		setCountdown(120);
		if (resendTimerRef.current) clearInterval(resendTimerRef.current);
		resendTimerRef.current = setInterval(() => {
			setCountdown((prev) => {
				if (prev <= 1) {
					clearInterval(resendTimerRef.current);
					setResendReady(true);
					return 0;
				}
				return prev - 1;
			});
		}, 1000);
	};

	const handleChange = (key, value) => setForm((prev) => ({ ...prev, [key]: value }));

	const validateStepOne = () => {
		if (
			!form.name ||
			!form.email ||
			!form.contactnum ||
			!form.address ||
			!form.password ||
			!form.confPassword
		) {
			toast.warn('Please fill in all fields');
			return false;
		}
		if (form.password.length < 6) {
			toast.warn('Password must be at least 6 characters');
			return false;
		}
		if (form.password !== form.confPassword) {
			toast.warn('Passwords do not match');
			return false;
		}
		return true;
	};

	const handleSendOtp = async (e) => {
		e.preventDefault();
		if (!validateStepOne() || loading) return;

		try {
			setLoading(true);
			const response = await fetch(apiList.usersignup, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(form)
			});

			const json = await response.json();
			if (json.success) {
				setOtpSent(true);
				startCountdown();
				toast.success(`OTP sent to ${form.email}`);
			} else {
				toast.error(json.message);
			}
		} catch {
			toast.warn('Unable to send OTP. Please try again.');
		} finally {
			setLoading(false);
		}
	};

	const handleVerifyOtp = async (e) => {
		e.preventDefault();
		if (!form.otp) {
			return toast.warn('Please enter the OTP from your email');
		}
		if (loading) return;

		try {
			setLoading(true);
			const response = await fetch(apiList.verifyotp, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(form)
			});

			const json = await response.json();
			if (json.success) {
				localStorage.setItem('authtoken', json.authtoken);
				localStorage.setItem('type', json.type);
				setIsLoggedin(true);
				getUser();
				toast.success('Welcome to the ShutterPics family!');
				navigate('/shutterpics-profile');
			} else {
				toast.error(json.message);
			}
		} catch {
			toast.warn('Verification failed. Please try again.');
		} finally {
			setLoading(false);
		}
	};

	const handleResendOtp = async () => {
		if (!resendReady || loading) return;
		setForm((prev) => ({ ...prev, otp: '' }));
		await handleSendOtp({ preventDefault: () => {} });
	};

	const formatCountdown = (secs) => {
		const m = Math.floor(secs / 60);
		const s = secs % 60;
		return `${m}:${s.toString().padStart(2, '0')}`;
	};

	return (
		<>
			<Helmet>
				<title>Sign Up - ShutterPics</title>
				<meta
					name="description"
					content="Create a ShutterPics account to book wedding and event photography, manage bookings, and leave reviews."
				/>
			</Helmet>

			<AuthLayout
				title="Create your account"
				subtitle="Join ShutterPics to book photography sessions online, track your bookings, and share your experience."
				footer={
					<>
						Already have an account?{' '}
						<Link
							to="/shutterpics-login"
							className="font-semibold text-purple-700 hover:text-purple-900"
						>
							Sign in
						</Link>
					</>
				}
			>
				{/* Step indicator */}
				<div className="mb-6 flex items-center gap-3">
					<div
						className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold ${
							!otpSent ? 'bg-purple-600 text-white' : 'bg-green-500 text-white'
						}`}
					>
						{otpSent ? '✓' : '1'}
					</div>
					<div className={`h-0.5 flex-1 ${otpSent ? 'bg-purple-400' : 'bg-gray-200'}`} />
					<div
						className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold ${
							otpSent ? 'bg-purple-600 text-white' : 'bg-gray-200 text-gray-500'
						}`}
					>
						2
					</div>
					<span className="text-xs font-medium text-gray-500">
						{otpSent ? 'Verify email' : 'Your details'}
					</span>
				</div>

				<form onSubmit={otpSent ? handleVerifyOtp : handleSendOtp} className="space-y-4">
					<div className="grid gap-4 sm:grid-cols-2">
						<div className="sm:col-span-2 sm:grid sm:grid-cols-2 sm:gap-4">
							<div>
								<label htmlFor="name" className="text-sm font-semibold text-gray-700">
									Full Name
								</label>
								<input
									id="name"
									type="text"
									autoComplete="name"
									required
									disabled={otpSent}
									className={authInputClass}
									placeholder="Your name"
									value={form.name}
									onChange={(e) => handleChange('name', e.target.value)}
								/>
							</div>
							<div>
								<label htmlFor="contact" className="text-sm font-semibold text-gray-700">
									Phone Number
								</label>
								<input
									id="contact"
									type="tel"
									autoComplete="tel"
									required
									disabled={otpSent}
									className={authInputClass}
									placeholder="10-digit number"
									value={form.contactnum}
									onChange={(e) => handleChange('contactnum', e.target.value)}
								/>
							</div>
						</div>

						<div className="sm:col-span-2">
							<label htmlFor="address" className="text-sm font-semibold text-gray-700">
								Address
							</label>
							<input
								id="address"
								type="text"
								autoComplete="street-address"
								required
								disabled={otpSent}
								className={authInputClass}
								placeholder="City or full address"
								value={form.address}
								onChange={(e) => handleChange('address', e.target.value)}
							/>
						</div>

						<div className="sm:col-span-2">
							<label htmlFor="email" className="text-sm font-semibold text-gray-700">
								Email Address
							</label>
							<input
								id="email"
								type="email"
								autoComplete="email"
								required
								disabled={otpSent}
								className={authInputClass}
								placeholder="you@example.com"
								value={form.email}
								onChange={(e) => handleChange('email', e.target.value)}
							/>
						</div>

						<div>
							<label htmlFor="password" className="text-sm font-semibold text-gray-700">
								Password
							</label>
							<div className="relative">
								<input
									id="password"
									type={showPassword ? 'text' : 'password'}
									autoComplete="new-password"
									required
									disabled={otpSent}
									className={`${authInputClass} pr-11`}
									placeholder="Min. 6 characters"
									value={form.password}
									onChange={(e) => handleChange('password', e.target.value)}
								/>
								{!otpSent && (
									<button
										type="button"
										className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
										onClick={() => setShowPassword(!showPassword)}
										aria-label="Toggle password visibility"
									>
										{showPassword ? <FaEye /> : <FaEyeSlash />}
									</button>
								)}
							</div>
						</div>

						<div>
							<label htmlFor="confirmPassword" className="text-sm font-semibold text-gray-700">
								Confirm Password
							</label>
							<input
								id="confirmPassword"
								type="password"
								autoComplete="new-password"
								required
								disabled={otpSent}
								className={authInputClass}
								placeholder="Re-enter password"
								value={form.confPassword}
								onChange={(e) => handleChange('confPassword', e.target.value)}
							/>
						</div>
					</div>

					{otpSent && (
						<div className="rounded-xl border border-purple-200 bg-purple-50 p-4">
							<label htmlFor="otp" className="text-sm font-semibold text-purple-900">
								Enter OTP
							</label>
							<p className="mt-0.5 text-xs text-purple-700">
								Check your inbox at <strong>{form.email}</strong>. Code expires in 2 minutes.
							</p>
							<input
								id="otp"
								type="text"
								inputMode="numeric"
								maxLength={4}
								required
								className={`${authInputClass} mt-2 tracking-[0.4em] text-center text-lg font-bold`}
								placeholder="••••"
								value={form.otp}
								onChange={(e) => handleChange('otp', e.target.value.replace(/\D/g, ''))}
							/>
							<div className="mt-2 flex items-center justify-between text-xs">
								{countdown > 0 ? (
									<span className="text-gray-500">Resend in {formatCountdown(countdown)}</span>
								) : (
									<span className="text-gray-500">OTP may have expired</span>
								)}
								<button
									type="button"
									onClick={handleResendOtp}
									disabled={!resendReady || loading}
									className="font-semibold text-purple-700 disabled:cursor-not-allowed disabled:opacity-40"
								>
									Resend OTP
								</button>
							</div>
						</div>
					)}

					<button
						type="submit"
						disabled={loading}
						className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-purple-600 to-violet-600 py-3 text-sm font-semibold text-white shadow-lg shadow-purple-300/30 transition hover:from-purple-700 hover:to-violet-700 disabled:opacity-70"
					>
						<MdSwitchAccount className="text-lg" />
						{otpSent ? 'Verify & Create Account' : 'Send OTP'}
						{loading && <AiOutlineLoading3Quarters className="animate-spin" aria-hidden="true" />}
					</button>
				</form>
			</AuthLayout>
		</>
	);
};

export default Signup;
