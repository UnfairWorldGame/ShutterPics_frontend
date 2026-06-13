export const featuredReviews = [
	{
		name: 'Sneha Raj',
		event: 'Wedding',
		rating: 5,
		feedback:
			'From the haldi to the reception, ShutterPics captured every emotion beautifully. The candid shots feel natural, and the wedding film brought our family to tears. Truly worth every rupee.'
	},
	{
		name: 'Priya K.',
		event: 'Engagement Shoot',
		rating: 5,
		feedback:
			'We were nervous in front of the camera, but the team made us comfortable within minutes. The photos look magazine-quality, and we received our album ahead of schedule.'
	},
	{
		name: 'Rohan Sharma',
		event: 'Corporate Event',
		rating: 5,
		feedback:
			'Professional, punctual, and easy to coordinate with. They understood our brand tone and delivered crisp photos we still use across our marketing channels.'
	},
	{
		name: 'Anjali Verma',
		event: 'Family Photoshoot',
		rating: 4,
		feedback:
			'Our kids usually never sit still, but the photographer was patient and playful. The final portraits captured genuine smiles — not stiff poses. We framed three of them at home.'
	},
	{
		name: 'Arjun Paswan',
		event: 'Ring Ceremony',
		rating: 5,
		feedback:
			'Great attention to detail during our ring ceremony. Lighting, angles, and the teaser reel were all on point. Guests still ask us who shot the event.'
	},
	{
		name: 'Kavita Singh',
		event: 'Birthday Celebration',
		rating: 4,
		feedback:
			'Booked the one-day birthday package and got lovely candid moments plus a short highlight video. Smooth booking process and friendly on-site crew.'
	}
];

export const getInitials = (name) =>
	name
		.split(' ')
		.filter(Boolean)
		.map((part) => part[0])
		.join('')
		.slice(0, 2)
		.toUpperCase();

export const averageRating = (reviews) => {
	if (!reviews.length) return 0;
	const sum = reviews.reduce((acc, r) => acc + (r.rating ?? r.rate ?? 0), 0);
	return Math.round((sum / reviews.length) * 10) / 10;
};
