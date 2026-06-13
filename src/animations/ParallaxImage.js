import React, { useCallback, useEffect, useRef } from 'react';
import useScrollListener from './useScrollListener';

const LERP = 0.09;

const ParallaxImage = ({
	src,
	alt,
	className = '',
	speed = 0.1,
	layer = 1,
	containerClassName = '',
	loading = 'lazy'
}) => {
	const containerRef = useRef(null);
	const innerRef = useRef(null);
	const targetRef = useRef({ y: 0, scale: 1.22 });
	const currentRef = useRef({ y: 0, scale: 1.22 });

	const updateTarget = useCallback(() => {
		const el = containerRef.current;
		if (!el) return;

		const rect = el.getBoundingClientRect();
		const viewport = window.innerHeight;
		const centerOffset = rect.top + rect.height / 2 - viewport / 2;
		const parallaxY = centerOffset * speed * layer * 0.6;

		const enterStart = viewport * 1.05;
		const enterEnd = viewport * 0.5;
		const enterProgress = 1 - (rect.top - enterEnd) / (enterStart - enterEnd);
		const clamped = Math.max(0, Math.min(1, enterProgress));
		const scale = 1.22 - clamped * 0.06;

		targetRef.current = {
			y: parallaxY,
			scale: Math.max(1.16, scale)
		};
	}, [speed, layer]);

	useScrollListener(updateTarget);

	useEffect(() => {
		let rafId;

		const animate = () => {
			const inner = innerRef.current;
			if (inner) {
				currentRef.current.y += (targetRef.current.y - currentRef.current.y) * LERP;
				currentRef.current.scale +=
					(targetRef.current.scale - currentRef.current.scale) * LERP;

				inner.style.transform = `translate3d(0, ${currentRef.current.y}px, 0) scale(${currentRef.current.scale})`;
			}
			rafId = requestAnimationFrame(animate);
		};

		rafId = requestAnimationFrame(animate);
		updateTarget();

		return () => cancelAnimationFrame(rafId);
	}, [updateTarget]);

	return (
		<div
			ref={containerRef}
			className={`relative overflow-hidden bg-gray-900 ${containerClassName}`}
		>
			<div
				ref={innerRef}
				className="absolute inset-0 origin-center will-change-transform"
				style={{ transform: 'translate3d(0, 0, 0) scale(1.22)' }}
			>
				<img
					src={src}
					alt={alt}
					loading={loading}
					draggable={false}
					className={`absolute inset-0 h-full w-full object-cover object-center ${className}`}
				/>
			</div>
		</div>
	);
};

export default ParallaxImage;
