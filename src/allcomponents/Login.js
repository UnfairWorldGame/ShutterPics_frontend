import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import apiList from '../libs/apiList';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { BiSolidLogInCircle } from 'react-icons/bi';
import authContext from '../context/auth/authContext';
import { Helmet } from 'react-helmet';
import AuthLayout, { authInputClass } from './AuthLayout';

const Login = () => {
	const { setIsLoggedin, getUser } = useContext(authContext);
	const navigate = useNavigate();

	const [form, setForm] = useState({ email: '', password: '' });
	const [loading, setLoading] = useState(false);
	const [showPassword, setShowPassword] = useState(false);

	useEffect(() => {
		document.title = 'Login - ShutterPics';
		if (localStorage.getItem('authtoken')) navigate('/');
	}, [navigate]);

	const handleChange = (key, value) => setForm((prev) => ({ ...prev, [key]: value }));

	const handleLogin = async (e) => {
		e.preventDefault();

		if (!form.email || !form.password) {
			return toast.warn('Please enter your email and password');
		}
		if (loading) return;

		try {
			setLoading(true);
			const response = await fetch(apiList.login, {
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
				toast.success(json.message);
				navigate(json.type === 'admin' ? '/admin/profile' : '/shutterpics-profile');
			} else {
				toast.error(json.message);
			}
		} catch {
			toast.warn('Unable to sign in. Please try again.');
		} finally {
			setLoading(false);
		}
	};

	return (
		<>
			<Helmet>
				<title>Login - ShutterPics</title>
				<meta
					name="description"
					content="Sign in to your ShutterPics account to book photography sessions and manage your profile."
				/>
			</Helmet>

			<AuthLayout
				title="Welcome back"
				subtitle="Sign in to book dates, view your profile, and manage your photography sessions with ShutterPics."
				footer={
					<>
						Don&apos;t have an account?{' '}
						<Link
							to="/shutterpics-signup"
							className="font-semibold text-purple-700 hover:text-purple-900"
						>
							Create one free
						</Link>
					</>
				}
			>
				<form onSubmit={handleLogin} className="space-y-5">
					<div>
						<label htmlFor="email" className="text-sm font-semibold text-gray-700">
							Email address
						</label>
						<input
							type="email"
							id="email"
							autoComplete="email"
							required
							className={authInputClass}
							placeholder="you@example.com"
							value={form.email}
							onChange={(e) => handleChange('email', e.target.value)}
						/>
					</div>

					<div>
						<div className="flex items-center justify-between">
							<label htmlFor="password" className="text-sm font-semibold text-gray-700">
								Password
							</label>
							<Link
								to="/reset/password"
								className="text-xs font-semibold text-purple-600 hover:text-purple-800"
							>
								Forgot password?
							</Link>
						</div>
						<div className="relative">
							<input
								id="password"
								type={showPassword ? 'text' : 'password'}
								autoComplete="current-password"
								required
								className={`${authInputClass} pr-11`}
								placeholder="Enter your password"
								value={form.password}
								onChange={(e) => handleChange('password', e.target.value)}
							/>
							<button
								type="button"
								className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
								onClick={() => setShowPassword(!showPassword)}
								aria-label={showPassword ? 'Hide password' : 'Show password'}
							>
								{showPassword ? <FaEye /> : <FaEyeSlash />}
							</button>
						</div>
					</div>

					<button
						type="submit"
						disabled={loading}
						className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-purple-600 to-violet-600 py-3 text-sm font-semibold text-white shadow-lg shadow-purple-300/30 transition hover:from-purple-700 hover:to-violet-700 disabled:opacity-70"
					>
						<BiSolidLogInCircle className="text-lg" />
						Sign In
						{loading && <AiOutlineLoading3Quarters className="animate-spin" aria-hidden="true" />}
					</button>
				</form>

				<p className="mt-6 text-center text-xs text-gray-500">
					New here?{' '}
					<Link to="/shutterpics-online-services" className="font-medium text-purple-600 hover:underline">
						Browse our packages
					</Link>{' '}
					before creating an account.
				</p>
			</AuthLayout>
		</>
	);
};

export default Login;
