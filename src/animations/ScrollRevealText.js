import React, { useCallback, useEffect, useMemo, useRef } from 'react';
import useScrollListener from './useScrollListener';

const ScrollRevealText = ({ text, className = '', as: Tag = 'span' }) => {
	const containerRef = useRef(null);
	const progressRef = useRef(0);
	const targetRef = useRef(0);
	const spansRef = useRef([]);
	const totalCharsRef = useRef(0);

	const words = useMemo(() => text.split(/\s+/).filter(Boolean), [text]);
	totalCharsRef.current = words.reduce((sum, word) => sum + word.length, 0);

	const updateTarget = useCallback(() => {
		const el = containerRef.current;
		if (!el) return;

		const rect = el.getBoundingClientRect();
		const viewport = window.innerHeight;
		const start = viewport * 0.92;
		const end = viewport * 0.35;
		const raw = 1 - (rect.top - end) / (start - end);
		targetRef.current = Math.max(0, Math.min(1, raw));
	}, []);

	useScrollListener(updateTarget);

	useEffect(() => {
		let rafId;

		const animate = () => {
			progressRef.current += (targetRef.current - progressRef.current) * 0.1;
			const total = totalCharsRef.current;
			const visibleCount = Math.ceil(progressRef.current * total);

			spansRef.current.forEach((span, index) => {
				if (!span) return;
				const isVisible = index < visibleCount;
				span.style.opacity = isVisible ? '1' : '0.18';
				span.style.transform = isVisible ? 'translateY(0)' : 'translateY(0.25em)';
			});

			rafId = requestAnimationFrame(animate);
		};

		rafId = requestAnimationFrame(animate);
		updateTarget();

		return () => cancelAnimationFrame(rafId);
	}, [updateTarget, words]);

	let charIndex = 0;

	return (
		<Tag ref={containerRef} className={className} aria-label={text}>
			{words.map((word, wordIndex) => (
				<React.Fragment key={`${word}-${wordIndex}`}>
					{wordIndex > 0 && <span className="inline-block w-[0.3em]" aria-hidden="true" />}
					<span className="inline-block whitespace-nowrap">
						{word.split('').map((char, letterIndex) => {
							const index = charIndex;
							charIndex += 1;

							return (
								<span
									key={`${wordIndex}-${letterIndex}`}
									ref={(node) => {
										spansRef.current[index] = node;
									}}
									className="inline-block will-change-[opacity,transform]"
									style={{
										opacity: 0.18,
										transform: 'translateY(0.25em)'
									}}
									aria-hidden="true"
								>
									{char}
								</span>
							);
						})}
					</span>
				</React.Fragment>
			))}
		</Tag>
	);
};

export default ScrollRevealText;
