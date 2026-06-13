import React, { useEffect, useRef, useState } from 'react';

const isInViewport = (el, margin = 0.08) => {
	const rect = el.getBoundingClientRect();
	const threshold = window.innerHeight * (1 - margin);
	return rect.top < threshold && rect.bottom > 0;
};

const FadeInUp = ({
	children,
	className = '',
	delay = 0,
	duration = 0.85,
	as: Tag = 'div',
	once = true,
	threshold = 0.05,
	distance = 18
}) => {
	const ref = useRef(null);
	const [visible, setVisible] = useState(false);

	useEffect(() => {
		const el = ref.current;
		if (!el) return undefined;

		if (isInViewport(el)) {
			setVisible(true);
			if (once) return undefined;
		}

		const observer = new IntersectionObserver(
			([entry]) => {
				if (entry.isIntersecting) {
					setVisible(true);
					if (once) observer.disconnect();
				} else if (!once) {
					setVisible(false);
				}
			},
			{ threshold, rootMargin: '0px 0px -40px 0px' }
		);

		observer.observe(el);
		return () => observer.disconnect();
	}, [once, threshold]);

	const easing = 'cubic-bezier(0.16, 1, 0.3, 1)';

	return (
		<Tag
			ref={ref}
			className={className}
			style={{
				opacity: visible ? 1 : 0,
				transform: visible ? 'translateY(0)' : `translateY(${distance}px)`,
				transition: `opacity ${duration}s ${easing} ${delay}s, transform ${duration}s ${easing} ${delay}s`
			}}
		>
			{children}
		</Tag>
	);
};

export default FadeInUp;
