import React, { useEffect, useRef, useState } from 'react';

const isInViewport = (el) => {
	const rect = el.getBoundingClientRect();
	return rect.top < window.innerHeight * 0.92 && rect.bottom > 0;
};

const StaggerGrid = ({
	children,
	className = '',
	stagger = 0.1,
	as: Tag = 'div',
	threshold = 0.05,
	distance = 20,
	duration = 0.85
}) => {
	const ref = useRef(null);
	const [visible, setVisible] = useState(false);

	useEffect(() => {
		const el = ref.current;
		if (!el) return undefined;

		if (isInViewport(el)) {
			setVisible(true);
			return undefined;
		}

		const observer = new IntersectionObserver(
			([entry]) => {
				if (entry.isIntersecting) {
					setVisible(true);
					observer.disconnect();
				}
			},
			{ threshold, rootMargin: '0px 0px -40px 0px' }
		);

		observer.observe(el);
		return () => observer.disconnect();
	}, [threshold]);

	const easing = 'cubic-bezier(0.16, 1, 0.3, 1)';

	return (
		<Tag ref={ref} className={className}>
			{React.Children.map(children, (child, index) => {
				if (!React.isValidElement(child)) return child;

				const childStyle = child.props.style || {};
				const delay = index * stagger;
				const motionStyle = {
					...childStyle,
					opacity: visible ? 1 : 0,
					transform: visible ? 'translateY(0)' : `translateY(${distance}px)`,
					transition: `opacity ${duration}s ${easing} ${delay}s, transform ${duration}s ${easing} ${delay}s`
				};

				if (typeof child.type === 'string') {
					return React.cloneElement(child, { style: motionStyle });
				}

				return (
					<div className="h-full" style={motionStyle}>
						{child}
					</div>
				);
			})}
		</Tag>
	);
};

export default StaggerGrid;
