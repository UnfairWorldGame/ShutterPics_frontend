import React, { useContext, useEffect, useState } from 'react';
import authContext from '../context/auth/authContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import apiList from '../libs/apiList';
import { months } from '../libs/GenerateData';
import { Helmet } from 'react-helmet';

const Profile = () => {
	useEffect(() => {
		window.scrollTo(0, 0);
		document.title = 'User Profile - SP';
	}, []);

	const context = useContext(authContext);
	const { user, getUser, logout } = context;

	const [slots, setSlots] = useState([]);
	const [date, setDate] = useState([]);
	const [loading, setLoading] = useState(true);

	const navigate = useNavigate(null);

	useEffect(() => {
		if (!localStorage.getItem('authtoken')) {
			toast.error('Please get logged in first.');
			navigate('/');
			return;
		}

		const loadProfile = async () => {
			await getUser();
			await getSlots();
			setLoading(false);
		};

		loadProfile();
		// eslint-disable-next-line
	}, []);

	const getSlots = async () => {
		try {
			const response = await fetch(apiList.myslot, {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
					authtoken: localStorage.getItem('authtoken')
				}
			});

			if (response.status === 401) {
				logout();
				navigate('/');
				return;
			}

			const json = await response.json();

			if (json.success) {
				const date = json.data.map((data) => {
					return new Date(data.bookingdate);
				});

				setDate(date);
				setSlots(json.data);
			}
		} catch (err) {
			toast.warn('Unable to fetch booking data.');
		}
	};

	const handleLogout = () => {
		logout();
		toast.success('Logged out successfully');
		navigate('/');
	};

	if (loading) {
		return (
			<div className="flex min-h-[60vh] items-center justify-center bg-gradient-to-tl from-purple-200 to-blue-200">
				<p className="text-lg font-medium text-gray-700">Loading profile...</p>
			</div>
		);
	}

	return (
		<div className="min-h-screen flex flex-col space-y-16 items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-tl from-purple-200 to-blue-200 text-gray-700">
			<Helmet>
				<title>
					ShutterPics Profile: Professional Photography Services | Top-Rated Photoshoots |
					Videography | Music Video Production | Trusted Photography Studio
				</title>
				<meta
					name="description"
					content="Photography Services, Photoshoots, Wedding Photography, Event Photography, Videography, Music Videos, Portrait Photography, Commercial Photography, Product Photography, Studio Rental"
				/>
			</Helmet>
			<div
				className={`max-w-md w-full space-y-2 shadow-lg shadow-gray-400 rounded-xl p-4 pb-8 bg-white/20 relative`}
			>
				<div className="flex flex-col space-y-4 items-center justify-center">
					<div className="w-20 h-20 rounded-full overflow-hidden">
						<img
							src="https://static.vecteezy.com/system/resources/previews/005/544/718/non_2x/profile-icon-design-free-vector.jpg"
							alt="Profile"
							className="w-full h-full object-cover"
						/>
					</div>
					<div className="text-xl font-bold">{user?.name || 'Guest'}</div>
				</div>
				<div className="">
					<div className="font-semibold">
						Contact Number : <span className="font-normal">{user?.contactnum || '—'}</span>
					</div>
					<div className="font-semibold">
						Address : <span className="font-normal">{user?.address || '—'}</span>
					</div>
				</div>
				<div className="text-center pt-4">
					<div
						onClick={handleLogout}
						className="bg-purple-500 hover:bg-purple-600 py-2 px-3 rounded-lg w-32 text-white mx-auto cursor-pointer"
					>
						Logout
					</div>
				</div>
			</div>

			<div className="">
				{slots.length > 0 ? (
					<>
						<div className="">
							<h1 className="text-xl font-semibold mb-2 text-center">Your booking details</h1>
							<div
								className={`grid grid-cols-1 ${
									slots.length > 1 && 'md:grid-cols-2'
								} items-center justify-center`}
							>
								{slots.map((data, idx) => {
									return (
										<div
											key={idx}
											className="bg-gradient-to-tl from-purple-300 to-blue-300 m-3 rounded-lg overflow-hidden p-3"
										>
											<div className="text-center font-semibold text-xl">
												<span className="font-semibold"></span> {date[idx].getDate()}{' '}
												{months[date[idx].getMonth()]}, {date[idx].getFullYear()}
											</div>
											<div>
												<span className="font-semibold">Event : </span> {data.eventname}
											</div>
											<div>
												<span className="font-semibold">Time Slot : </span> {data.timeslot}
											</div>
											<div>
												<span className="font-semibold">Booked On :</span> {data.currdate}
											</div>
											<div>
												<span className="font-semibold">Total Amount :</span> {data.prize}
											</div>
										</div>
									);
								})}
							</div>
						</div>
					</>
				) : (
					<>
						<div className="text-xl font-semibold">You haven&apos;t booked any dates yet.</div>
					</>
				)}
			</div>
		</div>
	);
};

export default Profile;
