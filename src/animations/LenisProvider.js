import React, { createContext, useContext, useEffect, useRef, useState } from 'react';
import Lenis from 'lenis';
import { notifyScroll } from './lenisScrollBus';

const LenisContext = createContext(null);

export const useLenis = () => useContext(LenisContext);

const LenisProvider = ({ children }) => {
	const lenisRef = useRef(null);
	const [lenis, setLenis] = useState(null);

	useEffect(() => {
		const instance = new Lenis({
			duration: 1.35,
			lerp: 0.085,
			easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
			smoothWheel: true,
			smoothTouch: true,
			touchMultiplier: 1.2,
			wheelMultiplier: 0.95
		});

		lenisRef.current = instance;
		setLenis(instance);
		document.documentElement.classList.add('lenis');

		let rafId;
		const raf = (time) => {
			instance.raf(time);
			notifyScroll();
			rafId = requestAnimationFrame(raf);
		};
		rafId = requestAnimationFrame(raf);

		return () => {
			cancelAnimationFrame(rafId);
			instance.destroy();
			lenisRef.current = null;
			setLenis(null);
			document.documentElement.classList.remove('lenis');
		};
	}, []);

	return (
		<LenisContext.Provider value={{ ref: lenisRef, lenis }}>{children}</LenisContext.Provider>
	);
};

export default LenisProvider;
