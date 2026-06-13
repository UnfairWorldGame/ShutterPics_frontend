import React, { useEffect, useState } from 'react';
import { generateDate, months } from '../libs/GenerateData';
import dayjs from 'dayjs';
import { GrFormNext, GrFormPrevious } from 'react-icons/gr';
import { toast } from 'react-toastify';
import apiList from '../libs/apiList';

const Calendar = ({ setBookedDate, bookedDate }) => {
	const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

	const currentDate = dayjs().startOf('day');
	const [today, setToday] = useState(dayjs());
	const [notAvailableDate, setNotAvailableDate] = useState([]);

	const handlePrev = () => {
		if (today.month() <= currentDate.month() && today.year() === currentDate.year()) {
			toast.warn("Can't book for previous month");
		} else {
			setToday(today.month(today.month() - 1));
		}
	};

	useEffect(() => {
		checkAvailableDate();
		// eslint-disable-next-line
	}, []);

	const checkAvailableDate = async () => {
		try {
			const response = await fetch(apiList.getslots, {
				method: 'GET'
			});

			const json = await response.json();
			if (json.success) {
				const date = json.data.map((data) => new Date(data));
				setNotAvailableDate(date);
			} else {
				toast.error(json.message);
			}
		} catch (err) {
			console.log(err);
		}
	};

	const isUnavailable = (date) =>
		notAvailableDate.some(
			(d) => d.toDateString() === date.toDate().toDateString()
		);

	const isSelected = (date) =>
		bookedDate &&
		bookedDate.toDate().toDateString() === date.toDate().toDateString();

	const handleDateClick = (date, currentMonth) => {
		if (date < today && !currentMonth && !(today <= currentDate)) {
			setToday(today.month(today.month() - 1));
		} else if (date > today && !currentMonth) {
			setToday(today.month(today.month() + 1));
		} else {
			if (date.startOf('day').isBefore(currentDate)) {
				toast.warn("Can't book before current date");
			} else if (isUnavailable(date)) {
				toast.warn(
					`Sorry, we are not available on ${date.date()} ${months[date.month()]}, ${date.year()}`
				);
				setBookedDate(null);
			} else {
				toast.success(
					`Available on ${date.date()} ${months[date.month()]}, ${date.year()}`
				);
				setBookedDate(date);
			}
		}
	};

	const getDateClass = (date, currentMonth, isToday) => {
		if (!currentMonth) return 'text-gray-300 cursor-default';
		if (date.startOf('day').isBefore(currentDate)) return 'text-gray-300 cursor-not-allowed';
		if (isUnavailable(date))
			return 'bg-red-50 text-red-400 line-through cursor-not-allowed';
		if (isSelected(date))
			return 'bg-purple-600 text-white shadow-md shadow-purple-500/30 ring-2 ring-purple-300';
		if (isToday) return 'ring-2 ring-purple-400 text-purple-800 font-bold';
		return 'text-gray-800 hover:bg-purple-100 hover:text-purple-900 cursor-pointer';
	};

	return (
		<div className="w-full overflow-hidden rounded-2xl border border-purple-200/80 bg-white shadow-lg shadow-purple-900/5">
			<div className="flex items-center justify-between border-b border-purple-100 bg-gradient-to-r from-purple-50 to-blue-50 px-4 py-4 sm:px-6">
				<h2 className="text-lg font-bold text-gray-900">
					{months[today.month()]} {today.year()}
				</h2>
				<div className="flex items-center gap-2">
					<button
						type="button"
						onClick={handlePrev}
						className="rounded-lg p-1.5 text-gray-600 transition hover:bg-white hover:text-purple-700 hover:shadow-sm"
						aria-label="Previous month"
					>
						<GrFormPrevious className="text-xl" />
					</button>
					<button
						type="button"
						onClick={() => setToday(dayjs())}
						className="rounded-lg px-3 py-1 text-sm font-semibold text-purple-700 transition hover:bg-white hover:shadow-sm"
					>
						Today
					</button>
					<button
						type="button"
						onClick={() => setToday(today.month(today.month() + 1))}
						className="rounded-lg p-1.5 text-gray-600 transition hover:bg-white hover:text-purple-700 hover:shadow-sm"
						aria-label="Next month"
					>
						<GrFormNext className="text-xl" />
					</button>
				</div>
			</div>

			<div className="grid grid-cols-7 border-b border-purple-50 bg-gray-50/80">
				{days.map((day, key) => (
					<div
						key={key}
						className="py-3 text-center text-xs font-bold uppercase tracking-wide text-gray-500 sm:text-sm"
					>
						{day}
					</div>
				))}
			</div>

			<div className="grid grid-cols-7 gap-y-1 p-3 sm:p-4">
				{generateDate(today.month(), today.year()).map(({ date, currentMonth, today: isToday }, idx) => (
					<div
						key={idx}
						onClick={() => currentMonth && handleDateClick(date, currentMonth)}
						className="flex items-center justify-center py-1"
					>
						<span
							className={`flex h-9 w-9 items-center justify-center rounded-full text-sm font-medium transition-all duration-150 sm:h-10 sm:w-10 ${getDateClass(
								date,
								currentMonth,
								isToday
							)}`}
						>
							{date.date()}
						</span>
					</div>
				))}
			</div>

			<div className="flex flex-wrap items-center justify-center gap-4 border-t border-purple-50 bg-gray-50/60 px-4 py-3 text-xs text-gray-500 sm:gap-6 sm:text-sm">
				<span className="flex items-center gap-1.5">
					<span className="h-3 w-3 rounded-full bg-purple-600" />
					Selected
				</span>
				<span className="flex items-center gap-1.5">
					<span className="h-3 w-3 rounded-full ring-2 ring-purple-400" />
					Today
				</span>
				<span className="flex items-center gap-1.5">
					<span className="h-3 w-3 rounded-full bg-red-100 line-through" />
					Unavailable
				</span>
			</div>
		</div>
	);
};

export default Calendar;
