import { useEffect } from 'react';
import { subscribeScroll } from './lenisScrollBus';
import { useLenis } from './LenisProvider';

const useScrollListener = (callback) => {
	const { lenis } = useLenis() || {};

	useEffect(() => {
		if (!callback) return undefined;

		if (lenis) {
			return subscribeScroll(callback);
		}

		window.addEventListener('scroll', callback, { passive: true });
		callback();
		return () => window.removeEventListener('scroll', callback);
	}, [lenis, callback]);
};

export default useScrollListener;
