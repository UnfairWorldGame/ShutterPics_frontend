import dayjs from 'dayjs';

const day = dayjs();

export const generateDate = (month = day.month(), year = day.year()) => {
	const firstDateofMonth = day.year(year).month(month).startOf('month');
	const lastDateofMonth = day.year(year).month(month).endOf('month');

	const arrayOfDate = [];

	// create prefix date
	for (let i = 0; i < firstDateofMonth.day(); i++) {
		arrayOfDate.push({
			currentMonth: false,
			date: firstDateofMonth.day(i)
		});
	}

	// generate current data
	for (let i = firstDateofMonth.date(); i <= lastDateofMonth.date(); i++) {
		arrayOfDate.push({
			currentMonth: true,
			date: firstDateofMonth.date(i),
			today: firstDateofMonth.date(i).toDate().toDateString() === day.toDate().toDateString()
		});
	}

	// create suffix date
	const remaining = 42 - arrayOfDate.length;
	for (let i = lastDateofMonth.date() + 1; i <= lastDateofMonth.date() + remaining; i++) {
		arrayOfDate.push({
			currentMonth: false,
			date: lastDateofMonth.date(i)
		});
	}

	return arrayOfDate;
};

export const months = [
	'January',
	'February',
	'March',
	'April',
	'May',
	'June',
	'July',
	'August',
	'September',
	'October',
	'November',
	'December'
];
