import React, { useState } from 'react';
import AuthContext from './authContext';
import apiList from '../../libs/apiList';
import { toast } from 'react-toastify';

const AuthState = (props) => {
	const [isLoggedin, setIsLoggedin] = useState(false);
	const [user, setUser] = useState(null);

	const logout = () => {
		localStorage.removeItem('authtoken');
		localStorage.removeItem('type');
		setIsLoggedin(false);
		setUser(null);
	};

	const getUser = async () => {
		const authtoken = localStorage.getItem('authtoken');
		if (!authtoken) return null;

		try {
			const response = await fetch(apiList.getuser, {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
					authtoken
				}
			});

			if (response.status === 401) {
				logout();
				return null;
			}

			const json = await response.json();

			if (json.success) {
				setUser(json.data);
				return json.data;
			}
		} catch (err) {
			toast.warn('Unable to fetch user data.');
		}
		return null;
	};

	const checkAvailableDate = async () => {
		try {
			const response = await fetch(apiList.getslots, {
				method: 'GET'
			});

			const json = await response.json();
			if (json.success) {
				return json.data;
			}
			return [];
		} catch (err) {
			console.error(err);
			return [];
		}
	};

	return (
		<AuthContext.Provider
			value={{
				isLoggedin,
				setIsLoggedin,
				user,
				getUser,
				setUser,
				logout,
				checkAvailableDate
			}}
		>
			{props.children}
		</AuthContext.Provider>
	);
};

export default AuthState;
