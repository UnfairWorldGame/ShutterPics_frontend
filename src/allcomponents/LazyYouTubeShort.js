import React, { useMemo } from 'react';
import { RiPlayCircleFill } from 'react-icons/ri';
import { FaYoutube } from 'react-icons/fa';

const getYouTubeVideoId = (url) => {
	const match = url.match(/(?:shorts\/|v=|youtu\.be\/|embed\/)([A-Za-z0-9_-]{11})/);
	return match ? match[1] : null;
};

const LazyYouTubeShort = ({ url, title }) => {
	const videoId = getYouTubeVideoId(url);
	const watchUrl = useMemo(
		() => (videoId ? `https://www.youtube.com/shorts/${videoId}` : null),
		[videoId]
	);

	if (!videoId) return null;

	const thumbnailUrl = `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`;

	return (
		<a
			href={watchUrl}
			target="_blank"
			rel="noopener noreferrer"
			className="group relative block h-full w-full overflow-hidden focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:ring-offset-2"
			aria-label={`Watch ${title} on YouTube`}
		>
			<img
				src={thumbnailUrl}
				alt={title}
				loading="lazy"
				className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
			/>
			<span className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-black/35 transition group-hover:bg-black/45">
				<RiPlayCircleFill className="text-6xl text-white drop-shadow-lg transition group-hover:scale-110" />
				<span className="inline-flex items-center gap-1.5 rounded-full bg-red-600/90 px-3 py-1 text-xs font-semibold text-white opacity-0 shadow-lg transition group-hover:opacity-100">
					<FaYoutube className="text-sm" aria-hidden />
					Watch on YouTube
				</span>
			</span>
		</a>
	);
};

export default LazyYouTubeShort;
