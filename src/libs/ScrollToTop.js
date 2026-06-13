import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useLenis } from '../animations/LenisProvider';

const ScrollToTop = () => {
	const { pathname } = useLocation();
	const { ref: lenisRef } = useLenis() || {};

	useEffect(() => {
		const lenis = lenisRef?.current;
		if (lenis) {
			lenis.scrollTo(0, { immediate: true });
		} else {
			window.scrollTo(0, 0);
		}
	}, [pathname, lenisRef]);

	return null;
};

export default ScrollToTop;
