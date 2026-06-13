import React, { useState } from 'react';
import { RiPlayCircleFill } from 'react-icons/ri';

const getYouTubeVideoId = (url) => {
	const match = url.match(/(?:shorts\/|v=|youtu\.be\/|embed\/)([A-Za-z0-9_-]{11})/);
	return match ? match[1] : null;
};

const LazyYouTubeShort = ({ url, title }) => {
	const [isPlaying, setIsPlaying] = useState(false);
	const videoId = getYouTubeVideoId(url);

	if (!videoId) return null;

	const thumbnailUrl = `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`;

	if (isPlaying) {
		return (
			<iframe
				title={title}
				src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1&playsinline=1`}
				className="h-full w-full border-0"
				allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
				referrerPolicy="strict-origin-when-cross-origin"
				allowFullScreen
			/>
		);
	}

	return (
		<button
			type="button"
			onClick={() => setIsPlaying(true)}
			className="group relative h-full w-full overflow-hidden focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:ring-offset-2"
			aria-label={`Play ${title}`}
		>
			<img
				src={thumbnailUrl}
				alt=""
				loading="lazy"
				className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
			/>
			<span className="absolute inset-0 flex items-center justify-center bg-black/35 transition group-hover:bg-black/45">
				<RiPlayCircleFill className="text-6xl text-white drop-shadow-lg transition group-hover:scale-110" />
			</span>
		</button>
	);
};

export default LazyYouTubeShort;
